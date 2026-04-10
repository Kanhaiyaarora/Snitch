import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hook/useAuth";
import loginImg from "../../../assets/images/login_aesthetic.png";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { handleLoginUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await handleLoginUser(formData);
    if (success) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex overflow-hidden font-sans">
      {/* Form Section */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12 z-10 bg-black"
      >
        <div className="max-w-md w-full mx-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h1 className="text-6xl font-black tracking-tighter mb-2 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
              SNITCH
            </h1>
            <p className="text-gray-400 mb-10 text-lg font-light tracking-wide">Welcome back to the monolithic edge.</p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="space-y-2"
            >
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-white transition-colors" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="name@snitch.com"
                  className="w-full bg-white/5 border border-white/10 rounded-none py-4 pl-12 pr-4 outline-none focus:border-white/40 focus:bg-white/[0.08] transition-all text-sm tracking-wide text-white placeholder:text-gray-700"
                  onChange={handleChange}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="space-y-2"
            >
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-white transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-none py-4 pl-12 pr-12 outline-none focus:border-white/40 focus:bg-white/[0.08] transition-all text-sm tracking-wide text-white placeholder:text-gray-700"
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </motion.div>

            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              whileHover={{ scale: 1.01, backgroundColor: "#f3f4f6" }}
              whileTap={{ scale: 0.99 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              type="submit"
              className="w-full bg-white text-black font-bold py-5 rounded-none flex items-center justify-center gap-3 hover:bg-gray-200 transition-all mt-10 uppercase tracking-widest text-xs"
            >
              Authenticate
            </motion.button>
          </form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-12 pt-8 border-t border-white/5 flex flex-col items-center"
          >
            <p className="text-gray-500 text-sm">
              Don't have an account?{" "}
              <Link to="/register" className="text-white hover:text-gray-300 underline underline-offset-4 transition-colors font-medium">
                Join the collective
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Image Section */}
      <motion.div 
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="hidden lg:block lg:w-1/2 relative overflow-hidden bg-neutral-900"
      >
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          src={loginImg}
          alt="Login Aesthetic"
          className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out"
        />
        <div className="absolute inset-0 border-l border-white/10" />
        
        <div className="absolute bottom-16 left-16 max-w-md">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <div className="w-12 h-[1px] bg-white/40 mb-6" />
            <p className="text-3xl font-light italic text-gray-200 leading-relaxed tracking-tight">
              "Curated excellence for the modern minimalist."
            </p>
            <p className="mt-4 text-gray-500 uppercase tracking-widest text-[10px] font-bold">Snitch Editorial / 2026</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
