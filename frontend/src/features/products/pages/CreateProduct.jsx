import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package,
  DollarSign,
  Image as ImageIcon,
  Plus,
  X,
  ArrowRight,
  Sparkles,
  ChevronDown
} from "lucide-react";
import { useNavigate } from "react-router";
import { useProduct } from "../hook/useProduct";

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: "",
    currency: "USD",
  });
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const { handleCreateProduct } = useProduct();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const processFiles = (files) => {
    if (images.length + files.length > 7) {
      alert("Maximum 7 images allowed");
      return;
    }

    const newImages = [...images, ...files];
    setImages(newImages);

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews([...previews, ...newPreviews]);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    processFiles(files);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
    processFiles(files);
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    setImages(newImages);
    setPreviews(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("amount", formData.amount);
    data.append("currency", formData.currency);
    images.forEach((image) => {
      data.append("images", image);
    });

    try {
      await handleCreateProduct(data);
      navigate("/");
    } catch (error) {
      alert("Failed to create product");
      console.log("Failed to create product due to this error:", error);
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 lg:p-12 font-sans overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto"
      >
        {/* Header Section */}
        <div className="mb-12">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-7xl font-black tracking-tighter bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent mb-4"
          >
            REGISTRY
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-500 uppercase tracking-[0.4em] text-[10px] font-bold"
          >
            Collection Provisioning / 2026 Source
          </motion.p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Essential Details */}
          <div className="lg:col-span-7 space-y-10">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-[1px] bg-white/20" />
                <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Identity</span>
              </div>

              <div className="space-y-4">
                <div className="group">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 mb-2 block ml-1 transition-colors group-focus-within:text-white">Product Title</label>
                  <input
                    type="text"
                    name="title"
                    required
                    placeholder="E.G. OBSIDIAN PARKA"
                    className="w-full bg-white/5 border border-white/10 rounded-none py-5 px-6 outline-none focus:border-white/40 focus:bg-white/[0.08] transition-all text-xl tracking-tight text-white placeholder:text-gray-800"
                    onChange={handleInputChange}
                  />
                </div>

                <div className="group pt-4">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 mb-2 block ml-1 transition-colors group-focus-within:text-white">Narrative / Description</label>
                  <textarea
                    name="description"
                    required
                    rows="6"
                    placeholder="DESCRIBE THE ESSENCE OF THIS PIECE..."
                    className="w-full bg-white/5 border border-white/10 rounded-none py-5 px-6 outline-none focus:border-white/40 focus:bg-white/[0.08] transition-all text-sm tracking-wide text-white placeholder:text-gray-800 resize-none"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-[1px] bg-white/20" />
                <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Economics</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group relative">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 mb-2 block ml-1 transition-colors group-focus-within:text-white">Amount</label>
                  <div className="relative">
                    <input
                      type="number"
                      name="amount"
                      required
                      placeholder="0.00"
                      className="w-full bg-white/5 border border-white/10 rounded-none py-5 pl-14 pr-6 outline-none focus:border-white/40 focus:bg-white/[0.08] transition-all text-xl tracking-tight text-white placeholder:text-gray-800"
                      onChange={handleInputChange}
                    />
                    <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within:text-white transition-colors" />
                  </div>
                </div>

                <div className="group relative">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 mb-2 block ml-1 transition-colors group-focus-within:text-white">Currency</label>
                  <div className="relative">
                    <select
                      name="currency"
                      className="w-full bg-white/5 border border-white/10 rounded-none py-5 px-6 outline-none focus:border-white/40 focus:bg-white/[0.08] transition-all text-xl tracking-tight text-white appearance-none cursor-pointer"
                      onChange={handleInputChange}
                    >
                      <option className="bg-neutral-900" value="USD">USD</option>
                      <option className="bg-neutral-900" value="EUR">EUR</option>
                      <option className="bg-neutral-900" value="GBP">GBP</option>
                      <option className="bg-neutral-900" value="INR">INR</option>
                    </select>
                    <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 pointer-events-none group-focus-within:text-white transition-colors" />
                  </div>
                </div>
              </div>
            </motion.section>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="pt-6"
            >
              <button
                type="submit"
                className="w-full group bg-white text-black font-black py-6 rounded-none flex items-center justify-center gap-4 hover:bg-neutral-200 transition-all uppercase tracking-widest text-xs"
              >
                Execute Registry <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
              </button>
            </motion.div>
          </div>

          {/* Right Column: Imagery Matrix */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="sticky top-12"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-[1px] bg-white/20" />
                <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Imagery ( {images.length} / 7 )</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4">
                <AnimatePresence mode="popLayout">
                  {previews.map((preview, index) => (
                    <motion.div
                      key={preview}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ type: "spring", damping: 20, stiffness: 200 }}
                      className="aspect-square relative group overflow-hidden border border-white/10"
                    >
                      <img src={preview} alt="" className="w-full h-full object-cover  transition-all duration-500 group-hover:grayscale-0 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="bg-white text-black p-2 rounded-full hover:bg-red-500 hover:text-white transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {images.length < 7 && (
                  <motion.label
                    layout
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.3)" }}
                    animate={{
                      borderColor: isDragging ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.1)",
                      backgroundColor: isDragging ? "rgba(255,255,255,0.1)" : "transparent"
                    }}
                    className="aspect-square border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all group relative overflow-hidden"
                  >
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                    <Plus className="w-6 h-6 text-gray-500 group-hover:text-white transition-colors mb-2" />
                    <span className="text-[8px] uppercase tracking-[0.3em] text-gray-600 group-hover:text-gray-300 font-bold">Add Visual</span>

                    {/* Subtle aesthetic lines */}
                    <div className="absolute top-2 left-2 w-1 h-1 border-t border-l border-white/20" />
                    <div className="absolute top-2 right-2 w-1 h-1 border-t border-r border-white/20" />
                    <div className="absolute bottom-2 left-2 w-1 h-1 border-b border-l border-white/20" />
                    <div className="absolute bottom-2 right-2 w-1 h-1 border-b border-r border-white/20" />
                  </motion.label>
                )}
              </div>

              <div className="mt-8 p-6 bg-white/[0.02] border border-white/5 space-y-4">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-3 h-3 text-gray-600" />
                  <p className="text-[10px] text-gray-500 leading-relaxed uppercase tracking-widest font-bold">
                    Imagery protocol: Limit 7 visual artifacts. Grayscale rendering applied by default.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </form>
      </motion.div>


    </div>
  );
};

export default CreateProduct;
