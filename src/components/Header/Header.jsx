import React, { useState } from "react";
import styles from "./Header.module.scss";
import { Link, NavLink, Outlet } from "react-router-dom";

const Header = () => {
  const [isAuth, setIsAuth] = useState(true);
  return (
    <>
      <header className={styles.header}>
        <div>
          <Link to="/" className={styles.logo}>
            psychologists.<span>services</span>
          </Link>
        </div>
        <div className={styles.linksWrapper}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/psychologists">Psychologists</NavLink>
          {isAuth && <NavLink to="/favorites">Favorites</NavLink>}
        </div>
        <div className={styles.headerButtonsWrapper}>
          <button className={styles.login}>Log In</button>
          <button className={styles.signup}>sign Up</button>
        </div>
      </header>
      <Outlet />
    </>
  );
};

export default Header;
