import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
import "./App.css";
import Home from "./pages/Home";
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'
import PageSignIn from "./pages/PageSignIn";
import DropdownAvatar from "./components/dropdown_avatar/DropdownAvatar";
import {AuthContextProvider} from "./context/AuthContext";
import { About } from "./components/about/About";
function App() {
  useEffect(() => {
    AOS.init();
  }, [])
  return <BrowserRouter>
    <AuthContextProvider>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Route>
      <Route path="accounts" element={<Layout />}>
        <Route path="register" element={<Register />} />
        <Route path="signin" element={<PageSignIn />} />
      </Route>
      <Route path="/avatar" element={<DropdownAvatar />} />

    </Routes>
    </AuthContextProvider>
  </BrowserRouter>
}

export default App;
