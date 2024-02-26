import AOS from 'aos';
import 'aos/dist/aos.css';
import React, { useContext, useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate, useLocation, BrowserRouter as Router, useParams } from "react-router-dom";
import "./App.css";
<<<<<<< HEAD
import { About } from "./components/about/About";
import Comment from './components/comment/Comment';
import DropdownAvatar from "./components/dropdown_avatar/DropdownAvatar";
import { Payment } from './components/payment/Payment';
import ProductPage from "./components/product_page/product_page";
import ShoppingCart from "./components/shoppingcart/ShoppingCart";
import { UserInfo } from "./components/user_info/UserInfo";
import { AuthContext } from "./context/AuthContext";
import Home from "./pages/client/Home";
import Layout from "./pages/client/Layout";
import { PageRegister } from "./pages/client/PageRegister";
import PageSignIn from "./pages/client/PageSignIn";
// Admin 

import { ProductSearchOption } from './components/product_search/ProductSearchOption';
import { OrderDetailUser } from './components/user_info/OrderDetailUser';
import { ResetPasswordSetPassword } from './components/user_info/ResetPasswordSetPassword';
import { ResetPasswordVerifyEmail } from './components/user_info/ResetPasswordVerifyEmail';
import {WishList} from './components/wishlist/WishList';
import { Alerts, Avatars, Buttons, Charts, Colors, Fields, Headings, Tables } from "./pages/blocks";
import {
  Analytics,
  BlankPage,
  CRM,
  Ecommerce,
  ForgotPassword,
  InvoiceDetails,
  InvoiceList,
  Login,
  Message,
  MyAccount,
  Notification,
  OrderList,
  ProductList,
  ProductUpload,
  ProductView,
  Register,
  Settings,
  UserList, UserProfile
} from "./pages/master";
import CommentList from './pages/master/CommentList';
import ProductEdit from './pages/master/ProductEdit';
import UserCreate from './pages/master/UserCreate';
import UserEdit from './pages/master/UserEdit';
import { ChangeLog, Documentation, Error, Overview } from "./pages/supports";

=======
import { AuthContext } from "./context/AuthContext";
import { ListRouteClient } from './route/ListRouteClient';
import Layout from "./pages/client/Layout";
import { Forbidden_403 } from './components/status_code_Error/Forbidden_403';
import { ListRouteAdmin } from './route/ListRouteAdmin';
>>>>>>> master

