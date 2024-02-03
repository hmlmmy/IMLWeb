// TopBar.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AuthContext from '../pages/login/AuthContext';

const TopBar = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  const handleImageClick = () => {
    navigate('/image-page');
  };

  const handlePostClick = () => {
    navigate('/posts');
  };

  const handleProfileClick = () => {
    if (isLoggedIn) {
      navigate('/profile-page');
    } else {
      navigate('/login');
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" style={{ flex: 1 }}>
          IML 幻魔联盟
        </Typography>
        <Button color="inherit" onClick={() => navigate('/')}>
          Home
        </Button>
        <Button color="inherit" onClick={handleImageClick}>
          Image
        </Button>
        <Button color="inherit" onClick={handlePostClick}>
          Posts
        </Button>
        <Button color="inherit" onClick={handleProfileClick}>
          {isLoggedIn ? 'Profile' : 'Login'}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
