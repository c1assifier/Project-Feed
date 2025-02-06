import React, { useState, useEffect } from 'react';
import { CiHeart } from "react-icons/ci";
import { FcLike } from "react-icons/fc";
import styles from './LikeButton.module.css';

interface LikeButtonProps {
    postId: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({ postId }) => {
    const [likes, setLikes] = useState(() => {
        const savedLikes = localStorage.getItem(`likes-${postId}`);
        return savedLikes ? parseInt(savedLikes) : 0;
    });

    const [isLiked, setIsLiked] = useState(() => {
        const savedIsLiked = localStorage.getItem(`isLiked-${postId}`);
        return savedIsLiked === 'true';
    });

    useEffect(() => {
        localStorage.setItem(`likes-${postId}`, likes.toString());
        localStorage.setItem(`isLiked-${postId}`, isLiked.toString());
    }, [likes, isLiked, postId]);

    const handleLike = () => {
        if (isLiked) {
            setLikes(likes - 1);
        } else {
            setLikes(likes + 1);
        }
        setIsLiked(!isLiked);
    };

    return (
        <div className={styles.likeComponent}>
            <button onClick={handleLike} className={styles.like}>
                {isLiked ? <FcLike /> : <CiHeart />}
            </button>
            <p>{likes}</p>
        </div>
    );
};

export { LikeButton };