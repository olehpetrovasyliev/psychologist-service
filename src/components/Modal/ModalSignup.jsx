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

const ModalSignup = () => {
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className="modalText">
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
          onSubmit={async (values) => {
            try {
              // Get the authentication instance
              const auth = getAuth(app);

              // Register the user with Firebase authentication
              await createUserWithEmailAndPassword(
                auth,
                values.email,
                values.password
              );

              // You can also update the user's display name if needed
              await updateProfile(auth.currentUser, {
                displayName: values.name,
              });

              // Handle any additional registration logic or redirect the user
              console.log("User registered successfully!");
            } catch (error) {
              console.error("Registration failed:", error.message);
            }
          }}
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
