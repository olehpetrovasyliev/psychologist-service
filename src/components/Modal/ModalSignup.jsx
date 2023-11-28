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
const handleSubmit = async (values) => {
  try {
    const auth = getAuth(app);

    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );

    // Set the display name for the user
    await updateProfile(userCredential.user, {
      displayName: values.name,
    });

    toast.success("Profile created successfully");
  } catch (error) {
    toast.error("Sorry, server is dead");
  }
};
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
