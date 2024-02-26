import { Link } from 'react-router-dom'
import { ReactComponent as IconAvatar } from '../../assets/icon/avatar.svg'
import { ReactComponent as IconAccount } from '../../assets/icon/account.svg'
import './Dropdown.scss'
import { useContext, useEffect, useRef, useState } from 'react';
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { AuthContext } from '../../context/AuthContext';
import { Icon } from '../elements';
const DropdownAvatar = () => {
<<<<<<< HEAD
  const {userInfo, isLogin, updateUserInfo,updateLogi,logoutUser, roleName}  = useContext(AuthContext)
    let actionAccount = [
      {
        text : 'Thông tin tài khoản',
        link : '/accounts/edit'
      },
      {
        text : 'Lịch sử mua hàng',
        link : '/orders/history'
      },
      {
        text : 'Đơn hàng đã đặt',
        link : '/orders/confirmed'
      },
      {
        text : 'Đơn hàng đã giao',
        link : '/orders/shipped'
      },
      {
        text : 'Đổi mật khẩu',
        link : '/accounts/change-password'
      }
    ]
    let dropdownContentGuest = ['Đăng nhập','Đăng ký'];
    const dropdownContentRef = useRef();
    const buttonRef = useRef();
    const [dropdownContentActive,setDropdownContentActive] = useState(false);
    const [slidingPaneState, setSlidingPaneState] = useState({
      isPaneOpen: false,
      isPaneOpenLeft: false,
    });
    const handleButtonClick = () => {
        setSlidingPaneState({ isPaneOpen: true })
      };
    // const handleOutsideClick = (event) => {
    //     if(!event.target.matches('.drop-btn'))
    //     {
    //       setSlidingPaneState({ isPaneOpen: false })
    //     }
    // };
    // useEffect(() => {
    //     // Gắn kết sự kiện onClick khi component được mount
    //     window.addEventListener('click', handleOutsideClick);
    
    //     // Gỡ bỏ sự kiện khi component bị hủy
    //     return () => {
    //       window.removeEventListener('click', handleOutsideClick);
    //     };
    //   }, []);
      console.log(userInfo);
    return <div className="dropdown-avatar" >
         
         {
          !isLogin && <Link to="/accounts/signin"><img className='drop-btn' onClick={handleButtonClick}  src='/icon/avatar.svg'/></Link> 
         }
         {isLogin && <img className='drop-btn' onClick={handleButtonClick}  src='/icon/accountLogin.svg'/>}
         {
          isLogin && <SlidingPane
          className=" some-custom-class popup-account"
          overlayClassName="some-custom-overlay-class"
=======
  const { userInfo, isLogin, updateUserInfo, updateLogi, logoutUser, roleName } = useContext(AuthContext)
  let actionAccount = [
    {
      text: 'Thông tin tài khoản',
      link: '/accounts/edit',
      icon: 'settings'
    },
    {
      text: 'Quản lý đơn hàng',
      link: '/accounts/manage-order',
      icon: 'list_alt'
    },
    {
      text: 'Đổi mật khẩu',
      link: '/accounts/change-password',
      icon: 'lock'
    }
  ]
  let dropdownContentGuest = ['Đăng nhập', 'Đăng ký'];
  const dropdownContentRef = useRef();
  const buttonRef = useRef();
  const [dropdownContentActive, setDropdownContentActive] = useState(false);
  const [slidingPaneState, setSlidingPaneState] = useState({
    isPaneOpen: false,
    isPaneOpenLeft: false,
  });
  const handleButtonClick = () => {
    setSlidingPaneState({ isPaneOpen: true })
  };
  // const handleOutsideClick = (event) => {
  //     if(!event.target.matches('.drop-btn'))
  //     {
  //       setSlidingPaneState({ isPaneOpen: false })
  //     }
  // };
  // useEffect(() => {
  //     // Gắn kết sự kiện onClick khi component được mount
  //     window.addEventListener('click', handleOutsideClick);
>>>>>>> master

  //     // Gỡ bỏ sự kiện khi component bị hủy
  //     return () => {
  //       window.removeEventListener('click', handleOutsideClick);
  //     };
  //   }, []);
  // console.log(userInfo);
  return <div className="dropdown-avatar" >
    {
      !isLogin && <Link to="/accounts/signin"><img className='drop-btn' onClick={handleButtonClick} src='/icon/avatar.svg' /></Link>
    }
    {isLogin && <img className='drop-btn' onClick={handleButtonClick} src={userInfo?.avatar?.startsWith('https') ? userInfo?.avatar : `http://localhost:8000/storage/uploads/${userInfo?.avatar}`} />}
    {
      isLogin && <SlidingPane
        className=" some-custom-class popup-account"
        overlayClassName="some-custom-overlay-class"

<<<<<<< HEAD
           >
            <h1 className='account-name'>Chào, {userInfo?.lastname + " " + (userInfo?.firstname ?? '')} !</h1>
            <p><span className='fw-bold'>{userInfo?.roleName}</span> - ({userInfo?.verify_account ? 'Đã xác thực' : 'Chưa xác thực'})</p>
            <div className='border-bottom'></div>
            <div className="list-action d-inline-flex gap-3 flex-wrap justify-content-center row mt-4">
              {actionAccount.map((data,index) => {
                return <Link onClick={() =>         setSlidingPaneState({ isPaneOpen: false })
              } to={data.link} className='action-item col-3 d-flex flex-wrap justify-content-center'>
                  <div className="action-icon"><IconAccount></IconAccount></div>
                  <div className="action-name">{data.text}</div> 
                </Link>
              })}
              <div onClick={logoutUser}  className='action-item col-3 d-flex flex-wrap justify-content-center'>
                  <div className="action-icon"><IconAccount></IconAccount></div>
                  <div className="action-name" >Đăng xuất</div>
                </div>
            </div>
        </SlidingPane> 
         }
=======
        width="500px"
        isOpen={slidingPaneState.isPaneOpen}
        hideHeader={true}
        onRequestClose={() => setSlidingPaneState({ isPaneOpenLeft: false })}
>>>>>>> master

      >
        <h1 className='account-name'>Chào, {userInfo?.lastname + " " + (userInfo?.firstname ?? '')} !</h1>
        <p><span className='fw-bold'>{userInfo?.roleName}</span> - ({userInfo?.verify_account ? 'Đã xác thực' : 'Chưa xác thực'})</p>
        <div className='border-bottom'></div>
        <div className="list-action d-inline-flex gap-3 flex-wrap justify-content-center row mt-4">
          {actionAccount.map((data, index) => {
            return <Link onClick={() => setSlidingPaneState({ isPaneOpen: false })
            } to={data.link} className='action-item col-3 d-flex flex-wrap justify-content-center'>
              <div className="action-icon"><Icon>{data?.icon}</Icon></div>
              <div className="action-name">{data.text}</div>
            </Link>
          })}
          <div onClick={logoutUser} className='action-item col-3 d-flex flex-wrap justify-content-center'>
            <div className="action-icon"><Icon>logout</Icon></div>
            <div className="action-name" >Đăng xuất tài khoản</div>
          </div>
        </div>
      </SlidingPane>
    }

  </div>
}
export default DropdownAvatar