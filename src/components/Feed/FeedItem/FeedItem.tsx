import { useState } from "react";
import styles from "./FeedItem.module.css";
import { Link } from "react-router-dom";
import { LikeButton } from "../../LikeButton/LikeButton";

export interface Post {
  title: string;
  body: string;
  date: string;
  image: string;
  id: number;
}

interface FeedItemProps {
  post: Post;
}

export const FeedItem = ({ post }: FeedItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  const getShortText = (text: string) => {
    const words = text.split(" ");
    if (words.length > 5) {
      return words.slice(0, 5).join(" ") + "...";
    }
    return text;
  };

  return (
    <>
      <div className={styles.feeditem}>
        <div className={styles.top}>
          <h3>{post.title}</h3>
          <p>{post.date}</p>
        </div>

        <div className={styles.content}>
          <p className={isExpanded ? styles.textLeft : styles.textCenter}>
            {isExpanded ? post.body : getShortText(post.body)}
            {post.body.split(" ").length > 5 && (
              <button onClick={toggleText} className={styles.seeMoreButton}>
                {isExpanded ? "show less" : "see more"}
              </button>
            )}
          </p>
          <img className={styles.img} src={post.image} alt="" />
        </div>

        <div className={styles.bottom}>
          <LikeButton postId={post.id} />
          <Link to={`/post/${post.id}`} className={styles.viewPostButton}>
            View Post
          </Link>
        </div>
      </div>
      <hr />
    </>
  );
};
