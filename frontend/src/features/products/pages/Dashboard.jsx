import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package,
  Plus,
  LogOut,
  LayoutDashboard,
  Settings,
  ChevronRight,
  Search,
  Box,
  TrendingUp,
  Clock,
  Menu,
  X
} from "lucide-react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { useProduct } from "../hook/useProduct";
import { useAuth } from "../../auth/hook/useAuth";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sellerProducts = useSelector((state) => state.product.sellerProducts);
  const user = useSelector((state) => state.auth.user);
  const { handleGetSellerProducts } = useProduct();
  const { handleLogoutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    handleGetSellerProducts();
  }, []);

  const onLogout = async () => {
    await handleLogoutUser();
    navigate("/login");
  };

  const menuItems = [
    { title: "Catalogue", icon: Box, active: true, path: "/seller/dashboard" },
    { title: "Registry", icon: Plus, active: false, path: "/seller/create-product" },
    { title: "Metrics", icon: TrendingUp, active: false, path: "#" },
    { title: "Settings", icon: Settings, active: false, path: "#" },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex font-sans overflow-hidden">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-72 border-r border-white/10 flex-col bg-black">
        <div className="p-10">
          <Link to="/">
            <h1 className="text-4xl font-black tracking-tighter bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
              SNITCH
            </h1>
          </Link>
          <p className="text-[10px] uppercase tracking-[0.4em] text-gray-500 mt-2 font-bold">Seller Authority</p>
        </div>

        <nav className="flex-1 px-6 space-y-2 mt-4">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              to={item.path}
              className={`flex items-center justify-between w-full group py-4 px-4 transition-all ${item.active ? "bg-white/5 border border-white/10" : "hover:bg-white/[0.03]"
                }`}
            >
              <div className="flex items-center gap-4">
                <item.icon className={`w-4 h-4 ${item.active ? "text-white" : "text-gray-500 group-hover:text-white transition-colors"}`} />
                <span className={`text-[10px] uppercase tracking-[0.2em] font-bold ${item.active ? "text-white" : "text-gray-500 group-hover:text-white transition-colors"}`}>
                  {item.title}
                </span>
              </div>
              {item.active && <div className="w-1 h-1 bg-white rounded-full" />}
            </Link>
          ))}
        </nav>

        <div className="p-8 border-t border-white/10">
          <button
            onClick={onLogout}
            className="flex items-center gap-4 text-gray-500 hover:text-white transition-colors w-full py-4 group uppercase tracking-widest text-[10px] font-black"
          >
            <LogOut className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden overflow-y-auto custom-scrollbar">
        {/* Top Header */}
        <header className="p-6 lg:p-10 flex items-center justify-between border-b border-white/10 sticky top-0 bg-black z-20">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden text-white"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden md:block">
              <h2 className="text-[10px] uppercase tracking-[0.4em] text-gray-500 font-bold mb-1">Authenticated Access</h2>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-bold tracking-widest">{user?.fullname || "Seller Master"}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="relative group hidden sm:block">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-white transition-colors" />
              <input
                placeholder="Search Inventory"
                className="bg-transparent border-none outline-none pl-8 py-2 text-[10px] uppercase tracking-widest text-white placeholder:text-gray-700 w-48 transition-all focus:w-64"
              />
            </div>
            <Link
              to="/seller/create-product"
              className="bg-white text-black px-6 py-3 text-[10px] uppercase tracking-widest font-black hover:bg-neutral-200 transition-colors flex items-center gap-2"
            >
              <Plus className="w-3 h-3" />
              New Entry
            </Link>
          </div>
        </header>

        {/* Content Section */}
        <div className="p-6 lg:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="text-6xl font-black tracking-tighter bg-gradient-to-b from-white to-gray-600 bg-clip-text text-transparent">
              INVENTORY
            </h1>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mt-4 max-w-lg font-medium leading-loose">
              Managed catalogue for the monolithic collection. All visual assets and economics are synced to the primary registry.
            </p>
          </motion.div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              { label: "Total Artifacts", value: sellerProducts?.length || 0, icon: Package },
              { label: "Market Reach", value: "2.4K+", icon: TrendingUp },
              { label: "Registration Sync", value: "Active", icon: Clock },
            ].map((stat, i) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + (i * 0.1) }}
                key={stat.label}
                className="p-8 border border-white/5 bg-white/[0.02] relative group overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <stat.icon className="w-16 h-16" />
                </div>
                <p className="text-gray-500 uppercase tracking-widest text-[9px] font-bold mb-4">{stat.label}</p>
                <p className="text-4xl font-light tracking-tight">{stat.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
            <AnimatePresence>
              {sellerProducts && sellerProducts.length > 0 ? (
                sellerProducts.map((product, i) => (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + (i * 0.05) }}
                    key={product._id}
                    className="group"
                  >
                    <div className="aspect-[4/5] bg-neutral-900 overflow-hidden relative border border-white/5">
                      <img
                        src={product.images[0]?.url}
                        alt={product.title}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:opacity-50 hover:grayscale-0"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                        <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2 truncate">{product.description}</p>
                        <Link
                          to={`/seller/product/${product._id}`}
                          className="text-xs font-black uppercase tracking-widest border-b border-white inline-block w-fit pb-1"
                        >
                          Modify Entry
                        </Link>
                      </div>
                    </div>
                    <div className="mt-6 flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-black uppercase tracking-widest mb-2">{product.title}</h3>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">SNITCH-ID: {product._id.slice(-8)}</p>
                      </div>
                      <p className="text-lg font-light tracking-tight">
                        {product.price.currency} {product.price.amount.toLocaleString()}
                      </p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-32 border border-dashed border-white/10 flex flex-col items-center justify-center space-y-6">
                  <Box className="w-12 h-12 text-gray-700 font-thin" />
                  <div className="text-center">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-gray-500 font-bold mb-4">No Inventory Registered</p>
                    <Link
                      to="/seller/create-product"
                      className="text-xs font-black uppercase tracking-[0.2em] border-b border-white pb-2 hover:text-gray-400 transition-colors"
                    >
                      Initialize Collection
                    </Link>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-80 bg-black border-r border-white/10 z-[101] flex flex-col p-10 lg:hidden"
            >
              <div className="flex justify-between items-start mb-20">
                <div>
                  <h1 className="text-4xl font-black tracking-tighter">SNITCH</h1>
                  <p className="text-[8px] uppercase tracking-[0.4em] text-gray-500 mt-2 font-bold font-mono text-[9px]">Authority Portal</p>
                </div>
                <button onClick={() => setIsSidebarOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4 flex-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.title}
                    to={item.path}
                    onClick={() => setIsSidebarOpen(false)}
                    className="flex items-center gap-6 py-4 border-b border-white/5 group"
                  >
                    <item.icon className="w-5 h-5 text-gray-500" />
                    <span className="text-xs uppercase tracking-[0.3em] font-black group-hover:text-white transition-colors">{item.title}</span>
                  </Link>
                ))}
              </div>

              <button
                onClick={onLogout}
                className="flex items-center gap-6 py-6 border-t border-white/10 w-full group"
              >
                <LogOut className="w-5 h-5 text-red-500" />
                <span className="text-xs uppercase tracking-[0.3em] font-black text-red-500">Sign Out</span>
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
