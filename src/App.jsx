import Home from "./pages/Home/Home";
import Modal from "./components/Modal/ModalSignup.jsx";
import Header from "./components/Header/Header.jsx";
import { Routes, Route } from "react-router";
import Psychologists from "./pages/Psychologists/Psychologists.jsx";
import Favorites from "./pages/Favorites/Favorites.jsx";
import { useSelector } from "react-redux";
import {
  selectIsModalLoginOpen,
  selectIsModalSignupOpen,
} from "./helpers/redux/modal/modalSelectors.js";
import ModalSignup from "./components/Modal/ModalSignup.jsx";
import ModalLogin from "./components/Modal/ModalLogin.jsx";

function App() {
  const isModalSignupOpen = useSelector(selectIsModalSignupOpen);
  const isModalLoginOpen = useSelector(selectIsModalLoginOpen);

  return (
    <>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="/psychologists" element={<Psychologists />} />
          <Route path="/favorites" element={<Favorites />} />
        </Route>
      </Routes>
      {isModalSignupOpen && <ModalSignup />}
      {isModalLoginOpen && <ModalLogin />}
    </>
  );
}

export default App;
