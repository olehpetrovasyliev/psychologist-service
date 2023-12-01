// MobileBurgerMenu.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeBurgerMenu,
  openModalLogin,
  openModalSignup,
} from "../../../helpers/redux/modal/modalSlice";
import styles from "./Burger.module.scss"; // Add your styles
import { useNavigate } from "react-router";
import { auth } from "../../../firebase";
import { Link, NavLink } from "react-router-dom";
import svg from "../../../assets/sprite.svg";

const MobileBurgerMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = auth.currentUser;

  const closeMenu = () => {
    document.body.classList.remove("modal-open");
    dispatch(closeBurgerMenu());
  };
  const openLink = (link) => {
    navigate(link);
    closeMenu();
  };
  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    } finally {
      closeMenu();
      toast.success("Logout successful. See you soon!");
    }
  };
  const openLogin = () => {
    dispatch(openModalLogin());
    closeMenu();
    document.body.classList.add("modal-open");
  };
  const openSignup = () => {
    dispatch(openModalSignup());
    closeMenu();
    document.body.classList.add("modal-open");
  };
  return (
    <div className={styles.brgrWrapper}>
      <div className={styles.menuContent}>
        <button onClick={closeMenu} className={styles.closBtn}>X</button>
      </div>
      <nav className={styles.brgrNav}>
        <NavLink
          to={"/"}
          className={styles.brgrNavLink}
          onClick={() => openLink("/")}
        >
          Home
        </NavLink>
        <NavLink
          to={"/psychologists"}
          className={styles.brgrNavLink}
          onClick={() => openLink("/psychologists")}
        >
          Psychologists
        </NavLink>
        {user && (
          <NavLink
            to={"/favorites"}
            className={styles.brgrNavLink}
            onClick={() => openLink("/favorites")}
          >
            Favorites
          </NavLink>
        )}
      </nav>
      <div>
        {user ? (
          <div>
            <div className={styles.anotherOneWrapper}>
              <div className={styles.profileInfoWrapper}>
                <div className={styles.avatarWrapper}>
                  <svg width={32} height={32} stroke="#000">
                    <use href={svg + "#icon-mdi_user"}></use>
                  </svg>
                </div>
                <p className={styles.userName}>{user.displayName}</p>
              </div>
              <button className={styles.logoutBtn} onClick={handleLogout}>
                Log Out
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.authWrapper}>
            <button className={styles.loginBtn} onClick={openLogin}>
              Log In
            </button>
            <button className={styles.brgrSingup} onClick={openSignup}>
              Sign Up
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileBurgerMenu;
