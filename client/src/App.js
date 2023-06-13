import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("https://crp9lm-3000.csb.app", { reconnect: true });

function App() {
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("first");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    socket.on("message", (message) => {
      setMessage(message);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    socket.emit("message", inputValue);
    setInputValue("");
  };

  const changeRoom = (event) => {
    event.preventDefault();
    setRoom(event.target.value);
    socket.emit("joinRoom", event.target.value);
    console.log(event.target.value);
  };

  return (
    <div>
      <h1>Socket.io Chat</h1>
      <select onChange={changeRoom} value={room}>
        <option value="first">first</option>
        <option value="second">second</option>
        <option value="third">third</option>
      </select>
      <p>room name : {room}</p>

      <p>{message}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
