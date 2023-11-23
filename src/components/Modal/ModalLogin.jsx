import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./Modal.module.scss";
import { app } from "../../firebase";
// import "firebase/auth";

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
          onSubmit={() => console.log(1)}
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
