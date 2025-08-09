import React, { useContext } from 'react';
import ChatList from '../components/sidebar/ChatList';
import ChatWindow from '../components/chat/ChatWindow';
import './HomePage.css';
import NavBar from '../components/sidebar/NavBar';
import { GlobalState } from '../GlobalState';
import { MobileFooter } from '../components/sidebar/NavBar';

const HomePage = () => {
  const state = useContext(GlobalState);
  const [selectedWaId] = state.selectedWaId;
  
  return (
    <div className={`home-container ${selectedWaId ? 'chat-open' : 'list-open'}`}>
      <div className='navbar'>
        <NavBar/>
      </div>
      <div className="sidebar">
        <ChatList />
      </div>
      <div className="chat-window">
        <ChatWindow />
      </div>
       {!selectedWaId && <MobileFooter />}
    </div>
  );
};

export default HomePage;
