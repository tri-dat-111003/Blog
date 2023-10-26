// src/components/PostList.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function PostList({ posts, onDelete }) {
  const [expandedPosts, setExpandedPosts] = useState([]);

  const toggleExpand = (postId) => {
    if (expandedPosts.includes(postId)) {
      setExpandedPosts(expandedPosts.filter(id => id !== postId));
    } else {
      setExpandedPosts([...expandedPosts, postId]);
    }
  };

  const handleDelete = (postId) => {
    // Gọi hàm xử lý sự kiện xóa và truyền ID của bài viết cần xóa
    onDelete(postId);
  };

  return (
    <div>
      <h2>Blog Posts</h2>
      {posts.map((post, index) => (
        <div key={index} className="post">
          <h3>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
            <button onClick = {() => handleDelete(post.id)}>Delete</button> {/* Thêm nút Xóa */}
            <Link to={`/edit/${post.id}`}>Edit</Link> {/* Liên kết đến trang chỉnh sửa bài viết */}
          </h3>
          <p>
            {expandedPosts.includes(post.id) ? post.content : post.content.slice(0, 100)}
            {post.content.length > 100 && (
              <button onClick={() => toggleExpand(post.id)}>
                {expandedPosts.includes(post.id) ? "Show Less" : "Read More"}
              </button>
              
            )}
          </p>
        </div>
      ))}
    </div>
  );
}

export default PostList;
