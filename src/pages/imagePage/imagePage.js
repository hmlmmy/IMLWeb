// src\pages\imagePage\imagePage.js

import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const imageFolder = '/img'; // 你的图片文件夹路径

function ImagePage() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const importImages = async () => {
      try {
        const context = require.context('../../img', false, /\.(png|jpe?g|gif)$/);
        const imageFiles = context.keys().map((key) => key.substring(8));
        setImages(imageFiles);
      } catch (error) {
        console.error('Error loading images:', error);
      }
    };

    importImages();
  }, []);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
  };

  const currentImage = `${process.env.PUBLIC_URL}${imageFolder}/${images[currentIndex]}`;

  return (
    <div>
      <h2>图片页面</h2>
      <img src={currentImage} alt="IML Logo" />

      <div>
        <button onClick={handlePrevClick}>上一张</button>
        <button onClick={handleNextClick}>下一张</button>
      </div>

      {/* 使用 Outlet 渲染子路由 */}
      <Outlet />
    </div>
  );
}

export default ImagePage;
