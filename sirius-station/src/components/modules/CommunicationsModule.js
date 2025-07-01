import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import Card from '../ui/Card';

const CommunicationsModule = () => {
  const [messages, setMessages] = useState([
    { sender: 'Commander', content: 'Welcome to Sirius Station.' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { sender: 'You', content: input }]);
      setInput('');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 20 }}>Crew Chat</h1>
      <Card>
        <div style={{ maxHeight: 300, overflowY: 'auto', marginBottom: 10 }}>
          {messages.map((msg, idx) => (
            <div key={idx} style={{ marginBottom: 8 }}>
              <strong>{msg.sender}:</strong> {msg.content}
            </div>
          ))}
        </div>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
          style={{ width: '80%', padding: 8, borderRadius: 6, border: '1px solid #333', background: '#232946', color: '#fff' }}
        />
        <button onClick={sendMessage} className="btn-primary" style={{ marginLeft: 10 }}>Send</button>
      </Card>
    </div>
  );
};

export default CommunicationsModule;
