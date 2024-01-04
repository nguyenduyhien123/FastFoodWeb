import { createContext, useState } from "react";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import axios from 'axios'
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";



export const AuthContext = createContext();
export const AuthContextProvider = ({children}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [userInfo, setUserInfo] = useState({});
    // Đăng nhập
    const [isLogin, setIsLogin] = useState(false);
    const updateUserInfo = (infoObj) => setUserInfo(infoObj)
    const updateLogin = (val) => setIsLogin(val);
    const [loginInfo, setLoginInfo] = useState({});
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    // Đăng ký
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);
    const [registerUserError, setRegisterUserError] = useState({});
    const [registerInfo, setRegisterInfo] = useState([]);
    const updateRegisterInfo = (val) =>{
      setRegisterInfo(val);
      console.log(registerInfo);
    } 
    const updateLoginInfo = (info) => setLoginInfo(info)
    const loginUser = (e) => {
        e.preventDefault();
        setIsLoginLoading(true);
        axios({
          method: 'post',
          url: 'http://localhost:8000/api/auth/login',
          data : loginInfo,
          withCredentials: true,          
      })
      .then(res => {
        updateUserInfo(res.data.data);
        updateLogin(true);
        Swal.fire({
          title: 'Đăng nhập thành công',
          icon: 'success',
          text: 'Chào mừng bạn đến với DH FAST FOOD',
        });
        setIsLoginLoading(false);
        navigate("/");

      })
      .catch(res => {
        console.log(res.response.data.error);
        Swal.fire({
          title: 'Đăng nhập thất bại',
          icon: 'error',
          text: res.response.data.error,
        });
        setIsLoginLoading(false);
      })
    }
    const handleLoginWithGoogle = (e) => {
        e.preventDefault();
        setLoginInfo({});
        axios({
            method: 'post',
            url: 'http://localhost:8000/api/auth/loginGoogle',
            withCredentials: true,          
        })
        .then(res => {
            // const width = 500;
            // const height = 600;
            // const left = window.screen.width / 2 - width / 2;
            // const top = window.screen.height / 2 - height / 2;
            // window.open(res.data, '_blank', `width=${width},height=${height},left=${left},top=${top}`);        })
            console.log(res.data);
            window.location.href = res.data;

        })
        .catch(err => console.log('Gọi api google bị lỗi'))
    }
    const handleLogoutUser = () =>{
        axios({
            method: 'post',
            url: 'http://localhost:8000/api/auth/logout',
            withCredentials: true,          
        })
        .then(res => {
            setIsLogin(false);
            setUserInfo(false);
            setLoginInfo({});
        })
        .then(res => navigate("/accounts/signin"))
        .catch(err => console.log('Gọi api đăng xuất bị lỗi'))
    }
    const logoutUser = () => {
        Swal.fire({
            title: "Bạn có muốn đăng xuất ?",
            text: "Bạn sẽ thoát ra khỏi hệ thống !!!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Có",
            cancelButtonText : "Không"
          }).then((result) => {
            if (result.isConfirmed) {
              handleLogoutUser()
            }
          });
    }
    const handleRegisterUser = (e) => {
      e.preventDefault();
      console.table(registerInfo);
      setIsRegisterLoading(true);
      axios({
        method: 'post',
        url: 'http://localhost:8000/api/auth/register',
        data : registerInfo,
        withCredentials: true,          
    })
    .then(res => {
      console.log(res.data);
      Swal.fire({
        title: res.data?.message,
        icon: 'success',
        text: res.data?.description,
      })
      .then(() => {
        setIsRegisterLoading(false)
        navigate('/')
      })

    })
    .catch(err => {
      setRegisterUserError(err.response.data.errors);
      console.log(err.response.data.errors);
        console.log('Gọi API bị lỗi');
        setIsRegisterLoading(false)
    })
    }
    useEffect(() => {
        axios({
            method: 'post',
            url: 'http://localhost:8000/api/auth/login',
            withCredentials: true,          
        })
        .then(res => {
          updateUserInfo(res.data.data);
          updateLogin(true);
        })
        .catch(err => {
            console.log('Gọi API bị lỗi');
            updateLogin(false);
        })
    }, [location.pathname]) 
    useEffect(() => {
        if(location?.search)
        {
          console.log(`http://localhost:8000/api/auth/loginGoogleCallback${location.search}`);
            axios({
                method: 'post',
                url:    `http://localhost:8000/api/auth/loginGoogleCallback${location.search}`,
                withCredentials: true,          
            })
            .then(res => {
              updateUserInfo(res.data.data);
              updateLogin(true);
              navigate('/');
            })
            .catch(err => {
                console.log('Gọi API bị lỗi');
                updateLogin(false);
            })
        }

    }, [location.pathname]) 
    return <AuthContext.Provider value={{userInfo, isLogin, updateUserInfo,updateLogin, loginInfo, setLoginInfo, updateLoginInfo, loginUser, isLoginLoading,logoutUser, handleLoginWithGoogle,isRegisterLoading, handleRegisterUser, registerUserError,registerInfo, updateRegisterInfo}}>
        {children}
    </AuthContext.Provider>
}
