import React, { useEffect, useState } from "react";
import PsychologistCard from "../PsychologistCard/PsychologistCard";
import { db } from "../../firebase.js";
import { child, get, ref } from "firebase/database";

const PsychologistsList = () => {
  const [psychologists, setPsychologists] = useState([]);
  const [visiblePsychologists, setVisiblePsychologists] = useState(3);

  useEffect(() => {
    const fetchData = async () => {
      const psychologistsRef = ref(db);

      try {
        const snapshot = await get(child(psychologistsRef, "psychologists"));
        const data = snapshot.val();

        if (data) {
          const psychologistsArray = Object.values(data);
          setPsychologists(psychologistsArray);
        }
      } catch (error) {
        console.error("Error fetching data from Realtime Database: ", error);
      }
    };

    fetchData();
  }, []);

  const handleLoadMore = () => {
    setVisiblePsychologists((prevVisible) => prevVisible + 3);
  };

  return (
    <div>
      <ul>
        {psychologists.slice(0, visiblePsychologists).map((el, index) => (
          <PsychologistCard
            key={index}
            name={el.name}
            avatar_url={el.avatar_url}
            experience={el.experience}
            price_per_hour={el.price_per_hour}
            rating={el.rating}
            license={el.license}
            specialization={el.specialization}
            initial_consultation={el.initial_consultation}
            about={el.about}
            reviews={el.reviews}
          />
        ))}
      </ul>
      {visiblePsychologists < psychologists.length && (
        <button onClick={handleLoadMore}>Load More</button>
      )}
    </div>
  );
};

export default PsychologistsList;
