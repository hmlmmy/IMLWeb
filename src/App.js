// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet, useNavigate } from 'react-router-dom';
import './App.css';
import MyComponent from './MyComponent';
import ImagePage from './pages/imagePage/imagePage';
import mainPic from './03491-3325640943-1.png';

function App() {
  const NavigateButton = () => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
      navigate('/image-page');
    };

    return (
      <div>
        {/* 添加跳转按钮 */}
        <button onClick={handleButtonClick}>跳转到图片页面</button>
      </div>
    );
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>IML 幻魔联盟</h1>
        </header>
        <main>
          <MyComponent />
          <Routes>
            <Route path="/image-page" element={<ImagePage />} />
          </Routes>

          <img src={mainPic} alt="IML Logo" />
          <NavigateButton />

          {/* 使用 Outlet 渲染子路由 */}
          <Outlet />
        </main>
        <footer>
          <p>© 2023 IML Web</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
