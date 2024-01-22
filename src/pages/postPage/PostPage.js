// PostPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostPage = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // 获取所有帖子
        axios.get('http://localhost:8080/api/posts')
            .then(response => setPosts(response.data))
            .catch(error => console.error('Error fetching posts:', error));
    }, []);

    return (
        <div>
            <h2>All Posts</h2>
            {posts.map(post => (
                <div key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                    {/* 显示帖子的其他信息 */}
                </div>
            ))}
        </div>
    );
};

export default PostPage;
