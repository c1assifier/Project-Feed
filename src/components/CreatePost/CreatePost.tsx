import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CreatePost.module.css';
import { Post } from '../Feed/FeedItem/FeedItem';
import { useDispatch } from 'react-redux';
import { addPost } from '../../store/slices/postsSlice';

const CreatePost: React.FC = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!title.trim() || !body.trim()) {
      alert('Title and body cannot be empty.');
      return;
    }
  
    const formattedDate = new Date().toISOString().split('T')[0];
    
    const newPost: Post = {
      title: title.trim(),
      body: body.trim(),
      image: image.trim() || 'https://www.svgrepo.com/show/535297/circle-question.svg',
      date: formattedDate,
      id: -Date.now(), // Минус для того, чтобы избежать конфликтов с серверными постами
    };
  
    dispatch(addPost(newPost))
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          className={styles.placholder}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Body"
          value={body}
          className={styles.placholder}
          onChange={(e) => setBody(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          className={styles.placholder}
          onChange={(e) => setImage(e.target.value)
          }
        />
        <button type="submit">Create</button>
        <button type="button" onClick={() => navigate('/')}>Cancel</button>
      </form>
    </div>
  );
};

export { CreatePost };
