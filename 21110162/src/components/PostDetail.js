// src/components/PostDetail.js
import { React, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams

function PostDetail({ posts, onComment, setPosts }) {
  const { id } = useParams(); // Trích xuất id từ URL

  // State cho nội dung bình luận mới
  const [newComment, setNewComment] = useState('');

  // Tìm bài viết theo id
  const post = posts.find((post) => post.id === Number(id));

  if (!post) {
    return <div>Post not found.</div>;
  }

  const handleCommentSubmit = () => {
    // Gọi hàm xử lý bình luận và truyền nội dung bình luận
    onComment(post.id, newComment);

    // Xóa nội dung bình luận trong ô nhập
    setNewComment('');

    // Kiểm tra nếu thuộc tính 'comments' không phải là mảng, thì tạo một mảng mới với nội dung bình luận
    const updatedComments = Array.isArray(post.comments) ? [...post.comments, newComment] : [newComment];

    // Cập nhật danh sách bài viết sau khi thêm comment
    const updatedPost = { ...post, comments: updatedComments };

    setPosts((prevPosts) =>
      prevPosts.map((prevPost) =>
        prevPost.id === post.id ? updatedPost : prevPost
      )
    );
  };

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>

      <h3>Comments</h3>
      <ul>
        {post.comments && post.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>

      <div>
        <textarea
          rows="3"
          placeholder="Add a comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleCommentSubmit}>Submit Comment</button>
      </div>
    </div>
  );
}

export default PostDetail;
