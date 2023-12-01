import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./Modal.module.scss";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { app } from "../../firebase";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { closeModalSignup } from "../../helpers/redux/modal/modalSlice";
import sprite from "../../assets/sprite.svg";

const ModalSignup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeModalSignup());
    document.body.classList.remove("modal-open");
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handleSubmit = async (values) => {
    try {
      const auth = getAuth(app);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      await updateProfile(userCredential.user, {
        displayName: values.name,
      });
      handleClose();
      toast.success("Profile created successfully");
    } catch (error) {
      toast.error("Sorry, server is dead");
    }
  };

  return (
    <div className={styles.backdrop} onClick={() => handleClose()}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        tabIndex="0"
      >
        <div className="modalText">
          <button className={styles.closeButton} onClick={handleClose}>
            X
          </button>
          <h2>Register</h2>
          <p>
            Thank you for your interest in our platform! In order to register,
            we need some information. Please provide us with the following
            information.
          </p>
        </div>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            name: Yup.string().required("Required"),
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            password: Yup.string().required("Required"),
          })}
          onSubmit={handleSubmit}
        >
          <Form className="modalForm">
            <Field type="text" placeholder="Name" name="name" />
            <ErrorMessage name="name" component="div" className="error" />

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

            <button type="submit" className={styles.submitBtn}>Sign Up</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default ModalSignup;
