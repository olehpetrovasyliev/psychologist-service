import React from "react";
import heroImage from "../../assets/images/heroImage.png";
import styles from "./Home.module.scss";
const Home = () => {
  return (
    <section className="hero">
      <div className={styles.heroWrapper}>
        <div className="content-wrapper">
          <h1>
            The road to the <span className="h1-span">depths</span> of the human
            soul
          </h1>
          <p className={styles.heroText}>
            We help you to reveal your potential, overcome challenges and find a
            guide in your own life with the help of our experienced
            psychologists.
          </p>
          <button>Get started</button>
        </div>
        <div className="image-wrapper">
          <div className="decor">?</div>
          <div className="decor">svg</div>
          <div className="decor">
            svg <span>Experienced psichologists</span> <span>15,000</span>
          </div>
          <img src={heroImage} alt="1" />
        </div>
      </div>
    </section>
  );
};

export default Home;
