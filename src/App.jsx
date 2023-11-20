import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./pages/Home/Home";
import PsychologistCard from "./components/PsychologistCard/PsychologistCard";
import { db } from "./firebase.js";
import Modal from "./components/Modal/modal.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Home />
      <PsychologistCard
        name="Dr. Sarah Davis"
        avatar_url="https://ftp.goit.study/img/avatars/23.jpg"
        experience="12 years"
        price_per_hour={120}
        rating={4.75}
        license="Licensed Psychologist (License #67890"
        specialization="Depression and Mood Disorders"
        initial_consultation="Free 45-minute initial consultation"
        about="Dr. Sarah Davis is a highly experienced and licensed psychologist specializing in Depression and Mood Disorders. With 12 years of practice, she has helped numerous individuals overcome their depression and regain control of their lives. Dr. Davis is known for her empathetic and understanding approach to therapy, making her clients feel comfortable and supported throughout their journey to better mental health."
        reviews={[
          {
            reviewer: "Michael Brown",
            rating: 4.5,
            comment:
              "Dr. Davis has been a great help in managing my depression. Her insights have been valuable.",
          },
          {
            reviewer: "Linda Johnson",
            rating: 5,
            comment:
              "I'm very satisfied with Dr. Davis's therapy. She's understanding and empathetic.",
          },
        ]}
      />
      {console.log(db)}
      <Modal />
    </>
  );
}

export default App;
