import { TbError404 } from "react-icons/tb";
import styles from "../Feed.module.css";
import { RiResetLeftFill } from "react-icons/ri";

interface NoResultsProps {
  resetSearch: () => void; 
}

const NoResults: React.FC<NoResultsProps> = ({ resetSearch }) => (
  <div className={styles.noResults}>
    <TbError404 className={styles.errorIcon} />
    <p>Oops! The post you're looking for was not found.</p>
    <button onClick={resetSearch} className={styles.resetButton}>
      <RiResetLeftFill />
      Show initial posts
    </button>
  </div>
);

export { NoResults };
