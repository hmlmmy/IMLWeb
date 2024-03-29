import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext';
import TopBar from '../../components/TopBar';
import { Grid, Paper, Typography, TextField, Button } from '@material-ui/core';

const Login = () => {
  const navigate = useNavigate();
  const { loginUser } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    const authData = {
      username: username,
      password: password
    };

    try {
      const processedUserData = await loginUser(authData);

      if (processedUserData) {
          console.log('登录成功', processedUserData);
          setLoggedIn(true);

          // 使用 navigate 跳转到主界面
          setTimeout(() => {
              navigate('/', { state: { loginUser: processedUserData } });
          }, 3000);
      }

    } catch (error) {
      // 处理错误
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
    }
  };

  const handleRegister = () => {
    navigate('/register'); // 在注册完成后跳转到注册页面
  };

  const handleLogout = () => {
    // 处理注销逻辑，例如向服务器发送请求注销当前用户

    // 模拟注销成功
    setLoggedIn(false);
  };

  useEffect(() => {
    // 在此处检查 loginUser 是否已更新
    // console.log('Login user updated:', loginUser());
  }, [loginUser]);

  return (
    <div>
      <TopBar />
      <Grid container justify="center" alignItems="center" style={{ height: '100vh', display: 'flex', justifyContent: 'center' }}>
        <Grid item xs={10} sm={6} md={4} lg={3}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h5" align="center" gutterBottom>
              {loggedIn ? '欢迎回来！' : '请登录'}
            </Typography>

            {error && <Typography variant="body1" style={{ color: 'red', marginBottom: '10px' }}>{error}</Typography>}

            {loggedIn ? (
              <Button variant="contained" color="primary" fullWidth onClick={handleLogout}>
                注销
              </Button>
            ) : (
              <div>
                <TextField
                  label="用户名"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />

                <TextField
                  label="密码"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
                  登录
                </Button>
                <Button variant="contained" color="primary" fullWidth onClick={handleRegister}>
                  注册
                </Button>
              </div>
            )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
