import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { createPortal } from "react-dom";
import {
  selectIsBurgerMenuOpen,
  selectIsModalLoginOpen,
  selectIsModalSignupOpen,
} from "./helpers/redux/modal/modalSelectors.js";
import ModalSignup from "./components/Modal/ModalSignup.jsx";
import ModalLogin from "./components/Modal/ModalLogin.jsx";
import ModalEnroll from "./components/Modal/modalEnroll.jsx";
import MobileBurgerMenu from "./components/Header/Burger/BurgerMenu.jsx";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home/Home"));
const Psychologists = lazy(() => import("./pages/Psychologists/Psychologists"));
const Favorites = lazy(() => import("./pages/Favorites/Favorites"));
const Header = lazy(() => import("./components/Header/Header"));

function App() {
  const isModalSignupOpen = useSelector(selectIsModalSignupOpen);
  const isModalLoginOpen = useSelector(selectIsModalLoginOpen);
  const isBurgerMenuOpen = useSelector(selectIsBurgerMenuOpen);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Header />
            </Suspense>
          }
        >
          <Route
            index
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="/psychologists"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Psychologists />
              </Suspense>
            }
          />
          <Route
            path="/favorites"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Favorites />
              </Suspense>
            }
          />
        </Route>
      </Routes>
      {isModalSignupOpen && createPortal(<ModalSignup />, document.body)}
      {isModalLoginOpen && createPortal(<ModalLogin />, document.body)}
      {isBurgerMenuOpen && createPortal(<MobileBurgerMenu />, document.body)}

      <ToastContainer autoClose={1000} />
    </>
  );
}

export default App;
