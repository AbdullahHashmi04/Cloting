import { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Menu, User, X, LogOut, CircleUser, ArrowBigRight  } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CartContext } from "./CartContext";
import "../Style/Navbar.css";
import SignUp from "./SignUp";
import todo from "./todo";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart, loginStatus, setLoginStatus, RegisterStatus } =
    useContext(CartContext);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/catalog", label: "Catalog" },
    { path: "/about", label: "About" },
    { path: "/todo", label: "todo" },
  ];

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

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
           {cart.length > 0 && (<Link to="/mycart" className="navbar-cart-button">
              <ShoppingBag className="navbar-cart-icon" />
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="navbar-cart-badge"
                >
                  {cart.length}
                </motion.span>
            </Link>)}

            {loginStatus ? 
            ( <div className="relative group">
      {/* Profile Icon */}
      <CircleUser
        size={30}
        className="cursor-pointer text-gray-700 hover:text-gray-900 transition-colors duration-200"
      />

      {/* Dropdown Button */}
      <div className="absolute right-0 mt-2 w-36 bg-white shadow-lg rounded-lg opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none group-hover:pointer-events-auto">
        <button className="flex items-center justify-between w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
          Logout <ArrowBigRight size={20} />
        </button>
      </div>
    </div>
              )
            : (
                <Link to="/login" className="navbar-login-button">
                  Login
                </Link>)}

                {RegisterStatus || loginStatus ? null : (
                  <Link to="/signup" className="navbar-signup-button">
                    Sign Up
                  </Link>
                )}
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
      </motion.nav>)}

      {/* Mobile Menu */}
      {/* <AnimatePresence>
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
      </AnimatePresence> */}