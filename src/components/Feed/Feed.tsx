import { FeedItem } from "./FeedItem/FeedItem";
import styles from "./Feed.module.css";
import { useState, useEffect } from "react";
import { apiInstance } from "../../services/instance";
import { ENDPOINTS } from "../../services/endpoints";
import { Post } from "./FeedItem/FeedItem";
import { SyncLoader } from "react-spinners"; 
import { NoResults } from "./NoResults/NoResults";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { appendPosts } from "../../store/slices/postsSlice";

interface FeedProps {
  searchTerm: string;
  resetSearch: () => void;
}

export const Feed = ({ searchTerm, resetSearch }: FeedProps) => {
  const [visiblePosts, setVisiblePosts] = useState(2);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();

  const posts = useSelector((state: RootState) => state.posts.posts);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await apiInstance.get<Post[]>(ENDPOINTS.POSTS);
        dispatch(appendPosts(response.data));
        setError(null);
      } catch (err) {
        setError("Ошибка при загрузке постов");
        console.error("Error fetching posts:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [dispatch]);

  const loadMorePosts = () => {
    setVisiblePosts((prev) => prev + 2);
  };

  const handleResetSearch = () => {
    setVisiblePosts(2); 
    resetSearch(); 
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className={styles.feed}>
      <h1>Feed</h1>

      {error && <div className={styles.error}>{error}</div>}

      {isLoading ? (
        <div className={styles.loading}>
          <SyncLoader color="black" size={30} speedMultiplier={0.5} />
          <p>Please wait page is loading...</p>
        </div>
      ) : (
        <>
          {filteredPosts.length === 0 ? ( // Если постов нет
            <NoResults resetSearch={handleResetSearch} />
          ) : (
            <>
              {filteredPosts.slice(0, visiblePosts).map((post) => (
                <FeedItem key={post.id} post={post} />
              ))}

              {visiblePosts < filteredPosts.length && (
                <button
                  onClick={loadMorePosts}
                  className={styles.loadMoreButton}
                >
                  Load more
                </button>
              )}

              <Link to="/create" className={styles.createButton}>
                <FaPlus />
              </Link>
            </>
          )}
        </>
      )}
    </main>
  );  
};
