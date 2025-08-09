import React, { useState, useContext } from 'react';
import { GlobalState } from '../../GlobalState';
import './MessageInput.css';

const MessageInput = ({ wa_id }) => {  
  const state = useContext(GlobalState);
  const [message, setMessage] = useState('');
  const { sendMessage } = state.MessageAPI;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const payload = {
      wa_id,
      name: 'You',
      number: wa_id,
      message,
      timestamp: new Date().toISOString(),
      meta_msg_id: `msg_${Date.now()}`,
      status: 'delivered',
    };

    try {
      await sendMessage(payload);
      setMessage('');
    } catch (err) {
      console.error('Failed to send message', err);
    }
  };

  return (
    <form className="message-input-container" onSubmit={handleSubmit}>
       <div className="input-icons">
    <span><i className="fa-solid fa-plus"></i></span>
    <span><i className="fa-regular fa-face-smile"></i></span>
    <input
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={(e) => setMessage(e.target.value)}
    />
    <button type='submit'><i class="fa-solid fa-paper-plane"></i></button>
    <span onClick={handleSubmit}><i className="fa-solid fa-microphone"></i></span>
  </div>
    </form>
  );
};

export default MessageInput;
