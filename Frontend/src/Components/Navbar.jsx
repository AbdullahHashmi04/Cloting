import { useState, useRef, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import {
  ShoppingBag,
  Menu,
  User,
  X,
  LogOut,
  CircleUser,
  ArrowBigRight,
  LayoutDashboard,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CartContext } from "./CartContext";
import "../Style/Navbar.css";
import SignUp from "./SignUp";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [Username, setUsername] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart, RegisterStatus } = useContext(CartContext);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const ref = useRef();

  const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await axios("http://localhost:3000/getcustomers");
      console.log("Response data in Navbar:", response.data.Username);
      setUsername(response.data.Username);
    };
    fetchUserData();
  });

  useEffect(() => {
    console.log("Username in Navbar:", Username);
  }, [Username]);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/catalog", label: "Catalog" },
    { path: "/about", label: "About" },
    { path: "/", label: "Trending" },
  ];

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };
  useEffect(() => {
    function handleClick(e) {
      if (!ref.current?.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`navbar navbar-enter ${
        isScrolled ? "navbar-scrolled" : "navbar-transparent"
      }`}
    >
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="navbar-logo-icon-wrapper"
            >
              <div className="navbar-logo-glow"></div>
              <ShoppingBag className="navbar-logo-icon" />
            </motion.div>
            <span className="navbar-logo-text">Smartify</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="navbar-desktop-nav">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`navbar-link ${
                  isActive(link.path) ? "navbar-link-active" : ""
                }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <motion.div
                    layoutId="activeTab"
                    className="navbar-link-active-indicator"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="navbar-actions">
            {cart.length > 0 && (
              <Link to="/mycart" className="navbar-cart-button">
                <ShoppingBag className="navbar-cart-icon" />
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="navbar-cart-badge"
                >
                  {cart.length}
                </motion.span>
              </Link>
            )}

            {isAuthenticated ? (
              <div className="relative inline-block">
                {/* Trigger */}
                <button
                  onClick={() => setOpen((v) => !v)}
                  className="px-4 relative py-2 rounded-lg bg-black text-white"
                >
                  <User />
                </button>

                {/* Dropdown menu */}
                <div
                  className={`absolute right-0 mt-2 w-48 rounded-lg bg-white border border-gray-200 shadow-lg
          transition-all duration-150
          ${open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
        `}
                >
                  <ul className="py-1 text-sm">
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      Profile
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      Settings
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600">
                      Logout
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="mt-10 text-center">
                <button
                  onClick={(e) => loginWithRedirect()}
                  className="w-30 h-9 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl
         font-semibold hover:from-purple-700 hover:to-pink-700
         transition-all duration-200 transform hover:scale-105 shadow-lg disabled:opacity-50 
         disabled:cursor-not-allowed "
                >
                  Register here
                </button>
                <button className="w-30 h-9 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl
         font-semibold hover:from-purple-700 hover:to-pink-700
         transition-all duration-200 transform hover:scale-105 shadow-lg disabled:opacity-50 
         disabled:cursor-not-allowed"
                  onClick={() =>
                    logout({
                      logoutParams: { returnTo: window.location.origin },
                    })
                  }
                >
                  Log Out
                </button>
              </div>
            )}

            {/* {RegisterStatus || loginStatus ? null : (
              <Link to="/signup" className="navbar-signup-button">
                Sign Up
              </Link>
            )} */}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="navbar-mobile-toggle"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="navbar-mobile-icon" />
            ) : (
              <Menu className="navbar-mobile-icon" />
            )}
          </button>
        </div>
      </div>
    </motion.nav>
  );
}

{
  /* Mobile Menu */
}
{
  /*<AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="navbar-mobile-menu"
          >
            <div className="navbar-mobile-content">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`navbar-mobile-link ${
                      isActive(link.path) ? 'navbar-mobile-link-active' : ''
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="navbar-mobile-divider">
                {loginStatus ? (
                  <button
                    onClick={handleLogout}
                    className="navbar-mobile-auth-button"
                  >
                    <LogOut className="navbar-logout-icon" />
                    <span>Logout</span>
                  </button>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="navbar-mobile-auth-button"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="navbar-mobile-auth-button navbar-mobile-signup-button">
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence> */
}
