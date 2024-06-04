// App.js
import React, { useState } from 'react';
import './App.css';
import Mermaid from './Mermaid'
import CodeEditor from '@uiw/react-textarea-code-editor';
import example from './example';
import Header from './Header';

function App() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [mermaidChart, setMermaidChart] = useState(example);
  const [summary, setSummary] = useState('');
  const [reloadCounter, setReloadCounter] = useState(0);

  const sendMessage = () => {
    if (userInput.trim() !== '') {
      const newMessages = [...messages, {content: userInput, role: 'user'}]
      setMessages(newMessages);
      setUserInput('');
      getAIResponse(newMessages);
    }
  };

  const getAIResponse = async (messages) => {
    try {
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: code, summary: summary, mermaid: mermaidChart, messages: messages })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setMessages([...messages, {content: result.content, role: 'assistant'}])
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  const handleUserInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const [code, setCode] = useState(
    `def add(a, b):\n    return a + b`
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
      setSummary(result.summary)
      setMessages([{content: 'Here is a step by step explanation of the code:\n\n' + result.summary, role: 'assistant'}]);
      setReloadCounter(prev => prev + 1);
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return (
    <>
    <Header />
    <div className="main-container">
      <div className="code-container">
        <div style={{overflowY: 'auto'}}>
          <CodeEditor
            value={code}
            language="python"
            placeholder="Enter code ..."
            onChange={(evn) => setCode(evn.target.value)}
            padding={15}
            style={{
              // color: "#383838",
              fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
              textAlign: 'start',
              fontSize: '16px',
              minWidth: '630px',
              minHeight: '330px', 
              border: 'none',
              backgroundColor: "#dddddd",
              resize: 'vertical',
            }}
          />
        </div>
        <div style={{display:'flex', height:'100%', alignItems:'end'}}>
          <button className="chat-button generate-button" onClick={sendCodeToServer} >Generate</button>
        </div>

      </div>
      <div className="cfg-container">
          <div className="mermaid-display" style={{ width: '100%', height: '100%' }}>
             <Mermaid key={reloadCounter} chart={mermaidChart} />
          </div>
      </div>

      <div className="chat-container">
        <div className="messages">
          {messages.map((message, index) => (
            <div className={"message " + message.role} key={index}>
              {message.content.split('\n').map((line, index) => {
              return (
                  <>
                      {line}
                      <br />
                  </>
              );
              })}
            </div>
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
  </>
  );
}

export default App;















