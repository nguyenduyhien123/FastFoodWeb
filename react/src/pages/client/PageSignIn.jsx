import { useEffect } from "react";
<<<<<<< HEAD
import SignIn from "../../components/SignIn/SignIn";
=======
import Login from "../../components/login/Login";
>>>>>>> master

const PageSignIn = () => {
    useEffect(() => {
        document.title = 'Đăng nhập';
      }, []);
    return <div className="d-flex justify-content-center mt-5 mb-5">
      <Login></Login>
    </div>
}
export default PageSignIn;