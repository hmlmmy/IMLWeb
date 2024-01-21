// Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import MyComponent from './MyComponent';
import mainPic from './img/03491-3325640943-1.png';

function Home() {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/image-page');
    };

    const handleProfileClick = () => {
        navigate('/profile-page');
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
                        <div className="nav-link" onClick={handleButtonClick}>
                            Image
                        </div>
                    </div>
                </div>
            </header>
            <button onClick={handleProfileClick}>Profile</button>
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
