import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
  // 假设这是从数据库或其他来源获取的用户信息
  const defaultUser = {
    id: 1,
    username: 'john_doe',
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    // 其他用户信息...
  };

  // 定义一些可能的操作和状态
  const [user, setUser] = useState(defaultUser);
  const [editing, setEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...defaultUser });

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const response = await axios.put('http://localhost:8080/api/user/1', editedUser);
      if (response.status === 200) {
        console.log('User data updated successfully');
        setUser({ ...editedUser });
        setEditing(false);
      } else {
        console.error('Failed to update user data');
      }
    } catch (error) {
      console.error('Error during user data update:', error);
    }
  };

  const handleCancelClick = () => {
    setEditing(false);
    // 如果取消编辑，恢复原始用户信息
    setEditedUser({ ...user });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/user/1');
        if (response.status === 200) {
          console.log(response.data);
          setUser(response.data || defaultUser);
          setEditedUser(response.data || defaultUser);
        } else {
          console.error('Failed to fetch user');
        }
      } catch (error) {
        console.error('Error during fetch:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      <h2>User Profile</h2>
      <div>
        <strong>ID:</strong> {user.id}
      </div>
      <div>
        <strong>Username:</strong>{' '}
        {editing ? (
          <input
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
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </div>
      ) : (
        <button onClick={handleEditClick}>Edit Profile</button>
      )}
    </div>
  );
};

export default UserProfile;
