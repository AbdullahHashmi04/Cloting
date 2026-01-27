import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext.jsx";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Search, Package } from "lucide-react";
import "../Style/Catalog.css";

const CATEGORIES = ["All", "men", "women", "kids"];

export default function ClothingCatalog() {
  const { addToCart, mycategory, setCategory, catalogData } = useContext(CartContext);
  const [showToast, setShowToast] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(mycategory || "All");
  const [likedItems, setLikedItems] = useState(new Set());

  const handleAddToCart = (product) => {
    addToCart({
      ...product,
      name: product.title || product.name,
      img: product.images?.[0] || product.thumbnail || `https://images.unsplash.com/photo-${1500000000000 + product.id}?w=400&h=500&fit=crop`,
      price: product.price || Math.floor(Math.random() * 200) + 20
    });
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  const naviagtor = useNavigate();



  const filteredProducts = catalogData.filter((p) => {
    const matchesQuery = (p.title || p.name || "").toLowerCase().includes(query.toLowerCase());
    const matchesCategory = selectedCategory === "All" || p.category?.toLowerCase() === selectedCategory.toLowerCase();
    return matchesQuery && matchesCategory;
  });


  return (
    <div className="catalog-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="catalog-header">
          <h1 className="catalog-title">
            Our Catalog
          </h1>
          <p className="catalog-subtitle">Discover your perfect style</p>
        </div>

        <div className="catalog-filters">
          <div className="catalog-search-wrapper">
            <Search className="catalog-search-icon" />
            <input
              type="text"
              placeholder="Search products..."
              className="catalog-search-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="catalog-categories">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                
                  setCategory(cat === "All" ? "" : cat);
                }}
                className={`catalog-category-button ${
                  selectedCategory === cat
                    ? "catalog-category-button-active"
                    : "catalog-category-button-inactive"
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  {console.log(selectedCategory)}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {filteredProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="catalog-empty-state"
            >
              <Package className="catalog-empty-icon" />
              <p className="catalog-empty-text">No products found.</p>
              <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filters</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="catalog-products-grid"
            >
              {filteredProducts.map((item, index) => {
                const price = item.price || Math.floor(Math.random() * 200) + 20;
                const discount = item.discountPercentage ? Math.round(item.discountPercentage) : null;
                
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="catalog-product-card"
                  >
                    <div className="catalog-product-image-wrapper">
                      <img
                        src={item.image}
                        alt={item.title || item.name}
                        className="catalog-product-image"
                      />
                      <div className="catalog-product-overlay"></div>
                      <button
                        // onClick={() => toggleLike(item.id)}
                         onClick = {()=>{naviagtor('/vto')}}
                        className={`catalog-product-wishlist animate-pulse ${
                          likedItems.has(item.id) ? "catalog-product-wishlist-active" : ""
                    
                        }`}
                        // aria-label={likedItems.has(item.id) ? "Remove from wishlist" : "Add to wishlist"}
                      >
                        {/* <Heart className={`w-5 h-5 ${likedItems.has(item.id) ? "fill-current" : ""}`} /> */}
                        <h2>VTO</h2> 
                      </button>
                    </div>

                    <div className="catalog-product-content">
                      <h2 className="catalog-product-title">
                        {item.title || item.name}
                      </h2>
                      <p className="catalog-product-category">{item.category}</p>

                      <div className="catalog-product-footer">
                        <div className="catalog-product-price-container">
                          <span className="catalog-product-price">
                            ${price}
                          </span>
                          {discount && (
                            <span className="catalog-product-discount">
                              -{discount}%
                            </span>
                          )}
                        </div>
                        <button
                          className="catalog-product-add-button"
                          onClick={() => handleAddToCart(item)}
                          aria-label="Add to cart"
                        >
                          <ShoppingBag className="catalog-product-add-icon" />
                          <span className="hidden sm:inline">Add</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showToast && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="catalog-toast"
            >
              <ShoppingBag className="catalog-toast-icon" />
              <span className="catalog-toast-text">Added to cart!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      </div>
    </div>
  );
}
