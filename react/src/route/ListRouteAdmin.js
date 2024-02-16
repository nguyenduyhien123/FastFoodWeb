// Admin 
import { Overview, Documentation, ChangeLog, Error } from "../pages/supports";
import { Avatars, Alerts, Buttons, Charts, Tables, Fields, Headings, Colors } from "../pages/blocks";
import {
  Ecommerce, Analytics, CRM, ForgotPassword, Register, Login, UserList, UserProfile, MyAccount,
  ProductList, ProductView, ProductUpload, InvoiceList, InvoiceDetails, OrderList, Message,
  Notification, BlankPage, Settings
} from "../pages/master";
import UserCreate from "../pages/master/UserCreate";
import UserEdit from "../pages/master/UserEdit";
import ProductEdit from "../pages/master/ProductEdit";
import CommentList from "../pages/master/CommentList";
export const ListRouteAdmin = [
  {
    path: '/admin/ecommerce',
    element: <Ecommerce />,

  },
  {
    path: '/admin/analytics',
    element: <Analytics />,

  },
  {
    path: '/admin/crm',
    element: <CRM />,

  },
  {
    path: '/admin/login',
    element: <Login />,

  },
  {
    path: '/admin/register',
    element: <Register />,

  },
  {
    path: '/admin/forgot-password',
    element: <ForgotPassword />,

  },
  {
    path: '/admin/user-list',
    element: <UserList />,

  },
  {
    path: '/admin/user-profile/:id',
    element: <UserProfile />,

  },
  {
    path: '/admin/user-create',
    element: <UserCreate />,

  },
  {
    path: '/admin/user-edit/:id',
    element: <UserEdit />,

  },
  {
    path: '/admin/my-account',
    element: <MyAccount />,

  },
  {
    path: '/admin/product-list',
    element: <ProductList />,

  },
  {
    path: '/admin/product-view/:id',
    element: <ProductView />,

  },
  {
    path: '/admin/product-edit/:id',
    element: <ProductEdit />,

  },
  {
    path: '/admin/product-upload',
    element: <ProductUpload />,

  },
  {
    path: '/admin/invoice-list',
    element: <InvoiceList />,

  },
  {
    path: '/admin/comment-list',
    element: <CommentList />,

  },
  {
    path: '/admin/invoice-details/:id',
    element: <InvoiceDetails />,

  },
  {
    path: '/admin/order-list',
    element: <OrderList />,

  },
  {
    path: '/admin/message',
    element: <Message />,

  },
  {
    path: '/admin/notification',
    element: <Notification />,

  },
  {
    path: '/admin/settings',
    element: <Settings />,
  },
  {
    path: '/admin/blank-page',
    element: <BlankPage />,
  },
  {
    path: '/admin/headings',
    element: <Headings />,
  },
  {
    path: '/admin/buttons',
    element: <Buttons />,
  },
  {
    path: '/admin/avatars',
    element: <Avatars />,
  },
  {
    path: '/admin/colors',
    element: <Colors />,
  },
  {
    path: '/admin/charts',
    element: <Charts />,
  },
  {
    path: '/admin/tables',
    element: <Tables />,
  },
  {
    path: '/admin/fields',
    element: <Fields />,
  },
  {
    path: '/admin/alerts',
    element: <Alerts />,
  },
  {
    path: '*',
    element: <Error />,
  },
  {
    path: '/admin/',
    element: <Overview />,
  },
  {
    path: '/admin/documentation',
    element: <Documentation />,
  },
  {
    path: '/admin/changelog',
    element: <ChangeLog />,
  }
]