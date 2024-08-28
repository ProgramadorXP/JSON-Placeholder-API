import { Link } from "react-router-dom";
import styles from "./Profile.module.css";

export default function Profile() {
  const { avatar, name, email, username, phone, website, address, company } =
    JSON.parse(localStorage.getItem("user"));

  return (
    <section className={styles.profile}>
      <h3 className={styles.profile__title}>Profile</h3>
      <div className={styles.user}>
        <h4>User Information</h4>
        <img className={styles.user__avatar} src={avatar} alt="" />
        <div className={styles.details}>
          <p className={styles.user__name}>
            <span>Name:</span> {name}
          </p>
          <p className={styles.user__email}>
            <span>Email:</span> {email}
          </p>
          <p className={styles.user__username}>
            <span>Username:</span> {username}
          </p>
          <p className={styles.user__phone}>
            <span>Phone:</span> {phone}
          </p>
          <Link to={"#"}>
            <span>Website:</span> {website}
          </Link>
        </div>
      </div>
      <div className={styles.container__details}>
        <div className={styles.address}>
          <h4>Address Information</h4>
          <div className={styles.details}>
            <p className={styles.address__street}>
              <span>Street:</span> {address.street}
            </p>
            <p className={styles.address__suite}>
              <span>Suite:</span> {address.suite}
            </p>
            <p className={styles.address__zipcode}>
              <span>Zipcode:</span> {address.suite}
            </p>
            <p className={styles.address__city}>
              <span>City:</span> {address.city}
            </p>
          </div>
        </div>
        <div className={styles.company}>
          <h4>Company Information</h4>
          <div className={styles.details}>
            <p className={styles.company__name}>
              <span>Company name:</span> {company.name}
            </p>
            <p className={styles.company__catchPhrase}>
              <span>Catch Phrase:</span> {company.catchPhrase}
            </p>
            <p className={styles.company__bs}>
              <span>BS:</span> {company.bs}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
