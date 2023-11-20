import React from "react";
import styles from "./Modal.module.scss";
const Modal = () => {
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className="modal-text">
          <h2>Register</h2>
          <p>
            Thank you for your interest in our platform! In order to register,
            we need some information. Please provide us with the following
            information.
          </p>
        </div>
        <div className="modal-form">
          <input type="text" />
          <input type="text" />
          <input type="text" />
        </div>
        <button>Sing In</button>
      </div>
    </div>
  );
};

export default Modal;
