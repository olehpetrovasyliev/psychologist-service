import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./Modal.module.scss";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { app, auth } from "../../firebase";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  closeModalAppointment,
  closeModalLogin,
} from "../../helpers/redux/modal/modalSlice";

const ModalSignup = ({ psychologist }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Escape") {
        handleCloseModal();
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handleCloseModal = () => {
    dispatch(closeModalAppointment());
  };
  const handleSubmit = () => {
    toast.success("Thank you, we`ll send invitation via email");
    handleCloseModal();
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
          <h2>Make an appointment with a psychologists</h2>
          <p>
            You are on the verge of changing your life for the better. Fill out
            the short form below to book your personal appointment with a
            professional psychologist. We guarantee confidentiality and respect
            for your privacy.
          </p>
        </div>
        {/* <div>
          <img src={psychologist.avatar_url} alt="photo" />
          <p>Your psychologists</p>
          <h3>{psychologist.name}</h3>
        </div> */}
        <Formik
          initialValues={{
            name: "",
            phone: "",
            email: "",
            comment: "",
          }}
          validationSchema={Yup.object({
            name: Yup.string().required("Required"),
            phone: Yup.string()
              .matches(/^[0-9]+$/, "Invalid phone number")
              .required("Required"),
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            comment: Yup.string(),
          })}
          onSubmit={handleSubmit}
        >
          <Form className="modalForm">
            <Field type="text" placeholder="Name" name="name" />
            <ErrorMessage name="name" component="div" className="error" />
            <Field type="tel" placeholder="Phone" name="phone" />
            <ErrorMessage name="password" component="div" className="error" />

            <Field type="email" placeholder="Email" name="email" />
            <ErrorMessage name="email" component="div" className="error" />
            <Field type="textarea" placeholder="Comment" name="comment" />

            <button type="submit">Sign Up</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default ModalSignup;
