import React, { useEffect, useState, useContext } from 'react';
import { GlobalState } from '../../GlobalState';
import './ChatList.css';

const ChatList = () => {
  const state = useContext(GlobalState);
  const [users, setUsers] = useState([]);
  const [selectedWaId, setSelectedWaId] = state.selectedWaId;
  const { getAllUsers } = state.MessageAPI;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (err) {
        console.error('Failed to fetch users', err);
      }
    };
    fetchUsers();
  }, []);

  

  const handleClick = (wa_id) => {
    setSelectedWaId(wa_id);
    localStorage.setItem('selectedWaId', wa_id);
  };

  return (
    <div className="chatlist-container">
    <div className='menu-head'>
      <div className='logo'>
      <strong><h2 style={{color:"green"}}>WhatsApp</h2></strong>
      </div>
      <div className='list-icons'>
      <h2><i class="fa-regular fa-message"></i></h2>
      <h2><i className="fa-solid fa-ellipsis-vertical"></i></h2>
      </div>
      </div>
      <div className='searcharea'>
        <input
         type="text"
         placeholder="Search or start a new chat"
         />
      </div>
      <div className='customchat'>
        <button style={{backgroundColor:"#c1eeb7ff"}}>All</button>
        <button>Unread</button>
        <button>Favourites</button>
        <button>Groups</button>
      </div>
      <ul>
        {users.map((user) => (
          <li
            key={user.wa_id}
            className={selectedWaId === user.wa_id ? 'active' : ''}
            onClick={() => handleClick(user.wa_id)}
          >
            <div className="user-info">
              <span className="user-name">{user.name}</span>
              <span className="user-number">{user.name}: {user.message}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
