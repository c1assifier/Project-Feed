import React, { useState, FormEvent } from 'react';
import styles from './Comments.module.css';
import { RiDeleteBinLine } from "react-icons/ri";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store/store';
import { addComment, removeComment } from '../../../store/slices/postsSlice';

interface CommentsProps {
  postId: number;
}

const Comments: React.FC<CommentsProps> = ({ postId }) => {
    const [newName, setNewName] = useState('');
    const [newComment, setNewComment] = useState('');

    const dispatch = useDispatch();

    const commentsAll = useSelector((state: RootState) => state.posts.comments);
     // Фильтруем нужные комменты только для текущего поста:
     const comments = commentsAll.filter((c) => c.postId === postId);


  const handleAddComment = () => {
    if (newName.trim() && newComment.trim()) {
      dispatch(addComment({ postId, name: newName, text: newComment }));
      setNewName('');
      setNewComment('');
    }
  };

  const handleDeleteComment = (commentId: number) => {
    dispatch(removeComment(commentId));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleAddComment();
  };

  return (
    <div className={styles.comments}>
      <h4>Comments:</h4>
      <ul className={styles.commentsList}>
        {comments.length === 0 ? (
          <li className={styles.noComments}>No comments yet. Be the first!</li>
        ) : (
          comments.map((comment) => (
            <li key={comment.id}>
              <div className={styles.commentContent}>
                <div className={styles.commentInfo}>
                  <div className={styles.commentName}>{comment.name}</div>
                  <div className={styles.commentText}>{comment.text}</div>
                </div>
                <button onClick={() => handleDeleteComment(comment.id)} className={styles.deleteButton}>
                  <RiDeleteBinLine />
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Your name"
        />
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
          rows={4}
        />
        <button type="submit" className={styles.addButton}>Add</button>
      </form>
    </div>
  );
};

export { Comments };