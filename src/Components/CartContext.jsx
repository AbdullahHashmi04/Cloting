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

  const AllData = [
  { id: 1,  image: "https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg", name: "Men Black T-Shirt", title: "Classic Black Tee", category: "men", price: 1499 },
  { id: 2,  image: "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg", name: "Men Denim Jeans", title: "Slim Fit Jeans", category: "men", price: 2999 },
  { id: 3,  image: "https://images.pexels.com/photos/842567/pexels-photo-842567.jpeg", name: "Men Hoodie", title: "Grey Hoodie", category: "men", price: 2499 },
  { id: 4,  image: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg", name: "Men Jacket", title: "Leather Jacket", category: "men", price: 7999 },
  { id: 5,  image: "https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg", name: "Men Polo Shirt", title: "Casual Polo", category: "men", price: 2199 },
  { id: 6,  image: "https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg", name: "Men Shorts", title: "Khaki Shorts", category: "men", price: 1899 },
  { id: 7,  image: "https://images.pexels.com/photos/298864/pexels-photo-298864.jpeg", name: "Men Sweater", title: "V-Neck Sweater", category: "men", price: 2699 },
  { id: 8,  image: "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg", name: "Men Formal Shirt", title: "White Formal Shirt", category: "men", price: 3499 },
  { id: 9,  image: "https://images.pexels.com/photos/1043472/pexels-photo-1043472.jpeg", name: "Men Tracksuit", title: "Sports Tracksuit", category: "men", price: 3999 },
  { id: 10, image: "https://images.pexels.com/photos/2983463/pexels-photo-2983463.jpeg", name: "Men Cap", title: "Baseball Cap", category: "men", price: 899 },

  { id: 11, image: "https://images.pexels.com/photos/2983465/pexels-photo-2983465.jpeg", name: "Women Dress", title: "Summer Dress", category: "women", price: 3799 },
  { id: 12, image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg", name: "Women Top", title: "Floral Top", category: "women", price: 2199 },
  { id: 13, image: "https://images.pexels.com/photos/2983467/pexels-photo-2983467.jpeg", name: "Women Jeans", title: "Skinny Jeans", category: "women", price: 2899 },
  { id: 14, image: "https://images.pexels.com/photos/2983468/pexels-photo-2983468.jpeg", name: "Women Jacket", title: "Denim Jacket", category: "women", price: 4999 },
  { id: 15, image: "https://images.pexels.com/photos/2983469/pexels-photo-2983469.jpeg", name: "Women Skirt", title: "A‑Line Skirt", category: "women", price: 1999 },
  { id: 16, image: "https://images.pexels.com/photos/2983470/pexels-photo-2983470.jpeg", name: "Women Blouse", title: "Silk Blouse", category: "women", price: 2499 },
  { id: 17, image: "https://images.pexels.com/photos/2983471/pexels-photo-2983471.jpeg", name: "Women Hoodie", title: "Pink Hoodie", category: "women", price: 2699 },
  { id: 18, image: "https://images.pexels.com/photos/2983472/pexels-photo-2983472.jpeg", name: "Women Leggings", title: "Black Leggings", category: "women", price: 1799 },
  { id: 19, image: "https://images.pexels.com/photos/2983473/pexels-photo-2983473.jpeg", name: "Women Formal Dress", title: "Party Gown", category: "women", price: 5999 },
  { id: 20, image: "https://images.pexels.com/photos/2983474/pexels-photo-2983474.jpeg", name: "Women Shorts", title: "Denim Shorts", category: "women", price: 2099 },

  { id: 21, image: "https://images.pexels.com/photos/2983475/pexels-photo-2983475.jpeg", name: "Kids T‑Shirt", title: "Cartoon T‑Shirt", category: "kids", price: 1299 },
  { id: 22, image: "https://images.pexels.com/photos/2983476/pexels-photo-2983476.jpeg", name: "Kids Jeans", title: "Blue Jeans", category: "kids", price: 2199 },
  { id: 23, image: "https://images.pexels.com/photos/2983477/pexels-photo-2983477.jpeg", name: "Kids Dress", title: "Flower Dress", category: "kids", price: 2699 },
  { id: 24, image: "https://images.pexels.com/photos/2983478/pexels-photo-2983478.jpeg", name: "Kids Jacket", title: "Warm Jacket", category: "kids", price: 3299 },
  { id: 25, image: "https://images.pexels.com/photos/2983479/pexels-photo-2983479.jpeg", name: "Kids Shorts", title: "Casual Shorts", category: "kids", price: 1499 },
  { id: 26, image: "https://images.pexels.com/photos/2983480/pexels-photo-2983480.jpeg", name: "Kids Hoodie", title: "Blue Hoodie", category: "kids", price: 2499 },
  { id: 27, image: "https://images.pexels.com/photos/2983481/pexels-photo-2983481.jpeg", name: "Kids Leggings", title: "Girls Leggings", category: "kids", price: 1799 },
  { id: 28, image: "https://images.pexels.com/photos/2983482/pexels-photo-2983482.jpeg", name: "Kids Cap", title: "Fun Cap", category: "kids", price: 699 },
  { id: 29, image: "https://images.pexels.com/photos/2983483/pexels-photo-2983483.jpeg", name: "Kids Sweater", title: "Stripe Sweater", category: "kids", price: 2299 },
  { id: 30, image: "https://images.pexels.com/photos/2983484/pexels-photo-2983484.jpeg", name: "Kids Shoes", title: "Kids Sneakers", category: "kids", price: 2899 },

  { id: 31, image: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg", name: "Unisex Hoodie", title: "Black Logo Hoodie", category: "men", price: 2599 },
  { id: 32, image: "https://images.pexels.com/photos/842567/pexels-photo-842567.jpeg", name: "Summer Shirt", title: "Light Shirt", category: "women", price: 1999 },
  { id: 33, image: "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg", name: "Tennis Skirt", title: "Sport Skirt", category: "women", price: 2299 },
  { id: 34, image: "https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg", name: "Cargo Pants", title: "Khaki Cargo", category: "men", price: 3199 },
  { id: 35, image: "https://images.pexels.com/photos/2983471/pexels-photo-2983471.jpeg", name: "Racer Back Tank", title: "Sport Tank", category: "women", price: 1499 },
  { id: 36, image: "https://images.pexels.com/photos/2983472/pexels-photo-2983472.jpeg", name: "Polo Dress", title: "Kids Polo Dress", category: "kids", price: 1799 },
  { id: 37, image: "https://images.pexels.com/photos/2983475/pexels-photo-2983475.jpeg", name: "Denim Jacket Jr", title: "Kids Denim", category: "kids", price: 2799 },
  { id: 38, image: "https://images.pexels.com/photos/2983476/pexels-photo-2983476.jpeg", name: "Boho Top", title: "Boho Style Top", category: "women", price: 2399 },
  { id: 39, image: "https://images.pexels.com/photos/2983477/pexels-photo-2983477.jpeg", name: "Graphic Tee", title: "Cool Graphic Tee", category: "men", price: 1599 },
  { id: 40, image: "https://images.pexels.com/photos/2983478/pexels-photo-2983478.jpeg", name: "Kids Winter Coat", title: "Kids Winter Coat", category: "kids", price: 3699 }
]

const ToList = [
  // ===== MEN =====
  {
    id: 1,
    image: "https://d30fs77zq6vq2v.cloudfront.net/images/product/large/22022019/image48-386421778337.png",
    name: "Rogue Crimson Jacket",
    title: "Classic Cotton Tee",
    category: "men",
    price: 1499
  },
  {
    id: 2,
    image: "https://media.istockphoto.com/id/2189959028/photo/male-men-denim-jacket-isolated-on-white-nobody-jean-jacket-blue-outwear.jpg?s=612x612&w=0&k=20&c=Bd8b03cba82N9GreXx5w544fzlJI8MonXJ0AHUrRnNQ=",
    name: "Arctic Blue Classic Denim",
    title: "Slim Fit Blue Jeans",
    category: "men",
    price: 2999
  },
  {
    id: 3,
    image: "https://media.istockphoto.com/id/475570206/photo/denim-jacket.jpg?s=612x612&w=0&k=20&c=-RlIxj6nOvJYyIMu_GS8MYUzRLw3IEVwDXen-x5JSKY=",
    title: "Midnight Rider Denim",
    category: "men",
    price: 2499
  },
  {
    id: 4,
    image: "https://media.istockphoto.com/id/163208487/photo/male-coat-isolated-on-the-white.jpg?s=612x612&w=0&k=20&c=3Sdq5xnVS2jOYPNXI6JLwAumzyelcP_VgKVW0MVUhwo=",
    name: "Men Blazer",
    title: "Ember Core Puffer",
    category: "men",
    price: 4999
  },
  {
    id: 5,
    image: "https://media.istockphoto.com/id/824872662/photo/black-t-shirt-on-brick-background.jpg?s=612x612&w=0&k=20&c=dt10eMrwBih4c3cFhvAstdlBo_ibefXDUeZGGurrlpQ=",
    name: "Noir Essential Tee",
    title: "Checked Cotton Shirt",
    category: "men",
    price: 1999
  },

  // ===== WOMEN =====
  {
    id: 6,
    image: "https://media.istockphoto.com/id/1285756408/photo/pink-yellow-blue-flying-womens-winter-hoodie.jpg?s=612x612&w=0&k=20&c=GoCd4au3Fof6NRrldzrMd1EW2KqhYeAHn04CY2TJsyU=",
    name: "Aurora Fade Sweatshirt",
    title: "Floral Casual Dress",
    category: "women",
    price: 3499
  },
  {
    id: 7,
    image: "https://media.istockphoto.com/id/2220701778/photo/brown-cotton-t-shirt-neutral-background.jpg?s=612x612&w=0&k=20&c=Yo8FxDpb5bGwytw_xup1vSPV3DKKsE9aFY3A2qQgbQk=",
    name: "Cocoa Street Tee",
    title: "Soft Cotton Top",
    category: "women",
    price: 1799
  },
  {
    id: 8,
    image: "https://media.istockphoto.com/id/1281304280/photo/folded-blue-jeans-on-a-white-background-modern-casual-clothing-flat-lay-copy-space.jpg?s=612x612&w=0&k=20&c=nSMI2abaVovzkH1n0eXeJYCkrtI-6QcD_V7OVUz4zS4=",
    name: "Atlas Classic Denim",
    title: "Blue Denim Jacket",
    category: "women",
    price: 3999
  },
  {
    id: 9,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFh4azqNtN73tz5ZiXGb2BUbR3uqbb23icvg&s",
    name: "Women Kurti",
    title: "Printed Traditional Kurti",
    category: "women",
    price: 2299
  },
  {
    id: 10,
    image: "https://media.istockphoto.com/id/639511940/photo/beautiful-denim-pants.jpg?s=612x612&w=0&k=20&c=aMeomXPDGFvk9sgbliTNamQhvrnEznVtjp4FfTgY_SY=",
    name: "Women Winter Coat",
    title: "Long Wool Coat",
    category: "women",
    price: 5499
  },
  {
    id: 11,
    image: "https://media.istockphoto.com/id/1132036871/photo/tough-guys-wear-pink.jpg?s=612x612&w=0&k=20&c=g5GvrlDNM13jtklsmhhCAJG25jGe_GcmksXVyq0L23E=",
    name: "Women Winter Coat",
    title: "Long Wool Coat",
    category: "women",
    price: 5499
  },
  {
    id: 12,
    image: "https://media.istockphoto.com/id/522628236/photo/little-girl-sneakers-shoes.jpg?s=612x612&w=0&k=20&c=JT7FEcRZNzOaAwDoFldcp5iymPU8hJ8Yt-WFvKZpcvw=",
    name: "Women Winter Coat",
    title: "Long Wool Coat",
    category: "women",
    price: 5499
  }
];


  const addToCart = (product) => {
    setCart([...cart, product]);
  };
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };
  // const FirstApi = "https://api.escuelajs.co/api/v1/products"
  const SecondApi = "https://dummyjson.com/products"

  useEffect(()=>{
      const fetchProducts = () => {
    // const res = await axios.get(FirstApi);
    setData(ToList);
    console.log("",ToList)
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