// Admin
function App() {
  const navigate = useNavigate();
<<<<<<< HEAD
  const { isLogin } = useContext(AuthContext)
  useEffect(() => {
    AOS.init();
  }, [])
  console.log('trạng thái ', isLogin);
  return <> <Routes>

    <Route path="/" element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/shopping-cart" element={<ShoppingCart />} />
      <Route path="/about" element={<About />} />
      <Route path="/payments" element={<Payment />} />
      <Route path="/wishlist" element={<WishList />} />
      <Route path="/search" element={<ProductSearchOption />} />


    </Route>
    <Route path="accounts" element={<Layout />}>
      <Route path="register" element={<PageRegister />} />
      <Route path="signin" element={isLogin ? <Navigate replace to="/" /> : <PageSignIn />} />
      <Route path="change-password" element={<UserInfo />} />
      <Route path="manage-order" element={<UserInfo />} />
      <Route path="edit" element={<UserInfo />} />
      <Route path="reset-password/verify-email" element={<ResetPasswordVerifyEmail />} />
      <Route path="reset-password/set-password" element={<ResetPasswordSetPassword />} />
      <Route path="manage-order/:code" element={<OrderDetailUser />} />
    </Route>
    <Route path="products" element={<Layout />}>
      <Route path=":id" element={<ProductPage />} />
    </Route>
    <Route path="/avatar" element={<DropdownAvatar />} />
    <Route path="comments" element={<Comment />} />

    {/* Admin */}
    {/* master Pages */}
    <Route path="/admin/ecommerce" element={<Ecommerce />} />
    <Route path="/admin/analytics" element={<Analytics />} />
    <Route path="/admin/crm" element={<CRM />} />
    <Route path="/admin/login" element={<Login />} />
    <Route path="/admin/register" element={<Register />} />
    <Route path="/admin/forgot-password" element={<ForgotPassword />} />
    <Route path="/admin/user-list" element={<UserList />} />
    <Route path="/admin/user-profile/:id" element={<UserProfile />} />
    <Route path="/admin/user-create" element={<UserCreate />} />
    <Route path="/admin/user-edit/:id" element={<UserEdit />} />
    <Route path="/admin/my-account" element={<MyAccount />} />
    <Route path="/admin/product-list" element={<ProductList />} />
    <Route path="/admin/product-view/:id" element={<ProductView />} />
    <Route path="/admin/product-edit/:id" element={<ProductEdit />} />
    <Route path="/admin/product-upload" element={<ProductUpload />} />
    <Route path="/admin/invoice-list" element={<InvoiceList />} />
    <Route path="/admin/comment-list" element={<CommentList />} />
    <Route path="/admin/invoice-details/:id" element={<InvoiceDetails />} />
    <Route path="/admin/order-list" element={<OrderList />} />
    <Route path="/admin/message" element={<Message />} />
    <Route path="/admin/notification" element={<Notification />} />
    <Route path="/admin/settings" element={<Settings />} />
    <Route path="/admin/blank-page" element={<BlankPage />} />

    {/* Blocks Pages */}
    <Route path="/admin/headings" element={<Headings />} />
    <Route path="/admin/buttons" element={<Buttons />} />
    <Route path="/admin/avatars" element={<Avatars />} />
    <Route path="/admin/colors" element={<Colors />} />
    <Route path="/admin/charts" element={<Charts />} />
    <Route path="/admin/tables" element={<Tables />} />
    <Route path="/admin/fields" element={<Fields />} />
    <Route path="/admin/alerts" element={<Alerts />} />

    {/* Supports Pages */}
    <Route path="*" element={<Error />} />
    <Route path="/admin/" element={<Overview />} />
    <Route path="/admin/documentation" element={<Documentation />} />
    <Route path="/admin/changelog" element={<ChangeLog />} />
=======
  const location = useLocation();
  const { isLogin, isAuthencating, setIsAuthencating, userInfo } = useContext(AuthContext)
  useEffect(() => {
    AOS.init();
  }, [])

  if (isAuthencating) {
    return <> </>
  }
  // 
  const checkAuthorize = (path, roleIdCurrent) => {
    if (path === "/") {
      return true;
    }
    else if (path?.startsWith('/admin') && roleIdCurrent === 3) {
      return true;
    }
    else if (path?.startsWith('/staff') && roleIdCurrent === 1) {
      return true;
    }
    else if(path === '/accounts/signin' || path == '/accounts/register')
    {
      return false;
    }
    else if (path?.startsWith('/accounts') && roleIdCurrent) {
      return true;
    }
    else {
      const disallowedPaths = ['/admin', '/accounts', '/staff'];
      let flag = disallowedPaths.some((disallowedPath) => {
        return path.startsWith(disallowedPath);
      });
      if (flag) {
        return false;
      }
      return true;
    }
  }
  console.log(userInfo);
  return <> <Routes>
    <Route path="/" element={<Layout />}>
      {/* Route phía client */}
      {ListRouteClient?.map((item, index) => {
        return <Route path={item?.path} Component={(props) => {
          if (checkAuthorize(item?.path, userInfo?.roleId)) {
            // console.log('Đúng');
            return item?.element
          }
          else if (location.pathname === '/accounts/signin' || location.pathname === '/accounts/register') {
            if(userInfo?.roleId)
            { 
            navigate('/', { state: { from: location } })
            }
            
            else
            {
              return item?.element
            }
          }
          else {
            if(userInfo?.roleId)
            {
              return <Forbidden_403></Forbidden_403>
            }
            else
            {
              navigate('/accounts/signin', { state: { from: location } })
            }
          }
        }} />
      })}
    </Route>
    {/* Route phía admin */}
    {ListRouteAdmin?.map((item, index) => {
        return <Route path={item?.path} Component={(props) => {
          if (checkAuthorize(item?.path, userInfo?.roleId)) {
            return item?.element
          }
          else if (location.pathname === '/accounts/signin' || location.pathname === '/accounts/register') {
            if(userInfo?.roleId)
            { 
            navigate('/', { state: { from: location } })
            }
            else
            {
              return item?.element
            }
          }
          else {
            if(userInfo?.roleId)
            {
              return <Forbidden_403></Forbidden_403>
            }
            else
            {
              navigate('/accounts/signin', { state: { from: location } })
            }
          }
        }} />
      })}
>>>>>>> master
  </Routes>
  </>
}

export default App;
