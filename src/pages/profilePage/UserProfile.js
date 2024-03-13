import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../login/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import TopBar from '../../components/TopBar';

const UserProfile = () => {
  const { state } = useLocation();
  const { user, updateUser, logoutUser } = useAuth();
  const navigate = useNavigate();

  const defaultUser = {
      id: 1,
      username: 'john_doe',
      fullName: 'John Doe',
      email: 'john.doe@example.com',
  };

  const [editing, setEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...defaultUser });
  const [logoutSuccess, setLogoutSuccess] = useState(false);
  
  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = async () => {
    try {
        const updatedUserData = await updateUser(editedUser);

        if (updatedUserData) {
            console.log('用户信息更新成功');
            setEditedUser({ ...updatedUserData });
            setEditing(false);
        }
    } catch (error) {
        console.error('用户信息更新失败:', error);
    }
};

  const handleCancelClick = () => {
    setEditing(false);
    setEditedUser({ ...user });
  };

  const handleLogoutClick = () => {
    // 在用户注销时调用 logoutUser 方法
    logoutUser();
    setLogoutSuccess(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  useEffect(() => {
    const fetchData = async () => {
        try {
            const userResponse = await axios.get(`http://localhost:8080/api/user/${user?.id}`);
  
            if (userResponse.status === 200) {
                console.log(userResponse.data);
                setEditedUser(userResponse.data || defaultUser); // 更新为从后端获取的用户信息
            } else {
                console.error('无法获取用户信息');
            }
        } catch (error) {
            console.error('获取用户信息时出错:', error);
        }
    };

    if (user && user.id) {
        fetchData();
    }
}, [user]);
  

  useEffect(() => {
    if (logoutSuccess) {
      // 如果注销成功，等待3秒后返回主界面
      const timeoutId = setTimeout(() => {
        navigate('/');
      }, 3000);

      // 在组件卸载时清除定时器，防止内存泄漏
      return () => clearTimeout(timeoutId);
    }
  }, [logoutSuccess, navigate]);

  return (
    <div>
      <TopBar />
      <Card>
        <CardContent>
          <div>
            <h2>User Profile</h2>
            <div>
              <strong>ID:</strong> {user.id}
            </div>
            <div>
              <strong>Username:</strong>{' '}
              {editing ? (
                <TextField
                  type="text"
                  name="username"
                  value={editedUser.username}
                  onChange={handleInputChange}
                />
              ) : (
                user.username
              )}
            </div>
            <div>
              <strong>Email:</strong> {user.email}
            </div>

            {editing ? (
              <div>
                <Button variant="contained" onClick={handleSaveClick}>
                  Save
                </Button>
                <Button variant="outlined" onClick={handleCancelClick}>
                  Cancel
                </Button>
              </div>
            ) : (
              <div>
                <Button variant="contained" onClick={handleEditClick}>
                  Edit Profile
                </Button>
                <Button variant="outlined" onClick={handleLogoutClick}>
                  Logout
                </Button>
              </div>
            )}

            {logoutSuccess && <div>Logout successful. Redirecting to the main page in 3 seconds...</div>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
