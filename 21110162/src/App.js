// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import PostDetail from './components/PostDetail'; // Import component trang chi tiết bài viết
import EditPost from './components/EditPost'; // Import EditPost


function App() {
  const [posts, setPosts] = useState([]);

  const addPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  const handleDeletePost = (postId) => {
    // Lọc ra danh sách bài viết, loại bỏ bài viết có ID trùng với postId
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
  };

  const handleComment = (postId, comment) => {
    setPosts((prevPosts) =>
      prevPosts.map((prevPost) => {
        if (prevPost.id === postId) {
          // Kiểm tra xem thuộc tính 'comments' có được định nghĩa chưa, nếu chưa, tạo một mảng rỗng
          const comments = prevPost.comments || [];
          // Tạo một bản sao mới của bài viết với bình luận mới được thêm vào
          const updatedPost = { ...prevPost, comments: [...comments, comment] };
          return updatedPost;
        }
        return prevPost;
      })
    );
  };  
  
  return (
    <div className="App">
      <Router>
        <h1>Simple Blog</h1>
        <nav>
          <Link to="/">Home</Link>
        </nav>
        <Routes>
          <Route path="/post/:id" element={<PostDetail posts={posts} setPosts={setPosts} onComment={handleComment} />} />
          <Route path="/" element={<PostList posts={posts} onDelete={handleDeletePost} />} /> {/* Truyền hàm xử lý sự kiện xóa */}
          <Route path="/" element={<PostList posts={posts} />} />
          <Route path="/post/:id" element={<PostDetail posts={posts} />} /> {/* Định nghĩa route cho trang chi tiết */}
          <Route path="/edit/:id" element={<EditPost posts={posts} setPosts={setPosts} />} /> {/* Thêm route cho trang sửa bài viết */}
        </Routes>
        <PostForm onPost={addPost} />
      </Router>
    </div>
  );
}

export default App;
