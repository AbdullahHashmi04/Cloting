/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-const-assign */
import { createContext, use, useEffect, useState } from "react";
import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [mydata,setData] = useState([]);
  const [catalogData,setCatalog] = useState([]);
  const [loginStatus,setLoginStatus]= useState(false);
  const [RegisterStatus,SetRegisterStatus]= useState(false);

  const [mycategory, setCategory] = useState();

  const addToCart = (product) => {
    setCart([...cart, product]);
  };
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };
  const FirstApi = "https://api.escuelajs.co/api/v1/products"
  const SecondApi = "https://dummyjson.com/products"

  useEffect(()=>{
      const fetchProducts = async () => {
    const res = await axios.get(FirstApi);
    setData(res.data);
    console.log(res.data)
  };

  fetchProducts();
  },[])
  useEffect(()=>{
      const fetchProducts = async () => {
    const res = await axios.get(SecondApi);
    setCatalog(res.data.products);
    console.log("Second Api is ",res.data.products)
  };

  fetchProducts();
  },[])

  useEffect(() => {
    console.log("Current category:", mycategory);
  },[mycategory])


  return (
    <CartContext.Provider
      value={{ cart, addToCart,mycategory, setCategory,removeFromCart, clearCart,catalogData ,mydata,loginStatus,setLoginStatus,RegisterStatus,SetRegisterStatus}}
    >
      {children}
    </CartContext.Provider>
  );
};
