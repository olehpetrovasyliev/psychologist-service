import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./Modal.module.scss";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app, auth } from "../../firebase";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { closeModalLogin } from "../../helpers/redux/modal/modalSlice";
import sprite from "../../assets/sprite.svg";

const ModalLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === "Escape") {
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
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

  return (
    <div className={styles.backdrop} onClick={handleCloseModal}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        tabIndex="0"
      >
        <div className="modalText">
          <button className={styles.closeButton} onClick={handleCloseModal}>
            X
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

            <div className={styles.passwordInputWrapper}>
              <Field
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                className={styles.passwordInput}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={styles.togglePassword}
              >
                <svg
                  width={20}
                  height={20}
                  stroke="#000"
                  fill="transparent"
                  viewBox="0 0 24 24"
                >
                  <use
                    href={
                      showPassword
                        ? `${sprite}#icon-showpassword`
                        : `${sprite}#icon-hidepassword`
                    }
                  ></use>
                </svg>
              </button>
            </div>
            <ErrorMessage name="password" component="div" className="error" />

            <button type="submit" className={styles.submitBtn}>
              Log In
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default ModalLogin;
