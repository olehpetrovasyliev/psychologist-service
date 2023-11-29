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
import svg from "../../assets/sprite.svg";
import { toast } from "react-toastify";

const Header = () => {
  const [user, setUser] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      console.log(user);
    });
    return () => unsubscribe();
  }, []);
  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      toast.success("Logout successful. See you soon!");
    }
  };

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
            <div className={styles.anotherOneWrapper}>
              <div className={styles.profileInfoWrapper}>
                <div className={styles.avatarWrapper}>
                  <svg width={24} height={24}>
                    <use href={svg + "#icon-mdi_user"}></use>
                  </svg>
                </div>
                <p className={styles.userName}>{user.displayName}</p>
              </div>
              <button className={styles.logoutBtn} onClick={handleLogout}>
                Log Out
              </button>
            </div>
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
                Sign Up
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
