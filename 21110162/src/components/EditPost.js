// EditPost.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditPost({ posts, setPosts }) {
  const { id } = useParams();
  const navigate = useNavigate(); 

  const postToEdit = posts.find((post) => post.id === Number(id));
  const [editedPost, setEditedPost] = useState(postToEdit);

  if (!postToEdit) {
    // Xử lý trường hợp không tìm thấy bài viết
    return <div>Bài viết không tồn tại.</div>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPost({ ...editedPost, [name]: value });
  };

  const handleSave = () => {
    // Tạo một danh sách mới được cập nhật
    const updatedPosts = posts.map((post) =>
      post.id === Number(id) ? editedPost : post
    );
    
    // Cập nhật danh sách `posts`
    setPosts(updatedPosts);
  
    // Sau khi cập nhật xong, chuyển hướng người dùng đến trang chi tiết bài viết
    navigate(`/post/${id}`);
  };

  return (
    <div>
      <h2>Edit Post</h2>
      <form>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={editedPost.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            name="content"
            value={editedPost.content}
            onChange={handleInputChange}
          />
        </div>
        <button onClick={handleSave}>Save</button>
      </form>
    </div>
  );
}

export default EditPost;
