// Home.js
import React from 'react';
import TopBar from './components/TopBar';
import MyComponent from './MyComponent';
import mainPic from './img/publicImage/62506b5adbeeed37373d05ab70d6b6b8.jpeg';

function Home() {
  return (
    <div className='App'>
      <TopBar />
      <main>
        <MyComponent />
        {/* 嵌入哔哩哔哩视频 */}
        <div>
          <iframe
            title="Bilibili Video"
            src="//player.bilibili.com/player.html?bvid=BV11b411r7Hf"
            scrolling="no"
            border="0"
            frameBorder="no"
            framespacing="0"
            allowFullScreen={true}
            style={{ width: '1200px', height: '600px' }}
          />
        </div>
      </main>
      {/* <img src={mainPic} alt="IML Logo" /> */}
      <footer>
        <p>© 2023 IML Web</p>
      </footer>
    </div>
  );
}

export default Home;
//请注意，我在 `src` 属性中使用了视频的 BV 号，确保替换为你实际视频的 BV 号。这样，你的 Bilibili 视频就应该在页面中显示了。
