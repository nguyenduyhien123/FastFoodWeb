import { useEffect } from "react";
import Register from "../components/Register/Register"

export const PageRegister = () => {
    useEffect(() => {
        document.title = 'Đăng ký';
      }, []);
    return <div className="d-flex justify-content-center mt-5 mb-5">
    <Register></Register>
    </div>
}