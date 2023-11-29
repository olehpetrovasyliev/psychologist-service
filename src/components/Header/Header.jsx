import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  openModalLogin,
  openModalSignup,
} from "../../helpers/redux/modal/modalSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

const Header = () => {
  const [user, setUser] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      console.log(user);
    });
    return () => unsubscribe();
  }, []);

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
          {user && (
            <NavLink to="/favorites" className={styles.headerNavLink}>
              Favorites
            </NavLink>
          )}
        </div>
        <div className={styles.headerButtonsWrapper}>
          {user ? (
            <p>{user.displayName}</p>
          ) : (
            <>
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
              </button>{" "}
            </>
          )}
        </div>
      </header>
      <Outlet />
    </>
  );
};

export default Header;
