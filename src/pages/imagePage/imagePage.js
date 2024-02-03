import React, { useState, useEffect } from 'react';
import { useAuth } from '../login/AuthContext';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TopBar from '../../components/TopBar';

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
      // 用户未登录只加载/img/publicImage文件夹下的图片
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
      <TopBar />
      <header className="App-header">
        <Typography variant="h1">IML 幻魔联盟</Typography>
        <Typography variant="h2">Image Page</Typography>
      </header>
      <Card>
        <CardContent>
          <img src={images[currentImageIndex]} alt={`Image ${currentImageIndex + 1}`} style={{ width: '100%' }} />
        </CardContent>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px' }}>
          <Button variant="contained" color="primary" onClick={handlePrevClick}>
            上一张
          </Button>
          <Button variant="contained" color="primary" onClick={handleNextClick}>
            下一张
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default ImagePage;
