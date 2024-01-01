import React from "react";
<<<<<<< HEAD
import ReactDOM from "react-dom";
=======
import ReactDOM from "react-dom/client";
import "./assets/css/fontawesome/fontawesome-5.15.4.css";
import "./assets/css/website/style.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header/Header";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Register from "./components/Register/Register";
import SignIn from "./components/SignIn/SignIn";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Register />
  </React.StrictMode>
);
>>>>>>> master

//import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "remixicon/fonts/remixicon.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
