import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/fontawesome/fontawesome-5.15.4.css";
import "./assets/css/website/style.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header/Header";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import SignIn from "./components/SignIn/SignIn";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SignIn />
  </React.StrictMode>
);

reportWebVitals();
