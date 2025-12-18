/* eslint-disable no-undef */
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link,useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import { motion } from "framer-motion";
import { LogIn, Mail, Lock, Sparkles } from "lucide-react";

export default function LoginPage() {
  const [responseData, setResponseData] = useState("");

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();

  const {setLoginStatus} = useContext(CartContext);
  
  const onSubmit = async (data) => {
  console.log("Controll is coming")
  let r = await axios.post("http://localhost:3000/login" , data,{
  validateStatus: () => true,})
  if(r.status===200){
    setLoginStatus(true);
    setResponseData(r.data)
    navigate("/");
  }else if(r.status===201){
    setLoginStatus(true);
    navigate("/admin");
  }else if(r.status === 401){
    setResponseData(r.data)
  }
}
  return (
 <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-10 border border-white/20">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-2xl">
              <LogIn className="h-8 w-8 text-white" />
            </div>
          </div>

          <h2 className="text-4xl font-bold text-center text-gray-900 mb-2">
            Welcome Back
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Sign in to continue shopping
          </p>
          <form action="" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </label>
              <div className="relative">
                <input
                  type="Email"
                  placeholder="Enter your username"
                  className="w-full pl-4 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                  {...register("Email", {
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                  })}
                  />
                  {errors.Email && (
                   <div className="text-red-500 text-sm">{errors.Email.message}</div>)}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full pl-4 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                  {...register(
                    "Password",
                    {
                      required: {
                        value: true,
                        message: "This field is required",
                      },
                    }
                  )}
                />
                {errors.Password && (<div className="text-red-500 text-sm">{errors.Password.message}</div>)}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600
               text-white py-3 rounded-xl font-semibold hover:from-purple-700
                hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>
          </form>
          {responseData && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`flex justify-center ${
                responseData.includes("Successful") 
                ? "bg-green-100 text-green-700" 
                :  "text-red-700"
              }`}
              >
              {responseData}
            </motion.div>
          )}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-purple-600 font-semibold hover:text-purple-700 transition">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
