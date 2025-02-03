import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Chat from './pages/Chat';
import About from './pages/About';
import PrivacyPolicy from './pages/PrivacyPolicy';
import UserConditions from './pages/UserConditions';
import CookiesPolicy from './pages/CookiesPolicy';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/About" element={<About />} />
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/UserConditions" element={<UserConditions />} />
        <Route path="/CookiesPolicy" element={<CookiesPolicy />} />

      </Routes>
    </Router>
  );
}

export default App;