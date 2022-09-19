import React, { useEffect } from "react";
import "./App.css";

// const socket = new WebSocket("ws://localhost:3008");
const socket = new WebSocket("ws://107.21.129.164:3008");

function App() {
  const [messages, setMessages] = React.useState<string[]>([]);
  const [textField, setTextField] = React.useState<string>("");
  const [isConnected, setIsConnected] = React.useState(false);

  useEffect(() => {
    socket.onopen = function () {
      setIsConnected(true);
    };
  }, []);

  useEffect(() => {
    socket.onmessage = function (message) {
      const data: { event: string; data: string } = JSON.parse(message.data);
      const event = data.event;
      if (event === "receiveBroadcastedMessage") {
        setMessages([...messages, data.data]);
      }
    };
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
    socket.send(
      JSON.stringify({
        event: "broadcastMessage",
        data: textField,
      })
    );
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
