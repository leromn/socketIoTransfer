import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("https://myqwz5-3000.csb.app/", { reconnect: true });

function App() {
  const [message, setMessage] = useState("");
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

  return (
    <div>
      <h1>Socket.io Chat</h1>
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
