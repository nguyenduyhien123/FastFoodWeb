import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "remixicon/fonts/remixicon.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import './assets/sass/styles.scss'

import {AuthContext, AuthContextProvider} from "./context/AuthContext";

import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/Themes";
import { LoaderProvider } from "./context/Preloader";
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
      <ThemeProvider>
            <LoaderProvider>
        <App />
        </LoaderProvider>
        </ThemeProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);