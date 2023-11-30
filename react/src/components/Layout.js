import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import Slideshow from './Slideshow';

const Layout = () => {
       return (
              <>
                     <Header />
                     <Slideshow />
                     <Outlet />
                     <Footer />
              </>
       )
}

export default Layout