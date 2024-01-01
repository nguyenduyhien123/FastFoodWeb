import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
import "./App.css";
import Home from "./pages/Home";
function App() {
  useEffect(()=>{
    AOS.init();
  }, [])
  return <Home />
}

export default App;
