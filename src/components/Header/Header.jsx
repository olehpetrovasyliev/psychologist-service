import React, { useState } from "react";
import styles from "./Header.module.scss";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  openModalLogin,
  openModalSignup,
} from "../../helpers/redux/modal/modalSlice";

const Header = () => {
  const [isAuth, setisAuth] = useState(false);
  const dispatch = useDispatch();
  return (
    <>
      <header className={styles.header}>
        <div>
          <Link to="/" className={styles.logo}>
            psychologists.<span>services</span>
          </Link>
        </div>
        <div className={styles.linksWrapper}>
          <NavLink to="/" className={styles.headerNavLink}>
            Home
          </NavLink>
          <NavLink to="/psychologists" className={styles.headerNavLink}>
            Psychologists
          </NavLink>
          {isAuth && (
            <NavLink to="/favorites" className={styles.headerNavLink}>
              Favorites
            </NavLink>
          )}
        </div>
        <div className={styles.headerButtonsWrapper}>
          <button
            className={styles.login}
            onClick={() => dispatch(openModalLogin())}
          >
            Log In
          </button>
          <button
            className={styles.signup}
            onClick={() => dispatch(openModalSignup())}
          >
            sign Up
          </button>
        </div>
      </header>
      <Outlet />
    </>
  );
};

export default Header;
