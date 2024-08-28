import { Link } from "react-router-dom";
import styles from "./Album.module.css";

export default function Album({ id, title, username, avatar }) {
  return (
    <li className={styles.item}>
            <img className={styles.item__avatar} src={avatar} alt="" />
        <div>
            <p className={styles.item__username}>{username}</p>
            <Link to={`/photos/${id}`} className={styles.item__title}>{title}</Link>
        </div>
    </li>
  )
}
