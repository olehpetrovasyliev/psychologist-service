import React from "react";
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
import { closeModalLogin } from "../../helpers/redux/modal/modalSlice";

const ModalSignup = () => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeModalLogin());
  };

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
          <h2>Make an appointment</h2>
          <p>This modal is not ready yet</p>
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

            <Field type="password" placeholder="Password" name="password" />
            <ErrorMessage name="password" component="div" className="error" />

            <button type="submit">Sign Up</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default ModalSignup;
