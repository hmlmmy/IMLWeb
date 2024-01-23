// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './pages/login/Login';
import Image from './pages/imagePage/ImagePage';
import Profile from './pages/profilePage/UserProfile';
import PostPage from './pages/postPage/PostPage';  // 导入新的 PostPage 组件
import { AuthProvider } from './pages/login/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/image-page" element={<Image />} />
          <Route path="/profile-page" element={<Profile />} />
          <Route path="/posts" element={<PostPage />} />
          <Route path="/posts/:postId" element={<PostPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
