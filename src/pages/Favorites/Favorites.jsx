import React, { useState } from "react";
import PsychologistsList from "../../components/PsychologistsList/PsychologistsList";

const Favorites = () => {
  const [favorites, setsFavorites] = useState([]);
  return (
    <main>
      <PsychologistsList arr={favorites} />
    </main>
  );
};

export default Favorites;
