import AOS from 'aos';
import 'aos/dist/aos.css';
import React, { useContext, useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate, useLocation, BrowserRouter as Router, useParams } from "react-router-dom";
import "./App.css";
import { AuthContext } from "./context/AuthContext";
import { ListRouteClient } from './route/ListRouteClient';
import Layout from "./pages/client/Layout";
import { Forbidden_403 } from './components/status_code_Error/Forbidden_403';
import { ListRouteAdmin } from './route/ListRouteAdmin';

// Admin
function App() {
  const navigate = useNavigate();
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
  </Routes>
  </>
}

export default App;
