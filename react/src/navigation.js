import ShoppingCart from "./components/shoppingcart/ShoppingCart";
import Home from "./pages/client/Home";

export const navigationClient = [
    {
        path : '/',
        element : <Home />,
        name : 'Home',
        isPrivate : false
    },
    {
        path : '/shopping-cart',
        element : <ShoppingCart />,
        name : 'Shopping Cart',
        isPrivate : false
    }
    ,
    {
        path : 'about',
        element : <About />,
        name : 'About',
        isPrivate : false
    },
    {
        path : 'about',
        element : <About />,
        name : 'About',
        isPrivate : false
    }
]