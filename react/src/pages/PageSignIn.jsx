import { useEffect } from "react";
import SignIn from "../components/SignIn/SignIn";

const PageSignIn = () => {
    useEffect(() => {
        document.title = 'Đăng nhập';
      }, []);
    return <div className="d-flex justify-content-center mt-5 mb-5">
    <SignIn></SignIn>
    </div>
}
export default PageSignIn;