// App.js
import React, { useState } from 'react';
import './App.css';
import Mermaid from './Mermaid'
import example from './example'
import CodeEditor from '@uiw/react-textarea-code-editor';

/* <link href="https://cdnjs.cloudflare.com/ajax/libs/mermaid/6.0.0/mermaid.css" rel="stylesheet" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/mermaid/6.0.0/mermaid.js"></script> */

function App() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [codeInput, setCodeInput] = useState('');

  const sendMessage = () => {
    if (userInput.trim() !== '') {
      setMessages([...messages, userInput]);
      setUserInput('');
    }
  };

  const handleCodeChange = (e) => {
    setCodeInput(e.target.value);
  };

  const handleUserInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const [code, setCode] = useState(
    `function add(a, b) {\n  return a + b;\n}`
  );

  return (
    <div className="main-container">
      <div className="code-container">
        {/* <ScrollArea> */}
          <CodeEditor
            value={code}
            language="js"
            placeholder="Please enter JS code."
            onChange={(evn) => setCode(evn.target.value)}
            padding={15}
            style={{
              fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
              textAlign: 'start',
              fontSize: '16px',
              width: '100%', /* ensure it takes full width of its container */
              minHeight: '50px', /* minimum height */
              border: 'none',/*'1px solid #ccc', /* optional, adds a border */
              backgroundColor: "#f5f5f5",
              resize: 'vertical',
              overflow: 'auto'
            }}
          />
        {/* </ScrollArea> */}
        
      </div>
      <div className="cfg-container">
          <div className="mermaid-display">
            <Mermaid chart={example} />
          </div>
      </div>

      <div className="chat-container">
        <div className="messages">
          {messages.map((message, index) => (
            <div className="message" key={index}>{message}</div>
          ))}
        </div>
          <div className="chat-input-button-container">
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















