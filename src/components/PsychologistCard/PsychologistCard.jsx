import React, { useState } from "react";
import svg from "../../assets/sprite.svg";
import styles from "./psychologistCard.module.scss";
import humanPlaceholder from "../../assets/images/human-placeholder.jpg";
import { useDispatch } from "react-redux";
import { openModalAppointment } from "../../helpers/redux/modal/modalSlice";

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
  const dispatch = useDispatch();
  const [isFullOpened, setIsFullOpened] = useState(false);

  return (
    <li className={styles.psychologistCardWrapper}>
      <div className={styles.mainInfoWrapper}>
        <div className={styles.psychologistAvatarWrapper}>
          <img
            src={avatar_url ? avatar_url : humanPlaceholder}
            alt={name + " " + "photo"}
            className={styles.psychologistAvatar}
            width={"96px"}
            height={"96px"}
          />
          <span className={styles.online}></span>
        </div>
        <div>
          <div className={styles.topicWrapper}>
            <div>
              <p className={styles.psychologist}>Psychologist</p>
              <h3 className={styles.name}>{name}</h3>
            </div>
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
              <button className={styles.favBtn}>
                <svg
                  fill="none"
                  stroke="#000"
                  width={40}
                  height={40}
                  className={styles.heart}
                >
                  <use href={svg + "#icon-heart"}></use>
                </svg>
              </button>
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
            <button
              onClick={() => setIsFullOpened((prew) => !prew)}
              className={styles.readMoreBtn}
            >
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
                  <p className={styles.comment}>{r.comment}</p>
                </li>
              ))}
              <button onClick={() => dispatch(openModalAppointment())}>
                Make an appointment
              </button>
            </ul>
          )}
        </div>
      </div>
    </li>
  );
};
export default PsychologistCard;
