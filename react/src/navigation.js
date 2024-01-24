import ShoppingCart from "./components/shoppingcart/ShoppingCart";
import Home from "./pages/client/Home";

export const navigationClient = [
    {
        path : '/',
        element : <Home />,
        name : 'Home',
        role : []
    },
    {
        path : '/shopping-cart',
        element : <ShoppingCart />,
        name : 'Shopping Cart',
        role : []
    }
    ,
    {
        path : 'about',
        element : <About />,
        name : 'About',
        role : []
    },
    {
        path : 'about',
        element : <About />,
        name : 'About',
        role : []
    }
]