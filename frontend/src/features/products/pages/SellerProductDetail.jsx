import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package,
  Plus,
  LogOut,
  LayoutDashboard,
  Settings,
  ChevronRight,
  TrendingUp,
  Clock,
  Menu,
  X,
  Box,
  Trash2,
  Edit3,
  Image as ImageIcon,
  Layers,
  ArrowLeft,
  ChevronUp,
  ChevronDown,
  Save,
  Upload
} from "lucide-react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router";
import { useProduct } from "../hook/useProduct";
import { useAuth } from "../../auth/hook/useAuth";

const SellerProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { handleGetProductById, handleAddProductVariants, handleUpdateVariantStock } = useProduct();
  const { handleLogoutUser } = useAuth();

  const [product, setProduct] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAddVariantOpen, setIsAddVariantOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.auth.user);

  // Form State for Adding Variant
  const [variantForm, setVariantForm] = useState({
    amount: "",
    stock: 0,
    currency: "INR",
    attributes: [{ key: "", value: "" }],
    images: [] // Array of { file, preview }
  });

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    setIsLoading(true);
    const data = await handleGetProductById(productId);
    setProduct(data);
    setIsLoading(false);
  };

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

  if (isLoading) return (
    <div className="h-screen bg-black flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin" />
    </div>
  );

  if (!product) return (
    <div className="h-screen bg-black flex flex-col items-center justify-center space-y-6">
      <p className="text-gray-500 uppercase tracking-widest text-xs font-bold">Registry Entry Not Found</p>
      <Link to="/seller/dashboard" className="text-white border-b border-white pb-2 text-xs font-black uppercase tracking-widest">Return to Dashboard</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white flex font-sans overflow-hidden">
      {/* Sidebar - Desktop (Reuse Dashboard Logic) */}
      <aside className="hidden lg:flex w-72 border-r border-white/10 flex-col bg-black">
        <div className="p-10">
          <Link to="/">
            <h1 className="text-4xl font-black tracking-tighter bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent italic">
              SNITCH
            </h1>
          </Link>
          <p className="text-[10px] uppercase tracking-[0.4em] text-gray-500 mt-2 font-bold leading-tight">Authority Portal</p>
        </div>

        <nav className="flex-1 px-6 space-y-2 mt-4">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              to={item.path}
              className={`flex items-center justify-between w-full group py-4 px-4 transition-all ${item.active ? "bg-white/5 border border-white/10" : "hover:bg-white/[0.03]"}`}
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
          <button onClick={onLogout} className="flex items-center gap-4 text-gray-500 hover:text-white transition-colors w-full py-4 group uppercase tracking-widest text-[10px] font-black">
            <LogOut className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden overflow-y-auto custom-scrollbar bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-neutral-900/20 via-black to-black">
        {/* Top Header */}
        <header className="p-6 lg:p-10 flex items-center justify-between border-b border-white/10 sticky top-0 bg-black/80 backdrop-blur-md z-20">
          <div className="flex items-center gap-6">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden text-white"><Menu className="w-6 h-6" /></button>
            <div className="flex items-center gap-4">
              <Link to="/seller/dashboard" className="p-2 hover:bg-white/5 rounded-full transition-colors"><ArrowLeft className="w-4 h-4 text-gray-400 hover:text-white" /></Link>
              <div>
                <h2 className="text-[9px] uppercase tracking-[0.4em] text-gray-500 font-bold mb-1">Product Console</h2>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                  <span className="text-xs font-black tracking-widest uppercase">{product.title}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Console Content */}
        <div className="p-6 lg:p-12 space-y-12 pb-32">

          {/* Product Identity Card */}
          <section className="p-10 border border-white/5 bg-white/[0.01] flex flex-col lg:flex-row gap-12 items-center">
            <div className="w-48 h-64 bg-neutral-900 border border-white/5 overflow-hidden group">
              <img src={product.images[0]?.url} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="" />
            </div>
            <div className="flex-1 space-y-6">
              <div className="space-y-2">
                <h1 className="text-5xl font-black tracking-tighter uppercase leading-none">{product.title}</h1>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Registry ID: {product._id}</p>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed max-w-2xl font-medium uppercase tracking-wide opacity-60">
                {product.description}
              </p>
              <div className="flex gap-10 border-t border-white/5 pt-6 mt-6">
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-gray-600 font-bold mb-2">Base Economics</p>
                  <p className="text-2xl font-light">{product.price.currency} {product.price.amount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-gray-600 font-bold mb-2">Active Variants</p>
                  <p className="text-2xl font-light">{product.variants?.length || 0}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Variants Management Section */}
          <section className="space-y-8">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-xl font-black uppercase tracking-tighter">Variant Registry</h3>
                <p className="text-[9px] uppercase tracking-[0.3em] text-gray-500 font-bold">Manage technical aspects and volume levels</p>
              </div>
              <button
                onClick={() => setIsAddVariantOpen(true)}
                className="bg-white text-black px-8 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-neutral-200 transition-all flex items-center gap-3 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)] rounded-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                Register New Aspect
              </button>
            </div>

            {/* Variant Matrix (List) */}
            <div className="grid grid-cols-1 gap-4">
              {product.variants && product.variants.length > 0 ? (
                product.variants.map((variant, idx) => (
                  <VariantRow key={variant._id || idx} variant={variant} productId={product._id} onUpdate={fetchProduct} updateStock={handleUpdateVariantStock} />
                ))
              ) : (
                <div className="py-24 border border-dashed border-white/10 flex flex-col items-center justify-center space-y-6 bg-white/[0.01]">
                  <Layers className="w-12 h-12 text-gray-800 font-thin" />
                  <p className="text-[10px] uppercase tracking-widest text-gray-600 font-bold">No active variants found in registry</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>

      {/* Add Variant Modal */}
      <AnimatePresence>
        {isAddVariantOpen && (
          <VariantCreationModal
            onClose={() => setIsAddVariantOpen(false)}
            productId={product._id}
            onSuccess={fetchProduct}
            addVariant={handleAddProductVariants}
          />
        )}
      </AnimatePresence>

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
                  <h1 className="text-4xl font-black tracking-tighter italic">SNITCH</h1>
                  <p className="text-[9px] uppercase tracking-[0.4em] text-gray-500 mt-2 font-bold font-mono">Authority Portal</p>
                </div>
                <button onClick={() => setIsSidebarOpen(false)}><X className="w-6 h-6 text-gray-500" /></button>
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

              <button onClick={onLogout} className="flex items-center gap-6 py-6 border-t border-white/10 w-full group">
                <LogOut className="w-5 h-5 text-red-500" />
                <span className="text-xs uppercase tracking-[0.3em] font-black text-red-500">Sign Out</span>
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Subtle Grain Surface (Global App Style) */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
    </div>
  );
};

