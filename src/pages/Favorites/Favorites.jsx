import React, { useEffect, useState } from "react";
import PsychologistsList from "../../components/PsychologistsList/PsychologistsList";
import { child, get, ref } from "firebase/database";
import { auth, db } from "../../firebase";

const UserFavorites = () => {
  const [userFavorites, setUserFavorites] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUserFavorites = async () => {
      const userFavoritesRef = ref(db, `users/${currentUser.uid}/favorites`);
      try {
        const snapshot = await get(userFavoritesRef);
        const data = snapshot.val();

        if (data) {
          const favoritesArray = Object.values(data);
          setUserFavorites(favoritesArray);
          console.log("Favorites loaded successfully");
        } else {
          console.log("No favorites found");
        }
      } catch (error) {
        console.error("Error fetching user favorites: ", error);
      }
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
        fetchUserFavorites();
        console.log(user); // Move the console.log here
      }
    });

    return () => {
      // Unsubscribe from the auth state listener when the component unmounts
      unsubscribe();
    };
  }, []);

  return (
    <main>
      <PsychologistsList arr={userFavorites} />
    </main>
  );
};

export default UserFavorites;
