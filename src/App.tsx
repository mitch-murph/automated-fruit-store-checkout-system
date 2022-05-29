import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StateMachineProvider, createStore } from "little-state-machine";
import { Scanner, AboutUs } from './pages'
import { Navigation } from './components'
import defaultState from './state/defaultState'
import { cloneDeep } from "lodash";

sessionStorage.clear();

createStore(cloneDeep(defaultState));

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
