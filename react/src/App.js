import AOS from 'aos';
import 'aos/dist/aos.css';
import { useContext, useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { About } from "./components/about/About";
import DropdownAvatar from "./components/dropdown_avatar/DropdownAvatar";
import ProductPage from "./components/product_page/product_page";
import ShoppingCart from "./components/shoppingcart/ShoppingCart";
import { UserInfo } from "./components/user_info/UserInfo";
import { AuthContext } from "./context/AuthContext";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import { PageRegister } from "./pages/PageRegister";
import PageSignIn from "./pages/PageSignIn";
import Comment from './components/comment/Comment';
function App() {
  const navigate = useNavigate();
  const {isLogin}  = useContext(AuthContext)
    useEffect(() => {
    AOS.init();
  }, [])
  console.log('trạng thái ',isLogin);
  return   <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route path="/about" element={<About />} />
      </Route>
      <Route path="accounts" element={<Layout />}>
        <Route path="register" element={<PageRegister />} />
        <Route path="signin" element={isLogin ? <Navigate replace to="/"/> : <PageSignIn/>} />
        <Route path="info" element={<UserInfo />} />
      </Route>
      <Route path="products" element={<Layout />}>
        <Route path="1" element = {<ProductPage/>}/>
      </Route>
      <Route path="/avatar" element={<DropdownAvatar />} />
      <Route path="comments" element={<Comment />} />

    </Routes>
}

export default App;
