import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./Modal.module.scss";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebase";
import { toast } from "react-toastify";

const handleSubmit = async (values) => {
  try {
    const auth = getAuth(app);

    await signInWithEmailAndPassword(auth, values.email, values.password);

    toast.success("Login successful");
  } catch (error) {
    toast.error("Invalid credentials. Please try again.");
  }
};

const ModalLogin = () => {
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
