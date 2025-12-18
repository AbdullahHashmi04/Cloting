import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './Style/index.css'
import App from './Components/App.jsx'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignUp from './Components/SignUp.jsx';
import Home from "./Components/Home.jsx"
import Login from "./Components/Login.jsx"
import Catalog from "./Components/Catalog.jsx"
import { CartProvider } from './Components/CartContext.jsx';
import Cart from './Components/Cart.jsx';
import About from './Components/About.jsx';
import OrderForm from './Components/OrderForm.jsx';
import AdminLayout from './Components/admin/AdminLayout.jsx';
import AdminDashboard from './Components/admin/AdminDashboard.jsx';
import AdminProducts from './Components/admin/AdminProducts.jsx';
import AdminOrders from './Components/admin/AdminOrders.jsx';
import AdminCustomers from './Components/admin/AdminCustomers.jsx';
import todo from './Components/todo.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,   
    children: [
      { index: true,element: <Home /> },       
      { path: "signup", element: <SignUp /> },
      { path: "about", element: <About /> },
      {path:"login", element:<Login/>},
      {path:"catalog", element:<Catalog/>},
      {path:"mycart", element:<Cart/>},
      {path:"orderform", element:<OrderForm/>},
      {path:"todo", element:<todo/>},

    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "products", element: <AdminProducts /> },
      { path: "orders", element: <AdminOrders /> },
      { path: "customers", element: <AdminCustomers /> },
    ],
  },
]);
createRoot(document.getElementById('root')).render(

  <StrictMode>
    <CartProvider>
    <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>,
)
