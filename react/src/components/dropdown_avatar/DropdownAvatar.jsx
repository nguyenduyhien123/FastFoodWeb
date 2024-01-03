import { Link } from 'react-router-dom'
import { ReactComponent as IconAvatar } from '../../assets/icon/avatar.svg'
import { ReactComponent as  IconAccount }  from '../../assets/icon/account.svg'
import './Dropdown.scss'
import { useContext, useEffect, useRef, useState } from 'react';
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { AuthContext } from '../../context/AuthContext';
const DropdownAvatar = () => {
  const {userInfo, isLogin, updateUserInfo,updateLogi,logoutUser}  = useContext(AuthContext)
    let actionAccount = [
      {
        text : 'Thông tin tài khoản',
        link : 'accounts/info'
      },
      {
        text : 'Lịch sử mua hàng',
        link : 'orders/history'
      },
      {
        text : 'Đơn hàng đã đặt',
        link : 'orders/confirmed'
      },
      {
        text : 'Đơn hàng đã giao',
        link : 'orders/shipped'
      },
      {
        text : 'Đổi mật khẩu',
        link : 'accounts/change-password'
      }
    ]
    let dropdownContentGuest = ['Đăng nhập','Đăng ký'];
    const dropdownContentRef = useRef();
    const buttonRef = useRef();
    const [dropdownContentActive,setDropdownContentActive] = useState(false);
    const [state, setState] = useState({
      isPaneOpen: false,
      isPaneOpenLeft: false,
    });
    const handleButtonClick = () => {
        setState({ isPaneOpen: true })
      };
    // const handleOutsideClick = (event) => {
    //     if(!event.target.matches('.drop-btn'))
    //     {
    //       setState({ isPaneOpen: false })
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

          width = "500px"
          isOpen={state.isPaneOpen}
          hideHeader={true}    
          onRequestClose={() => setState({ isPaneOpenLeft: false })}

           >
            <h1 className='account-name'>Chào, {userInfo?.fullname} !</h1>
            <div className='border-bottom'></div>
            <div className="list-action d-inline-flex gap-3 flex-wrap justify-content-center row mt-4">
              {actionAccount.map((data,index) => {
                return <Link to={data.link} className='action-item col-3 d-flex flex-wrap justify-content-center'>
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

    </div>
}
export default DropdownAvatar