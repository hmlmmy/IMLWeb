import React, { useState } from 'react';

const Login = () => {
  // 定义状态变量
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  // 处理登录按钮点击事件
  const handleLogin = () => {
    // 在这里添加登录逻辑，例如向服务器发送请求进行身份验证

    // 模拟登录成功
    setLoggedIn(true);
  };

  // 处理注销按钮点击事件
  const handleLogout = () => {
    // 在这里添加注销逻辑，例如向服务器发送请求注销当前用户

    // 模拟注销成功
    setLoggedIn(false);
  };

  return (
    <div>
      <h1>{loggedIn ? '欢迎回来！' : '请登录'}</h1>

      {loggedIn ? (
        <button onClick={handleLogout}>注销</button>
      ) : (
        <div>
          <label>用户名:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>密码:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleLogin}>登录</button>
        </div>
      )}
    </div>
  );
};

export default Login;
