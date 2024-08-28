import { Link, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./AuthLayout.module.css";

export default function AuthLayout() {
  return (
    <>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>
            {"{"}JSON{"}"} Placehoder APP
          </h1>
        </header>
        <Outlet />
        <div>
          <p>Visit <Link to={"https://jsonplaceholder.typicode.com/"} className={styles.link}>https://jsonplaceholder.typicode.com/</Link> to see all users available</p>
        </div>
        <footer className={styles.footer}>
          <p>&copy; All rights reserved {new Date().getFullYear()}</p>
        </footer>
      </div>
      <ToastContainer />
    </>
  );
}
