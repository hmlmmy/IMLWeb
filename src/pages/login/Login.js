import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { loginUser } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    const authData = {
      username: username,
      password: password
    };

// 模拟发送身份验证请求到后端
axios.post('http://localhost:8080/api/user/authenticate', authData)
  .then(response => {
    // 如果后端返回成功响应
    console.log('身份验证成功', response.data);

    // 更新前端登录状态
    loginUser();
    setLoggedIn(true);

    // 使用 navigate 跳转到主界面
    setTimeout(() => {
      navigate('/');
    }, 3000);
  })
  .catch(error => {
        // 如果身份验证失败
        if (error.response) {
          // 请求已发出，但服务器响应状态码不在 2xx 范围内
          console.error('身份验证失败', error.response.data);

          // 根据后端返回的状态码进行处理
          if (error.response.status === 401) {
            // 处理用户名或密码不正确的情况
            // 更新界面上的错误提示信息
            setError('用户名或密码不正确');
          } else if (error.response.status === 500) {
            // 处理服务器内部错误的情况
            // 更新界面上的错误提示信息
            setError('服务器内部错误，请稍后重试');
          } else {
            // 其他状态码的处理
            setError('发生错误，请稍后重试');
          }
        } else if (error.request) {
          // 请求已发出，但没有收到响应
          console.error('无法获取响应', error.request);
        } else {
          // 在设置请求时触发了错误
          console.error('请求失败', error.message);
        }
      });

  };

  const handleLogout = () => {
    // 处理注销逻辑，例如向服务器发送请求注销当前用户

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
