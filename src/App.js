import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BMI from './BMI';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BMI />} />
      </Routes>
    </Router>
  );
}

export default App;
