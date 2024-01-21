// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import About from './pages/imagePage/imagePage';
import Profile from './pages/profilePage/UserProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/image-page" element={<About />} />
        <Route path="/profile-page" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
