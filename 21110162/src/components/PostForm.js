// src/components/PostForm.js
import React, { useState } from 'react';

function PostForm({ onPost }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const generateRandomId = () => {
    return Math.floor(Math.random() * 10000); // Tạo một số ngẫu nhiên làm ID
  };

  const handleSubmit = () => {
    if (title.trim() && content.trim()) {
      const newPost = {
        id: generateRandomId(), // Tạo ID ngẫu nhiên cho bài viết mới
        title,
        content,
      };
      onPost(newPost);
      setTitle('');
      setContent('');
    }
  };

  return (
    <div>
      <h2>Create a New Post</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleSubmit}>Post</button>
    </div>
  );
}

export default PostForm;
