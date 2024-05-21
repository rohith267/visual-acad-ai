// App.js
import React, { useState } from 'react';
import './App.css';
import Mermaid from './Mermaid'
import CodeEditor from '@uiw/react-textarea-code-editor';


function App() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [mermaidChart, setMermaidChart] = useState('');
  const [reloadCounter, setReloadCounter] = useState(0);

  const sendMessage = () => {
    if (userInput.trim() !== '') {
      setMessages([...messages, userInput]);
      setUserInput('');
    }
  };

  const handleUserInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const [code, setCode] = useState(
    `function add(a, b) {\n  return a + b;\n}`
  );

  const sendCodeToServer = async () => {
    try {
      const response = await fetch('http://localhost:8000/flow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: code })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setMermaidChart(result.mermaid);  // Update the Mermaid chart data
      setReloadCounter(prev => prev + 1);
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return (
    <div className="main-container">
      <div className="code-container">
        <div>
          <CodeEditor
            value={code}
            language="python"
            placeholder="Enter code ..."
            onChange={(evn) => setCode(evn.target.value)}
            padding={15}
            style={{
              color: '#9CDCEE',
              fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
              textAlign: 'start',
              fontSize: '16px',
              width: '100%', /* ensure it takes full width of its container */
              minHeight: '50px', /* minimum height */
              border: 'none',/*'1px solid #ccc', /* optional, adds a border */
              backgroundColor: "#303030",
              resize: 'vertical',
              overflow: 'auto'
            }}
          />
        </div>

      </div>
      <div className="cfg-container">
          <div className="mermaid-display">
             <Mermaid key={reloadCounter} chart={mermaidChart} />
          </div>
      </div>

      <div className="chat-container">
        <div className="messages">
          {messages.map((message, index) => (
            <div className="message" key={index}>{message}</div>
          ))}
        </div>
        <div className="chat-input-button-container">
          <button className="chat-button" onClick={sendCodeToServer}>Generate</button>
          <textarea  
            type="text"
            id="userMsg"
            placeholder="Type a message..."
            value={userInput}
            onChange={handleUserInputChange}
            className="chat-input"
          />
          <button className="chat-button" onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>

  );
}

export default App;















