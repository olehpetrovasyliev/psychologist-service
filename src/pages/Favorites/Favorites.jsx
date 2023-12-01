import React, { useEffect, useState } from "react";
import PsychologistsList from "../../components/PsychologistsList/PsychologistsList";
import { child, get, onValue, ref } from "firebase/database";
import { auth, db } from "../../firebase";
import styles from "./Favorites.module.scss";

const MyFavorites = () => {
  const [favoritePsychologists, setFavoritePsychologists] = useState([]);

  useEffect(() => {
    const { currentUser } = auth;

    if (!currentUser) {
      return;
    }

    const userFavoritesRef = ref(db, `users/${currentUser.uid}/favorites`);

    const handleFavoritesChange = (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const psychologistsArray = Object.values(data);
        setFavoritePsychologists(psychologistsArray);
      } else {
        setFavoritePsychologists([]);
      }
    };

    const favoritesListener = onValue(userFavoritesRef, handleFavoritesChange);

    return () => {
      favoritesListener();
    };
  }, []);
  return (
    <main>
      {favoritePsychologists.length ? (
        <PsychologistsList arr={favoritePsychologists} />
      ) : (
        <div className={styles.placeholder}>
          <p>You don`t have favorite psychologists yet</p>
        </div>
      )}
    </main>
  );
};

export default MyFavorites;
