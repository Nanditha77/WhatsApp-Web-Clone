import React from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import { DataProvider } from './GlobalState';

function App() {
  return (
    <DataProvider>
      <HomePage />
    </DataProvider>
  );
}

export default App;
