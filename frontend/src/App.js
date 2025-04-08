import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UploadPage from './Pages/UploadPage';
import TestPage from './Pages/TestPage';
import ResourcesPage from './Pages/ResourcesPage';
import Landingpage from './Pages/LandingPage';
import ResultPage from './Pages/ResultPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
