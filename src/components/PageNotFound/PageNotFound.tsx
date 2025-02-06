import { TbError404 } from "react-icons/tb";
import styles from "./PageNotFound.module.css";
import { Link } from "react-router-dom";
import { IoHomeSharp } from "react-icons/io5";

const PageNotFound = () => (
    <div className={styles.noData}> {/* Это клон NoResults, потому что так было легче сделать. */}
        <TbError404 className={styles.errorIcon} /> {/* Из за того что NoResults находится в Feed, он центрируется по центру экрана. */}
        <p>You may have entered the wrong address.</p> {/* А этот копмонент нет, и чтобы не городить лишнего, то пока что доудмался до этого. */}
        <Link to="/" className={styles.homeLink}>
          To main page
          <IoHomeSharp />
        </Link> {/* Ссылка на главную страницу. */}
    </div>
);

export { PageNotFound };