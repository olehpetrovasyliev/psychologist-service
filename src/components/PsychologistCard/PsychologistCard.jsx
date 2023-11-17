import React, { useState } from "react";
import svg from "../../assets/sprite.svg";
import styles from "./psychologistCard.module.scss";

const PsychologistCard = ({
  name,
  avatar_url,
  experience,
  price_per_hour,
  rating,
  license,
  specialization,
  initial_consultation,
  about,
  reviews,
}) => {
  const [isFullOpened, setIsFullOpened] = useState(false);
  return (
    <li>
      <div className="psychologistCardWrapper">
        <div className={styles.psychologistAvatarWrapper}>
          <img
            src={avatar_url}
            alt={name + " " + "photo"}
            className={styles.psychologistAvatar}
            width={"96px"}
            height={"96px"}
          />
          <span className={styles.online}></span>
        </div>
        <div>
          <p className={styles.psychologist}>Psychologist</p>
          <h3 className={styles.name}>{name}</h3>
          <div className={styles.numbersWrapper}>
            <div className={styles.ratingWraper}>
              {" "}
              <svg width={16} height={16}>
                <use href={svg + "#icon-star"}></use>
              </svg>
              <p className={styles.numbers}>Rating: {rating}</p>
            </div>
            <span className={styles.delimiter}></span>
            <p className={styles.numbers}>
              Price / 1 hour:{" "}
              <span className={styles.price}>{price_per_hour + "$"}</span>
            </p>
          </div>

          <div>
            <svg fill="none" stroke="#000" width={40}>
              <use href={svg + "#icon-heart"}></use>
            </svg>
          </div>
        </div>
        <div>
          <div className={styles.characteristicsWrapper}>
            <p className={styles.characterisics}>
              Experience: <span>{experience}</span>
            </p>
            <p className={styles.characterisics}>
              License: <span>{license}</span>
            </p>
          </div>
          <div className={styles.characteristicsWrapper}>
            <p className={styles.characterisics}>
              Specialisation: <span>{specialization}</span>
            </p>
            <p className={styles.characterisics}>
              Initial consultation: <span>{initial_consultation}</span>
            </p>
          </div>
        </div>
        <p className={styles.about}>{about}</p>
        {!isFullOpened ? (
          <button onClick={() => setIsFullOpened((prew) => !prew)}>
            Read more
          </button>
        ) : (
          <ul>
            {reviews.map((r) => (
              <li>
                <div className={styles.reviewerDetails}>
                  <span className={styles.pseudoAvatar}>{r.reviewer[0]}</span>

                  <div>
                    <h4 className={styles.reviewerName}>{r.reviewer}</h4>
                    <div className={styles.reviewRatingWrapper}>
                      <svg width={16} height={16}>
                        <use href={svg + "#icon-star"}></use>
                      </svg>{" "}
                      <p>{r.rating}</p>
                    </div>
                  </div>
                </div>
                <p>{r.comment}</p>
              </li>
            ))}
            <button>Make an appointment</button>
          </ul>
        )}
      </div>
    </li>
  );
};
export default PsychologistCard;
