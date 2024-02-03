import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext';
import TopBar from '../../components/TopBar';
import { Grid, Paper, Typography, TextField, Button } from '@material-ui/core';

const Register = () => {
  const navigate = useNavigate();
  const { loginUser } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState(null);

  const handleRegister = () => {
    const registrationData = {
      username: username,
      password: password,
      email: email
    };

    // 模拟发送注册请求到后端
    axios.post('http://localhost:8080/api/user/register', registrationData)
      .then(response => {
        // 如果后端返回成功响应
        console.log('注册成功', response.data);

        // 更新前端注册状态
        loginUser();
        setRegistered(true);

        // 使用 navigate 跳转到主界面
        setTimeout(() => {
          navigate('/');
        }, 3000);
      })
      .catch(error => {
        // 如果注册失败
        if (error.response) {
          // 请求已发出，但服务器响应状态码不在 2xx 范围内
          console.error('注册失败', error.response.data);

          // 根据后端返回的状态码进行处理
          if (error.response.status === 400) {
            // 处理用户名或电子邮件已存在的情况
            // 更新界面上的错误提示信息
            setError('用户名或电子邮件已被注册');
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

  return (
    <div>
      <TopBar />
      <Grid container justify="center" alignItems="center" style={{ height: '100vh', display: 'flex', justifyContent: 'center' }}>
        <Grid item xs={10} sm={6} md={4} lg={3}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h5" align="center" gutterBottom>
              {registered ? '注册成功！' : '用户注册'}
            </Typography>

            {error && <Typography variant="body1" style={{ color: 'red', marginBottom: '10px' }}>{error}</Typography>}

            {registered ? (
              <Typography variant="body1" style={{ textAlign: 'center' }}>
                请登录到您的帐户。
              </Typography>
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

                <TextField
                  label="电子邮件"
                  type="email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

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

export default Register;
