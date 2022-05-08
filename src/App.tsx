import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StateMachineProvider, createStore } from "little-state-machine";
import { Scanner, AboutUs } from './pages'
import { Navigation } from './components'
import defaultState from './state/defaultState'
createStore(defaultState);

function App() {
  return (
    <StateMachineProvider>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Scanner />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
      </BrowserRouter>
    </StateMachineProvider >
  );
}

export default App;
