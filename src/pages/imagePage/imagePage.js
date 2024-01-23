import React, { useState, useEffect } from 'react';
import { useAuth } from '../login/AuthContext';

function ImagePage() {
  const { isLoggedIn } = useAuth();
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const importAll = (r) => r.keys().map(r);
    let imageFiles;

    if (isLoggedIn) {
      // 用户登录后加载/img文件夹下的所有图片
      imageFiles = importAll(require.context('../../img', true, /\.(png|jpe?g|svg)$/));
    } else {
      // 用户未登录只加载/img/privateImage文件夹下的图片
      imageFiles = importAll(require.context('../../img/publicImage', false, /\.(png|jpe?g|svg)$/));
    }

    setImages(imageFiles);
  }, [isLoggedIn]);

  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1));
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
  };

  return (
    <div>
      <header className="App-header">
        <h1>IML 幻魔联盟</h1>
        <h2>Image Page</h2>
      </header>
      <img src={images[currentImageIndex]} alt={`Image ${currentImageIndex + 1}`} />
      <div>
        <button onClick={handlePrevClick}>上一张</button>
        <button onClick={handleNextClick}>下一张</button>
      </div>
    </div>
  );
}

export default ImagePage;
