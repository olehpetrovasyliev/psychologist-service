import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./Modal.module.scss";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app, auth } from "../../firebase";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { closeModalLogin } from "../../helpers/redux/modal/modalSlice";

const ModalLogin = () => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeModalLogin());
  };

  const handleSubmit = async (values) => {
    try {
     
      await signInWithEmailAndPassword(auth, values.email, values.password);
      handleClose();
      toast.success("Login successful");
    } catch (error) {
      toast.error("Invalid credentials. Please try again.");
    }
  };

  // Handle closing the modal when the escape key is pressed
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      handleClose();
    }
  };

  return (
    <div className={styles.backdrop} onClick={handleClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
        tabIndex="0"
      >
        <div className="modalText">
          <button className={styles.closeButton} onClick={handleClose}>
            Close
          </button>
          <h2>Log In</h2>
          <p>
            Welcome back! Please enter your credentials to access your account
            and continue your search for a psychologist.
          </p>
        </div>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            password: Yup.string().required("Required"),
          })}
          onSubmit={handleSubmit}
        >
          <Form className="modalForm">
            <Field type="email" placeholder="Email" name="email" />
            <ErrorMessage name="email" component="div" className="error" />

            <Field type="password" placeholder="Password" name="password" />
            <ErrorMessage name="password" component="div" className="error" />

            <button type="submit">Log In</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default ModalLogin;
