// CommentForm.js
import React, { useState } from 'react';
import axios from 'axios';

const CommentForm = ({ postId }) => {
    const [content, setContent] = useState('');

    const handleComment = () => {
        // 发送评论请求到后端
        const commentData = { content, postId };
        axios.post('/api/comments', commentData)
            .then(response => console.log('Comment created successfully:', response.data))
            .catch(error => console.error('Error creating comment:', error));
    };

    return (
        <div>
            <textarea value={content} onChange={(e) => setContent(e.target.value)}></textarea>
            <button onClick={handleComment}>Comment</button>
        </div>
    );
};

export default CommentForm;
