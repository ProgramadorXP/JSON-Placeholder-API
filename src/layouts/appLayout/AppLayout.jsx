import { Link, Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./AppLayout.module.css";
import { useEffect, useState } from "react";

export default function AppLayout() {
  //Hooks
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  //Getting key authToken from localStorage to know if the user has logged in
  const token = localStorage.getItem("authToken");
  const userData = JSON.parse(localStorage.getItem("user"));

  //State to open and close the nav menu
  const openMenu = () => {
    setIsExpanded(!isExpanded);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    navigate("/profile");
  }

  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  //Hook to check if the key saved in the local storage doesn't exist
  useEffect(() => {
    if (!token && !userData) {
      navigate("/login");
    }
  });

  return (
    <>
      <ToastContainer />
      <div className={styles.container}>
        <header className={styles.header}>
          <h2>
            {"{"}JSON{"}"} Placehoder API
          </h2>
          <span onClick={openMenu}>
            {isExpanded ? <CloseIcon /> : <MenuIcon />}
          </span>
          <ul
            className={
              isExpanded ? `${styles.menu} ${styles.openMenu} ` : styles.menu
            }
          >
            <li>
              <Link className={styles.menu__link} to={"/"}>
                Home
              </Link>
            </li>
            <li>
              <Link className={styles.menu__link} to={"/albums"}>
                Albums
              </Link>
            </li>
            <li>
              <Link className={styles.menu__link} to={"/todos"}>
                Todos
              </Link>
            </li>
            <li>
              {userData && (
                <>
                  <Button
                    sx={{ padding: 0 }}
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    <img
                      src={userData.avatar}
                      className={styles.menu__avatar}
                      alt="Avatar image"
                    />
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem onClick={handleProfile}>Profile</MenuItem>
                    <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                  </Menu>
                </>
              )}
            </li>
          </ul>
        </header>
        <main className={styles.main}>
          <Outlet />
        </main>
        <footer className={styles.footer}>
          <p>&copy; All rights reserved {new Date().getFullYear()}</p>
        </footer>
      </div>
    </>
  );
}
