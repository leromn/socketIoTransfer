const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
app.use(cors());

app.use(express.static("client/build"));

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    io.emit("message", "connected");
  });

  socket.on("joinRoom", (room) => {
    socket.join(room);
    console.log("joined room: ", room);
    socket.emit("message", {
      user: "adminX",
      text: `hello, Welcome to the ${room} room.`,
    });
    socket.broadcast.to(room).emit("message", {
      user: "adminX",
      text: `${socket.id} has joined!`,
    });
  });

  socket.on("message", (message) => {
    console.log(`Received message: ${message}`);
    io.emit("message", message);
  });
});

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
