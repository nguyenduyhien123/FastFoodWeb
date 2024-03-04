import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { ReactComponent as IconAccount } from '../../assets/icon/account.svg';
import { AuthContext } from '../../context/AuthContext';
import './Dropdown.scss';

const DropdownAvatar = () => {
  const { userInfo, isLogin, updateUserInfo, updateLogi, logoutUser, roleName } = useContext(AuthContext);

  const actionAccount = [
    { text: 'Thông tin tài khoản', link: '/accounts/edit' },
    { text: 'Lịch sử mua hàng', link: '/orders/history' },
    { text: 'Đơn hàng đã đặt', link: '/orders/confirmed' },
    { text: 'Đơn hàng đã giao', link: '/orders/shipped' },
    { text: 'Đổi mật khẩu', link: '/accounts/change-password' }
  ];

  const [slidingPaneOpen, setSlidingPaneOpen] = useState(false);

  const handleButtonClick = () => {
    setSlidingPaneOpen(!slidingPaneOpen);
  };

  return (
    <div className="dropdown-avatar">
      {!isLogin && <Link to="/accounts/signin"><img className='drop-btn' onClick={handleButtonClick} src='/icon/avatar.svg' alt="Avatar" /></Link>}
      {isLogin && <img className='drop-btn' onClick={handleButtonClick} src={userInfo?.avatar?.startsWith('https') ? userInfo?.avatar : `http://localhost:8000/storage/uploads/${userInfo?.avatar}`} alt="Avatar" />}
      {isLogin && 
        <SlidingPane
          className="some-custom-class popup-account"
          overlayClassName="some-custom-overlay-class"
          isOpen={slidingPaneOpen}
          onRequestClose={() => setSlidingPaneOpen(false)}
        >
          <h1 className='account-name'>Chào, {userInfo?.lastname + " " + (userInfo?.firstname ?? '')} !</h1>
          <p><span className='fw-bold'>{userInfo?.roleName}</span> - ({userInfo?.verify_account ? 'Đã xác thực' : 'Chưa xác thực'})</p>
          <div className='border-bottom'></div>
          <div className="list-action d-inline-flex gap-3 flex-wrap justify-content-center row mt-4">
            {actionAccount.map((data, index) => (
              <Link key={index} onClick={() => setSlidingPaneOpen(false)} to={data.link} className='action-item col-3 d-flex flex-wrap justify-content-center'>
                <div className="action-icon"><IconAccount /></div>
                <div className="action-name">{data.text}</div>
              </Link>
            ))}
            <div onClick={logoutUser} className='action-item col-3 d-flex flex-wrap justify-content-center'>
              <div className="action-icon"><IconAccount /></div>
              <div className="action-name">Đăng xuất</div>
            </div>
          </div>
        </SlidingPane>
      }
    </div>
  );
};

export default DropdownAvatar;
