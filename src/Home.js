// Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import MyComponent from './MyComponent';
import mainPic from './img/03491-3325640943-1.png'

function Home() {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        // 使用 navigate 进行页面导航
        navigate('/image-page');
    };

    return (
        <div className='App'>          
            <header className="App-header">
                <h1>IML 幻魔联盟</h1>
                <h2>Home Page</h2>
            </header>
            <button onClick={handleButtonClick}>Go to Image Page</button>
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
