import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./pages/Home/Home";
import PsychologistCard from "./components/PsychologistCard/PsychologistCard";
import { db } from "./firebase.js";
import Modal from "./components/Modal/ModalRegister.jsx";
import Header from "./components/Header/Header.jsx";
import { Routes, Route } from "react-router";
import Psychologists from "./pages/Psychologists/Psychologists.jsx";
import Favorites from "./pages/Favorites/Favorites.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="/psychologists" element={<Psychologists />} />
          <Route path="/favorites" element={<Favorites />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
