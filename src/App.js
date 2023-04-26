//import Scss
import "./assets/scss/themes.scss";
import "swiper/swiper-bundle.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import React from "react";

import SwiperCore, { Autoplay } from "swiper";

import Router from "./routes/Router";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  SwiperCore.use([Autoplay]);

  return (
      <BrowserRouter>
        <Router /> 
        <ToastContainer />;
      </BrowserRouter>
  );
};

export default App;
