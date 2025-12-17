import axios from "axios";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { UserPlus, Mail, Lock, User } from "lucide-react";

function SignUp() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    watch
  } = useForm();
  const Navigate = useNavigate();
  const {SetRegisterStatus } = useContext(CartContext);
  
  const password = watch("Password");

  const onSubmit = async (data) => {
    let r = await axios.post("http://localhost:3000/signup",{
      item : data
    })
    if(r.status===200){
      SetRegisterStatus(true);
      Navigate("/")
    }
    console.log(data, r);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-white px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-10 border border-white/20">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-2xl">
              <UserPlus className="h-8 w-8 text-white" />
            </div>
          </div>

          <h2 className="text-4xl font-bold text-gray-900 text-center mb-2">
            Create an Account
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Join us and start shopping
          </p>

          <form action="" onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                <User className="w-4 h-4" />
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                {...register("Username", {
                  required: {
                    value: true,
                    message: "This field is required",
                  },
                })}
              />
              {errors.Username && (
                <div className="text-red-500 mt-1 text-sm">{errors.Username.message}</div>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="example@email.com"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                {...register("Email", {
                  required: { value: true, message: "This field is required" },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
              />
              {errors.Email && (
                <div className="text-red-500 mt-1 text-sm">{errors.Email.message}</div>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="********"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                {...register(
                  "Password",
                  {
                    required: { value: true, message: "This field is required" },
                    minLength: {
                      value: 7,
                      message: "Min length of password is 7",
                    },
                  }
                )}
              />
              {errors.Password && (
                <div className="text-red-500 mt-1 text-sm">{errors.Password.message}</div>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="********"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                {...register(
                  "ConfirmPassword",
                  {
                    required: { value: true, message: "This field is required" },
                    validate: value => value === password || "Passwords do not match"
                  }
                )}
              />
              {errors.ConfirmPassword && (
                <div className="text-red-500 mt-1 text-sm">{errors.ConfirmPassword.message}</div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating Account..." : "Sign Up"}
            </button>
            {errors.myform && (
              <div className="text-red-500 text-sm text-center">{errors.myform.message}</div>
            )}
            {errors.blocked && (
              <div className="text-red-500 text-sm text-center">{errors.blocked.message}</div>
            )}
          </form>

          <p className="text-center text-gray-600 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-600 font-semibold hover:text-purple-700 transition">
              Login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default SignUp;
