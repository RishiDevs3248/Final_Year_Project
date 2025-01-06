import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UploadPage from './Pages/UploadPage';
import TestPage from './Pages/TestPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UploadPage />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </Router>
  );
}

export default App;
