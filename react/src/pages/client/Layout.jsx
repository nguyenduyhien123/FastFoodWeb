import Footer from "../../components/footer/Footer"
import Header from "../../components/headerFrontend/Header"
import { Outlet, Link } from "react-router-dom";
import { Navigation } from "../../components/navigation/Navigation";

const Layout = () => {
    return <>
    <div className="mt-4"></div>
    <Header></Header>
    <div className="mb-4"></div>
    <Outlet></Outlet>
    <div className="mt-5">
    <Footer></Footer>
    </div>
    </>
}
export default Layout;