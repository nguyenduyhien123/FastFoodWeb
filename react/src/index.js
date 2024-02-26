import React from "react";
import ReactDOM from 'react-dom/client';

import "./index.css";
// import 'sweetalert2/src/sweetalert2.scss'
// import "bootstrap/dist/css/bootstrap.css";
import "remixicon/fonts/remixicon.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import './assets/sass/styles.scss'



<<<<<<< HEAD
import {AuthContext, AuthContextProvider} from "./context/AuthContext";
=======
import { AuthContext, AuthContextProvider } from "./context/AuthContext";
>>>>>>> master

import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/Themes";
import { LoaderProvider } from "./context/Preloader";

//
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

// ReactDOM.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <AuthContextProvider>
//       <ThemeProvider>
//             <LoaderProvider>
//             <ToastContainer/>
//         <App />
//         </LoaderProvider>
//         </ThemeProvider>
//       </AuthContextProvider>
//     </BrowserRouter>
//   </React.StrictMode>,
//   document.getElementById("root")
// );
const root = ReactDOM.createRoot(document.getElementById('root'));
<<<<<<< HEAD
root.render(  <React.StrictMode>
  <BrowserRouter>
    <AuthContextProvider>
    <ThemeProvider>
          <ToastContainer/>
      <App />
=======
root.render(<React.StrictMode>
  <BrowserRouter>
    <AuthContextProvider>
      <ThemeProvider>
        <ToastContainer />
        <App />
>>>>>>> master
      </ThemeProvider>
    </AuthContextProvider>
  </BrowserRouter>
</React.StrictMode>);
// ReactDOM.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <AuthContextProvider>
//       <ThemeProvider>
//             <ToastContainer/>
//         <App />
//         </ThemeProvider>
//       </AuthContextProvider>
//     </BrowserRouter>
//   </React.StrictMode>,
//   document.getElementById("root")
<<<<<<< HEAD
// );
=======
// );
>>>>>>> master
