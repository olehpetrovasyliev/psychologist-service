import React, { useEffect, useState } from "react";
import PsychologistsList from "../../components/PsychologistsList/PsychologistsList";
import { child, get, ref } from "firebase/database";
import { db } from "../../firebase";

const Psychologists = () => {
  const [psychologists, setPsychologists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const psychologistsRef = ref(db);

      try {
        const snapshot = await get(child(psychologistsRef, "psychologists"));
        const data = snapshot.val();

        if (data) {
          const psychologistsArray = Object.values(data);
          setPsychologists((prev) => [...prev, ...psychologistsArray]);
        }
      } catch (error) {
        console.error("Error fetching data from Realtime Database: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main>
      <PsychologistsList arr={psychologists} />;
    </main>
  );
};

export default Psychologists;
