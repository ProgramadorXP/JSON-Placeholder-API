import styles from "./Photo.module.css";

export default function Photo({url, title}) {

  return (
    <div className={styles.photo}>
        <img className={styles.photo__img} src={url} alt="" />
        <p className={styles.photo__title}>{title}</p>
    </div>
  )
}