// --- Sub-components for better organization ---

const VariantRow = ({ variant, productId, onUpdate, updateStock }) => {
  const [stock, setStock] = useState(variant.stock);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStockChange = async (newStock) => {
    if (newStock < 0) return;
    setStock(newStock);
    setIsUpdating(true);
    try {
      await updateStock(productId, variant._id || variant.id, newStock);
      // Optional: Show toast or feedback
    } catch (err) {
      setStock(variant.stock); // Revert on failure
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="group p-6 bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all flex flex-col lg:flex-row items-center gap-10"
    >
      <div className="w-20 h-28 bg-neutral-900 border border-white/5 overflow-hidden shadow-2xl">
        <img src={variant.images[0]?.url} className="w-full h-full object-cover" alt="" />
      </div>

      <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="space-y-2">
          <p className="text-[8px] uppercase tracking-widest text-gray-600 font-black">Economics</p>
          <p className="text-lg font-light tracking-tighter">{variant.price?.currency} {variant.price?.amount.toLocaleString()}</p>
        </div>
        <div className="space-y-2">
          <p className="text-[8px] uppercase tracking-widest text-gray-600 font-black">Attributes</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(variant.attributes || {}).map(([key, val]) => (
              <span key={key} className="text-[8px] uppercase px-2 py-1 bg-white/5 border border-white/10 text-gray-400 font-bold tracking-widest">
                {key}: {val}
              </span>
            ))}
          </div>
        </div>
        <div className="space-y-2 lg:col-span-1">
          <p className="text-[8px] uppercase tracking-widest text-gray-600 font-black">Stock Volume</p>
          <div className="flex items-center gap-6 bg-white/[0.03] w-fit px-4 py-2 rounded-lg border border-white/5">
            <button onClick={() => handleStockChange(stock - 1)} className="p-1 hover:text-white text-gray-500 transition-colors"><ChevronDown className="w-3.5 h-3.5" /></button>
            <span className={`text-sm font-black w-8 text-center ${isUpdating ? "opacity-20 animate-pulse text-blue-400" : "text-white"}`}>{stock}</span>
            <button onClick={() => handleStockChange(stock + 1)} className="p-1 hover:text-white text-gray-500 transition-colors"><ChevronUp className="w-3.5 h-3.5" /></button>
          </div>
        </div>
        <div className="flex items-center justify-end gap-6 text-gray-600">
          <button className="hover:text-white transition-colors"><Edit3 className="w-3.5 h-3.5" /></button>
        </div>
      </div>
    </motion.div>
  );
};

