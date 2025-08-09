import { createContext, useEffect, useState } from 'react';
import MessageAPI from './api/MessageAPI';

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [selectedWaId, setSelectedWaId] = useState(null);

  
  useEffect(() => {
    const savedWaId = localStorage.getItem('selectedWaId');
    if (savedWaId) setSelectedWaId(savedWaId);
  }, []);

  const state = {
    selectedWaId: [selectedWaId, setSelectedWaId],
    MessageAPI: MessageAPI() // 
  };

  return (
    <GlobalState.Provider value={state}>
      {children}
    </GlobalState.Provider>
  );
};
