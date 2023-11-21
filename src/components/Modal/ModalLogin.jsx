import React from "react";
import styles from "./Modal.module.scss";
const Modal = () => {
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className="modalText">
          <h2>Log In</h2>
          <p>
            Welcome back! Please enter your credentials to access your account
            and continue your search for a psychologist.
          </p>
        </div>
        <form className="modalForm">
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
