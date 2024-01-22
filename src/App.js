// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import About from './pages/imagePage/ImagePage';
import Profile from './pages/profilePage/UserProfile';
import PostPage from './pages/postPage/PostPage';  // 导入新的 PostPage 组件

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/image-page" element={<About />} />
        <Route path="/profile-page" element={<Profile />} />
        <Route path="/posts" element={<PostPage />} /> 
        <Route path="/posts/:postId" element={<PostPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
