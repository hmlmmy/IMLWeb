// PostPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostPage = () => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({ title: '', content: '' });

    useEffect(() => {
        // 获取所有帖子
        axios.get('http://localhost:8080/api/posts')
            .then(response => setPosts(response.data))
            .catch(error => console.error('Error fetching posts:', error));
    }, []);

    const handleCreatePost = () => {
        // 创建新帖子
        axios.post('http://localhost:8080/api/posts', newPost)
            .then(response => {
                setPosts([...posts, response.data]);
                setNewPost({ title: '', content: '' });
            })
            .catch(error => console.error('Error creating post:', error));
    };

    const handleUpdatePost = (id, updatedPost) => {
        // 更新帖子
        axios.put(`http://localhost:8080/api/posts/${id}`, updatedPost)
            .then(() => {
                const updatedPosts = posts.map(post => (post.id === id ? updatedPost : post));
                setPosts(updatedPosts);
            })
            .catch(error => console.error('Error updating post:', error));
    };

    const handleDeletePost = (id) => {
        // 删除帖子
        axios.delete(`http://localhost:8080/api/posts/${id}`)
            .then(() => {
                const updatedPosts = posts.filter(post => post.id !== id);
                setPosts(updatedPosts);
            })
            .catch(error => console.error('Error deleting post:', error));
    };

    return (
        <div>
            <h2>All Posts</h2>
            {posts.map(post => (
                <div key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                    {/* 显示帖子的其他信息 */}

                    <button onClick={() => handleUpdatePost(post.id, { title: 'Updated Title', content: 'Updated Content' })}>
                        Update
                    </button>
                    <button onClick={() => handleDeletePost(post.id)}>
                        Delete
                    </button>
                </div>
            ))}

            <h2>Create a New Post</h2>
            <input
                type="text"
                placeholder="Title"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            />
            <textarea
                placeholder="Content"
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            />
            <button onClick={handleCreatePost}>
                Create Post
            </button>
        </div>
    );
};

export default PostPage;
