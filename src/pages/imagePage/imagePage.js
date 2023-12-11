// ImagePage.js

import React from 'react';
import { Outlet } from 'react-router-dom';
//import SubComponent from './SubComponent';  // 你的子组件的路径
import mainPic from '../../03492-4211708497-1 Best quality,masterpiece,ultra high res,(photorealistic_1.2),1girl,(light red hair_1.5),(bob cut_1.2),(bangs_1.2),(open clothe.png';

function ImagePage() {
  return (
    <div>
      <h2>图片页面</h2>
      <img src={mainPic} alt="IML Logo" />
      {/* 使用 Outlet 渲染子路由 */}
      <Outlet />
    </div>
  );
}

export default ImagePage;

