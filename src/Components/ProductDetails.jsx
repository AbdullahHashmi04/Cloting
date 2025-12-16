import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowLeft, Heart, Star } from "lucide-react";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";

function ProductDetails() {
  const { state: product } = useLocation();
  const { addToCart } = useContext(CartContext);
  const [liked, setLiked] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Product not found</p>
      </div>
    );
  }

  const images = product.images || [product.image || `https://images.unsplash.com/photo-${1500000000000 + product.id}?w=600&h=800&fit=crop`];
  
  const handleAddToCart = () => {
    addToCart({
      ...product,
      name: product.title || product.name,
      img: images[selectedImage],
      price: product.price || Math.floor(Math.random() * 200) + 20
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/catalog">
          <button className="mb-6 flex items-center gap-2 text-gray-600 hover:text-purple-600 transition">
            <ArrowLeft className="w-5 h-5" />
            Back to Catalog
          </button>
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="relative rounded-2xl overflow-hidden bg-white shadow-xl">
              <img
                src={images[selectedImage]}
                alt={product.title || product.name}
                className="w-full h-[600px] object-cover"
              />
              <button
                onClick={() => setLiked(!liked)}
                className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all ${
                  liked ? "bg-red-500 text-white" : "bg-white/80 text-gray-700"
                }`}
              >
                <Heart className={`w-6 h-6 ${liked ? "fill-current" : ""}`} />
              </button>
            </div>
            
            {images.length > 1 && (
              <div className="flex gap-4">
                {images.slice(0, 4).map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-1 h-24 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === index ? "border-purple-600" : "border-gray-200"
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${index}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {product.title || product.name}
              </h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-gray-600">(4.8) • 234 reviews</span>
              </div>
              <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
                ${product.price || Math.floor(Math.random() * 200) + 20}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description || "Premium quality product designed for comfort and style. Made with the finest materials and attention to detail."}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Category</h3>
                <span className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-lg capitalize">
                  {product.category}
                </span>
              </div>

              {product.brand && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Brand</h3>
                  <p className="text-gray-600">{product.brand}</p>
                </div>
              )}
            </div>

            <div className="flex gap-4 pt-6">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                Add to Cart
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
