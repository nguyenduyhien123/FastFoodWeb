import React from "react";
import ReactDOM from "react-dom";

//import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "remixicon/fonts/remixicon.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import {AuthContext, AuthContextProvider} from "./context/AuthContext";

import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ProductPage from "./components/product_page/product_page";
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
