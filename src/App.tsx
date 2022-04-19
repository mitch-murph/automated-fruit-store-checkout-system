import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Scanner, AboutUs } from './pages'
import { Navigation } from './components'

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        {/* <Route path="/" element={<App />} /> */}
        <Route path="/" element={<Scanner />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
