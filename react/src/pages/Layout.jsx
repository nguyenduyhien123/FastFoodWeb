import Footer from "../components/footer/Footer"
import Header from "../components/header/Header"
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
    return <>
    <div className="mt-4"></div>
    <Header></Header>
    <Outlet></Outlet>
    <Footer></Footer>
    </>
}
export default Layout;