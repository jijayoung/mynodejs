import React, { useState, useEffect } from 'react';
import './App.css';
import io from 'socket.io-client';

const socket = io("http://localhost:3030/", {
  withCredentials: true,
}); //cros

function App() {
  const [messages, setMessages] = useState([]); // 입력된 메세지목록
  const [message, setMessage] = useState(""); // 전송할 메세지

  useEffect(() => {
    //server : io.emit('chat:message',msg)
    socket.on('chat:message', (msg) => {
      setMessages((prevMessage) => [...prevMessage, msg]);
    });

    return () => {
      socket.off('chat:message'); // 컴퍼넌트가 unmount될때 socket 리스닝 해제
    };
  }, []);

  const sendMessage = (e)=>{
    if(message.trim()){
      socket.emit('chat:message',message);
      setMessage('');
    }
  };

  return (
    <div className="App">
      <h1>Message list</h1>
      <ul id="messages">
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <h1>Send Message</h1>
      <input
        id="input"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></input>
      <button onClick={sendMessage}>전송</button>
    </div>
  );
}

export default App;
