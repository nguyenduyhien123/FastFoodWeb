// Client
import { About } from "../components/about/About";
import DropdownAvatar from "../components/dropdown_avatar/DropdownAvatar";
import ProductPage from "../components/product_page/product_page";
import ShoppingCart from "../components/shoppingcart/ShoppingCart";
import { UserInfo } from "../components/user_info/UserInfo";
import Home from "../pages/client/Home";
import { PageRegister } from "../pages/client/PageRegister";
import PageSignIn from "../pages/client/PageSignIn";
import Comment from "../components/comment/Comment";
import { Payment } from "../components/payment/Payment";
import ProductEdit from "../pages/master/ProductEdit";
import UserEdit from "../pages/master/UserEdit";
import UserCreate from "../pages/master/UserCreate";
import CommentList from "../pages/master/CommentList";
import { WishList } from "../components/wishlist/WishList";
import { ProductSearch } from "../components/product_search/ProductSearch";
import { ProductSearchOption } from "../components/product_search/ProductSearchOption";
import { ResetPasswordVerifyEmail } from "../components/user_info/ResetPasswordVerifyEmail";
import { ResetPasswordSetPassword } from "../components/user_info/ResetPasswordSetPassword";
import { ChangePassword } from "../components/user_info/ChangePassword";
import { AccountEdit } from "../components/user_info/AccountEdit";
import { ManageOrder } from "../components/user_info/ManageOrder";
import { OrderDetailUser } from "../components/user_info/OrderDetailUser";
import Menu from "../components/menu/menu";

export const ListRouteClient = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/shopping-cart",
    element: <ShoppingCart />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/accounts/payments",
    element: <Payment />,
  },
  {
    path: "/accounts/wishlist",
    element: <WishList />,
  },
  {
    path: "/accounts/register",
    element: <PageRegister />,
  },
  {
    path: "/accounts/signin",
    element: <PageSignIn />,
  },
  {
    path: "/accounts/change-password",
    element: <UserInfo />,
  },
  {
    path: "/accounts/manage-order",
    element: <UserInfo />,
  },
  {
    path: "/accounts/edit",
    element: <UserInfo />,
  },
  {
    path: "/accounts/reset-password/verify-email",
    element: <ResetPasswordVerifyEmail />,
  },
  {
    path: "/accounts/reset-password/set-password",
    element: <ResetPasswordSetPassword />,
  },
  {
    path: "/accounts/manage-order/:code",
    element: <OrderDetailUser />,
  },
  {
    path: "/products/:id",
    element: <ProductPage />,
  },
  {
    path: "/avatar",
    element: <DropdownAvatar />,
  },
  {
    path: "/comments",
    element: <Comment />,
  },
  {
    path: "/menu",
    element: <Menu />,
  },
];
