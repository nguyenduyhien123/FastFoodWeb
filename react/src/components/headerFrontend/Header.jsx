import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';
import DropdownAvatar from '../dropdown_avatar/DropdownAvatar';
import { ProductSearch } from '../product_search/ProductSearch';
import "./header.scss";

const navLinks = [
  {
    display: 'Trang chủ',
    url: '/'
  },
  {
    display: 'Thông tin',
    url: '/about'
  },
  {
    display: 'Thực đơn',
    url: '/menu'
  },
  {
    display: 'Liên hệ',
    url: '#footer_web'
  },
];

const Header = ({ cartItemCount }) => {
  const menuRef = useRef();

  const menuToggle = () => menuRef.current.classList.toggle('active_menu');

  // Sử dụng state để cập nhật số lượng sản phẩm trong giỏ hàng
  const [updatedCartItemCount, setUpdatedCartItemCount] = useState(cartItemCount);

  // Sử dụng useEffect để cập nhật số lượng sản phẩm trong giỏ hàng khi có thay đổi
  useEffect(() => {
    setUpdatedCartItemCount(cartItemCount);
  }, [cartItemCount]);

  return (
    <header className="header_web">
      <Container>
        <div className="navigation">
          <div className="logo">
            <Link to="/">
              <h2 className='d-flex align-items-center gap-1'>
                <span><i className="ri-restaurant-2-line"></i></span>{" "} Chef Food
              </h2>
            </Link>
          </div>
          <div className="nav_menu " ref={menuRef}>
            <div className="nav_list_wrapper d-flex align-items-center gap-5">
              <ul className="nav_list">
                {navLinks.map((item, index) => (
                  <li className="nav_item" key={index}><Link to={item.url} onClick={menuToggle}>{item.display}</Link></li>
                ))}
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
            <Link to={"/accounts/wishlist"}>
              <button className="material-symbols-outlined favorite">
                favorite
              </button>
            </Link>
          </div>
          <div>
            <Link to="/cart" className="cart_icon">
              <i className="ri-shopping-basket-line"></i>
              {/* Sử dụng updatedCartItemCount thay vì cartItemCount */}
              <span className="badge">{updatedCartItemCount}</span>
            </Link>
          </div>
          <div className="mobile_menu">
            <span><i className="ri-menu-line " onClick={menuToggle}></i></span>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
