import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BMI from './BMI';
import MedTest from './MedTest';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/bmi" element={<BMI />} />
        <Route path='/medtest' element={<MedTest/>} />
      </Routes>
    </Router>
  );
}

export default App;
