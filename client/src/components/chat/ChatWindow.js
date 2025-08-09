import React, { useContext, useEffect, useState } from 'react';
import { GlobalState } from '../../GlobalState';
import './ChatWindow.css';
import MessageInput from './MessageInput';
import socket from '../../socket';

const ChatWindow = () => {
  const state = useContext(GlobalState);
  const [selectedWaId, setSelectedWaId] = state.selectedWaId;
  const { getMessagesByWaId } = state.MessageAPI;
  const [messages, setMessages] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
  socket.on('newMessage', (msg) => {
    if (msg.wa_id === selectedWaId) {
      setMessages(prev => [...prev, msg]);
    }
  });

  socket.on('statusUpdate', (updated) => {
    setMessages(prev =>
      prev.map(m => m._id === updated._id ? updated : m)
    );
  });

  return () => {
    socket.off('newMessage');
    socket.off('statusUpdate');
  };
}, [selectedWaId]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedWaId) return;
      try {
        const data = await getMessagesByWaId(selectedWaId);
        setMessages(data);
        if (data.length > 0) {
          setUserInfo({
            name: data[0].name,
            number: data[0].number
          });
        }
      } catch (err) {
        console.error('Failed to fetch messages', err);
      }
    };

    fetchMessages();
  }, [selectedWaId]);

  if (!selectedWaId) {
    return <div className="chat-window"></div>
  }

  return (
    <div className="chat-window">
      <div className="chat-header">
             <button
              className="mobile-back"
              onClick={() => setSelectedWaId(null)}
              aria-label="Back"
            >
              <i className="fa-solid fa-arrow-left"></i>
            </button>
        <div className='contact'>
        <ul>
        <li>{userInfo?.name}</li>
        <li>{userInfo?.number}</li>
        </ul>
        </div>
        <div className='icons'>
        <h2><i className="fa-solid fa-phone"></i></h2>
        <h2><i className="fa-solid fa-magnifying-glass"></i></h2>
        <h2><i className="fa-solid fa-ellipsis-vertical"></i></h2>
        </div>
      </div>
      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg._id} className={`chat-bubble ${msg.status}`}>
            <p>{msg.message}</p>
            <div className="meta">
              <span>{new Date(msg.timestamp).toLocaleString()}</span>
              <span className={`status ${msg.status}`}>{msg.status}</span>
            </div>
          </div>
        ))}
      </div>
      <MessageInput wa_id={selectedWaId} className='messagebox'/>
    </div>
  );
};

export default ChatWindow;
