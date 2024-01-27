import React, { useRef } from 'react'
import "./header.scss"

import { Link } from 'react-router-dom'
import { Container } from 'reactstrap'
import Cart from '../carts/Cart'
import DropdownAvatar from '../dropdown_avatar/DropdownAvatar'
import { ProductSearch } from '../product_search/ProductSearch'

const navLinks = [
       {
              display: 'Home',
              url: '#'
       },
       {
              display: 'About',
              url: '/about'
       },
       {
              display: 'Menu',
              url: '#'
       },
       {
              display: 'Recipes',
              url: '#'
       },
       {
              display: 'Contact',
              url: '#'
       },
]

const Header = () => {

       const menuRef = useRef()

       const menuToggle = () => menuRef.current.classList.toggle('active_menu')

       return (
              <header className="header_web">
                     <Container>
                            <div className="navigation">
                                   <div className="logo">
                                          <Link to="/">
                                                 <h2 className='d-flex align-items-center gap-1'>
                                                        <span><i class="ri-restaurant-2-line"></i></span>{" "} Chef Food
                                                 </h2>
                                          </Link>

                                   </div>
                                   <div className="nav_menu " ref={menuRef}>

                                          <div className="nav_list_wrapper d-flex align-items-center gap-5">
                                                 <ul className="nav_list">

                                                        {
                                                               navLinks.map((item, index) => (
                                                                      <li className="nav_item" key={index}><a href={item.url} onClick={menuToggle}>{item.display}</a></li>
                                                               ))
                                                        }

                                                 </ul>

                                                 <div className="menu_right">
                                                       <ProductSearch></ProductSearch>
                                                 </div>
                                          </div>
                                   </div>
                                   <div className="d-flex list-action align-items-center gap-4">

                                          <div className="avatar">
                                                 <DropdownAvatar></DropdownAvatar>
                                          </div>
                                          <Link to={"/wishlist"}>
                                          <button class="material-symbols-outlined favorite">
                                                 favorite
                                          </button>
                                          </Link>
                                   </div>
                                   <div>
                                          <Cart />
                                   </div>
                                   <div className="mobile_menu">
                                          <span><i class="ri-menu-line " onClick={menuToggle}></i></span>
                                   </div>
                            </div>
                     </Container>
              </header>
       )
}

export default Header