const VariantCreationModal = ({ onClose, productId, onSuccess, addVariant }) => {
  const [form, setForm] = useState({
    amount: "",
    stock: 0,
    currency: "INR",
    attributes: [{ key: "", value: "" }],
    images: []
  });
  const [isSaving, setIsSaving] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (form.images.length + files.length > 7) {
      alert("Maximum 7 images allowed per variant");
      return;
    }

    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));

    setForm(prev => ({ ...prev, images: [...prev.images, ...newImages] }));
  };

  const removeImage = (idx) => {
    setForm(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== idx)
    }));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = Array.from(e.dataTransfer.files);
    if (form.images.length + files.length > 7) {
      alert("Maximum 7 images allowed per variant");
      return;
    }
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setForm(prev => ({ ...prev, images: [...prev.images, ...newImages] }));
  };

  const handleSubmit = async () => {
    if (!form.amount || form.images.length === 0) {
      alert("Economics and Images are required for registry entry.");
      return;
    }
    setIsSaving(true);
    try {
      // Convert attributes array to object for the API
      const attrMap = {};
      form.attributes.forEach(attr => { if (attr.key) attrMap[attr.key] = attr.value });

      const payload = {
        price: { amount: Number(form.amount), currency: form.currency },
        stock: Number(form.stock),
        attributes: attrMap,
        images: form.images
      };

      await addVariant(productId, payload);
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-110 flex items-center justify-center p-6 lg:p-12">
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/90 backdrop-blur-3xl" onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-neutral-900 border border-white/10 w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col relative z-10 shadow-2xl rounded-sm"
      >
        <header className="p-8 border-b border-white/5 flex justify-between items-center bg-black/40">
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tighter italic">Variant Creation Wizard</h2>
            <p className="text-[9px] uppercase tracking-[0.4em] text-gray-500 font-bold mt-1">Initialize visual and economic specific data</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors"><X className="w-6 h-6 text-gray-500" /></button>
        </header>

        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Visual Assets */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-black flex items-center gap-3">
                <ImageIcon className="w-3 h-3 text-blue-500" />
                Visual Documentation (Max 07)
              </p>
              <div
                onDragEnter={handleDrag} onDragOver={handleDrag} onDragLeave={handleDrag} onDrop={handleDrop}
                className={`aspect-video border-2 border-dashed transition-all cursor-pointer relative group flex flex-col items-center justify-center gap-4 ${dragActive ? "border-white bg-white/5 scale-95" : "border-white/10 hover:border-white/20 bg-black/20"}`}
              >
                <input type="file" multiple onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                <Upload className="w-8 h-8 text-gray-700 group-hover:text-white transition-colors" />
                <div className="text-center">
                  <p className="text-[9px] uppercase tracking-widest font-black text-gray-500 group-hover:text-white">Drag & Drop Assets</p>
                  <p className="text-[7px] uppercase tracking-widest text-gray-700 mt-1 font-bold">or click to browse local storage</p>
                </div>
              </div>
            </div>

            {/* Thumbnails Preview */}
            <div className="grid grid-cols-4 gap-4">
              {form.images.map((img, i) => (
                <div key={i} className="aspect-square bg-black border border-white/10 relative group overflow-hidden">
                  <img src={img.preview} className="w-full h-full object-cover" alt="" />
                  <button onClick={() => removeImage(i)} className="absolute top-1 right-1 p-1 bg-black/80 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="w-3 h-3" /></button>
                </div>
              ))}
              {Array.from({ length: Math.max(0, 4 - form.images.length) }).map((_, i) => (
                <div key={i} className="aspect-square border border-white/5 bg-white/[0.01]" />
              ))}
            </div>
          </div>

          {/* Right: Technical Data */}
          <div className="space-y-10">
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-[9px] uppercase tracking-widest text-gray-600 font-black">Variant Economics (INR)</label>
                <input
                  type="number"
                  value={form.amount}
                  onChange={(e) => setForm(prev => ({ ...prev, amount: e.target.value }))}
                  className="w-full bg-black border border-white/10 p-5 text-xl font-light outline-none focus:border-white/40 transition-colors"
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-4">
                <label className="text-[9px] uppercase tracking-widest text-gray-600 font-black">Initial Inventory Sync</label>
                <input
                  type="number"
                  value={form.stock}
                  onChange={(e) => setForm(prev => ({ ...prev, stock: e.target.value }))}
                  className="w-full bg-black border border-white/10 p-5 text-xl font-light outline-none focus:border-white/40 transition-colors"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <label className="text-[9px] uppercase tracking-widest text-gray-600 font-black">Aspect Attributes (Spec Sheet)</label>
                <button
                  onClick={() => setForm(prev => ({ ...prev, attributes: [...prev.attributes, { key: "", value: "" }] }))}
                  className="text-[9px] uppercase tracking-[0.2em] font-black text-blue-500 hover:text-white transition-colors"
                >
                  + Add Field
                </button>
              </div>
              <div className="space-y-3">
                {form.attributes.map((attr, i) => (
                  <div key={i} className="flex gap-4 items-center animate-in slide-in-from-left-4 duration-300">
                    <input
                      placeholder="Key (e.g. Size)"
                      value={attr.key}
                      onChange={(e) => {
                        const newAttrs = [...form.attributes];
                        newAttrs[i].key = e.target.value;
                        setForm(prev => ({ ...prev, attributes: newAttrs }));
                      }}
                      className="flex-1 bg-black/40 border border-white/10 p-3 text-[10px] uppercase tracking-widest outline-none focus:border-white/30"
                    />
                    <input
                      placeholder="Value (e.g. XL)"
                      value={attr.value}
                      onChange={(e) => {
                        const newAttrs = [...form.attributes];
                        newAttrs[i].value = e.target.value;
                        setForm(prev => ({ ...prev, attributes: newAttrs }));
                      }}
                      className="flex-1 bg-black/40 border border-white/10 p-3 text-[10px] uppercase tracking-widest outline-none focus:border-white/30 font-black"
                    />
                    <button
                      onClick={() => setForm(prev => ({ ...prev, attributes: prev.attributes.filter((_, idx) => idx !== i) }))}
                      className="p-2 text-gray-700 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <footer className="p-8 border-t border-white/5 bg-black/40 flex justify-end gap-6">
          <button onClick={onClose} className="px-10 py-5 text-[9px] uppercase tracking-widest font-black text-gray-600 hover:text-white transition-colors">Cancel Session</button>
          <button
            onClick={handleSubmit}
            className={`px-12 py-5 bg-white text-black text-[9px] uppercase tracking-[0.3em] font-black hover:bg-neutral-200 transition-all flex items-center gap-3 ${isSaving ? "opacity-50 cursor-not-allowed" : "active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.15)]"}`}
            disabled={isSaving}
          >
            {isSaving ? <span className="w-3 h-3 border-2 border-black/20 border-t-black rounded-full animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            Finalize Entry
          </button>
        </footer>
      </motion.div>
    </div>
  );
};

export default SellerProductDetail;
