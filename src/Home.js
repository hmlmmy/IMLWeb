// Home.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import MyComponent from './MyComponent';
import AuthContext from './pages/login/AuthContext';
import mainPic from './img/publicImage/62506b5adbeeed37373d05ab70d6b6b8.jpeg';

function Home() {
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
        <div className='App'>
            <header className="App-header">
                <div className="header-container">
                    <div className="title">
                        <h1>IML 幻魔联盟</h1>
                        <h2>Home Page</h2>
                    </div>
                    <div className="top-bar">
                        <div className="nav-link" onClick={() => navigate('/')}>
                            Home
                        </div>
                        <div className="nav-link" onClick={handleImageClick}>
                            Image
                        </div>
                        <div className="nav-link" onClick={handlePostClick}>
                            Posts
                        </div>
                        <div className="nav-link" onClick={handleProfileClick}>
                            Profile
                        </div>
                    </div>
                </div>
            </header>
            <main>
                <MyComponent />
            </main>
            <img src={mainPic} alt="IML Logo" />
            <footer>
                <p>© 2023 IML Web</p>
            </footer>
        </div>
    );
}

export default Home;
