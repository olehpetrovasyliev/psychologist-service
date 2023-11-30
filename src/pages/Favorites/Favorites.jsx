import React, { useEffect, useState } from "react";
import PsychologistsList from "../../components/PsychologistsList/PsychologistsList";
import { child, get, onValue, ref } from "firebase/database";
import { auth, db } from "../../firebase";
import { useDispatch } from "react-redux";

const MyFavorites = () => {
  const [favoritePsychologists, setFavoritePsychologists] = useState([]);
  const dispatch = useDispatch();

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
        <p>You don`t have favoritew psychologists yet</p>
      )}
    </main>
  );
};

export default MyFavorites;
