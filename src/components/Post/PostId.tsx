import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../Post/PostId.module.css";
import { LikeButton } from "../LikeButton/LikeButton";
import { Comments } from "./Comments/Comments";
import { NoResults } from "../Feed/NoResults/NoResults";
import { IoMdArrowRoundBack } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { removePost } from "../../store/slices/postsSlice";


export const PostId: React.FC = () => {
  const { postid } = useParams();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.posts.posts);

 
  const numericId = Number(postid);
  const foundPost = posts.find((p) => p.id === numericId);

  if (!foundPost) {
    return (
      <div className={styles.noPost}>
        <NoResults resetSearch={() => navigate('/')} />
      </div>
    );
  }
  

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

  const handleDelete = () => {
    dispatch(removePost(numericId));
    navigate(-1); 
  };

  return (
    <div className={styles.postContainer}>
      <div className={styles.postItem}>
        <div className={styles.feeditem}>
          <div className={styles.top}>
            <h3>{foundPost.title}</h3>
            <p>{foundPost.date}</p>
          </div>
          <div className={styles.content}>
            <p className={isExpanded ? styles.textLeft : styles.textCenter}>
              {isExpanded ? foundPost.body : getShortText(foundPost.body)}
              {foundPost.body.split(" ").length > 5 && (
                <button onClick={toggleText} className={styles.seeMoreButton}>
                  {isExpanded ? "show less" : "see more"}
                </button>
              )}
            </p>
            <img className={styles.img} src={foundPost.image} alt={foundPost.title} />
          </div>
          <div className={styles.bottom}>
            <LikeButton postId={foundPost.id} />
            <button onClick={handleDelete} className={styles.deleteButton}>
              <RiDeleteBinLine />
            </button>
          </div>
        </div>
      </div>
            <button onClick={() => navigate(-1)} className={styles.backPostButton}>
              <IoMdArrowRoundBack size={25}/>
            </button>
      <Comments postId={foundPost.id} />
    </div>
  );
};
