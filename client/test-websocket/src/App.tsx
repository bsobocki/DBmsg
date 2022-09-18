import React, { useEffect } from "react";
import "./App.css";
import { io } from "socket.io-client";

const socket = io("ws://107.21.129.164:3008");

function App() {
  const [messages, setMessages] = React.useState<string[]>([]);
  const [textField, setTextField] = React.useState<string>("");
  const [isConnected, setIsConnected] = React.useState(socket.connected);

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      setIsConnected(true);
    });
    socket.on("disconnect", () => {
      setIsConnected(false);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.on("echoMessage", (text) => {
      console.log("EVENT(Echo):", text);
    });
    socket.on("receiveBroadcastedMessage", (text) => {
      setMessages([...messages, text]);
    });
  }, [messages]);

  const onSubmitMessage = (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!isConnected) {
      alert("Not connected to server");
      return;
    }
    socket.emit("broadcastMessage", textField);
    setTextField("");
    e.preventDefault();
  };

  return (
    <div style={{ padding: 32 }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h3>Send message</h3>{" "}
        <span style={{ marginLeft: 8 }}>
          {isConnected ? "(connected)" : "(disconnected)"}
        </span>
      </div>
      <form onSubmit={(e) => onSubmitMessage(e)} style={{ display: "flex" }}>
        <input
          value={textField}
          onChange={(e) => setTextField(e.target.value)}
        />
        <button onClick={(e) => onSubmitMessage(e)}>Send</button>
        <button onClick={() => setMessages([])}>Clear</button>
      </form>
      <h4>Messages</h4>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
