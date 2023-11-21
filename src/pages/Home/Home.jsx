import React from "react";
import heroImage from "../../assets/images/heroImage.png";
import styles from "./Home.module.scss";
import svg from "../../assets/sprite.svg";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import PsychologistsList from "../../components/PsychologistsList/PsychologistsList";
const Home = () => {
  return (
    <>
      <section className="hero">
        <div className={styles.heroWrapper}>
          <div className="content-wrapper">
            <h1 className={styles.heroHeading}>
              The road to the <i>depths</i> of the human soul
            </h1>
            <p className={styles.heroText}>
              We help you to reveal your potential, overcome challenges and find
              a guide in your own life with the help of our experienced
              psychologists.
            </p>
            <Link to="/psychologists" className={styles.heroBtn}>
              Get started{" "}
              <svg width={18} height={18}>
                <use href={svg + "#icon-arow"}></use>
              </svg>
            </Link>
          </div>
          <div className={styles.imageWrapper}>
            <img
              src={heroImage}
              alt="psychologist"
              className={styles.heroImage}
            />

            <div className={styles.decorQuestion}>
              <svg width={15} height={21}>
                <use href={svg + "#icon-question"}></use>
              </svg>
            </div>
            <div className={styles.decorPeople}>
              <svg width={30} height={30}>
                <use href={svg + "#icon-people"}></use>
              </svg>
            </div>
            <div className={styles.decorMain}>
              <div className={styles.checkedWrapper}>
                <svg width={30} height={30}>
                  <use href={svg + "#icon-checked"}></use>
                </svg>
              </div>
              <div>
                {" "}
                <div className={styles.decorMainText}>
                  Experienced psichologists
                </div>{" "}
                <div className={styles.decorMainNumber}>15,000</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <PsychologistsList />
    </>
  );
};

export default Home;
