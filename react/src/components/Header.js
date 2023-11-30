import React from 'react';
import { Outlet } from "react-router-dom";
import '../assets/css/components/Header.scss';
import image from '../assets/images/logo.png';
const Header = () => {
       const itemHeader = [
              [
                     {
                            link: 'inico',
                            text: 'Inicio'
                     },
                     {
                            link: 'menu',
                            text: 'Menu'
                     },
                     {
                            link: 'acercade',
                            text: 'Acerca de'
                     },
              ],
              [
                     {
                            link: 'opiniones',
                            text: 'Opiniones'
                     },
                     {
                            link: 'contacto',
                            text: 'Contacto'
                     },
                     {
                            link: 'blog',
                            text: 'Blog'
                     },
              ]
       ];
       return (
              <>
                     <header class="sitio-header">

                            <div id="menu-btn" class="fas fa-bars icono"></div>
                            <div id="search-btn" class="fas fa-search icono"></div>
                            <nav class="navbar">
                                   {
                                          itemHeader[0].map((item) => <a href={item.link}>{item.text}</a>)
                                   }
                                   <span class="espacio"></span>
                                   {
                                          itemHeader[1].map((item) => <a href={item.link}>{item.text}</a>)
                                   }
                            </nav>

                            <a href="#" class="fas fa-shopping-cart icono"></a>

                            <a href="#inicio" class="logo"><img src={image} alt="" /></a>

                            <form action="" class="busqueda-form">
                                   <input type="search" name="" placeholder="search here..." id="caja-busqueda" />
                                   <label for="#caja-busqueda" class="fas fa-search icono"></label>
                            </form>
                     </header>

                     <Outlet />
              </>

       );
}

export default Header
