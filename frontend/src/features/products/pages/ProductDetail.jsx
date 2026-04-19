import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import { useProduct } from '../hook/useProduct';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  User, 
  ChevronRight,
  Star,
  Truck,
  ShieldCheck,
  RefreshCcw,
  Minus,
  Plus,
  Command,
  ArrowLeft
} from 'lucide-react';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { handleGetProductById } = useProduct();

  useEffect(() => {
    async function fetchProduct() {
      const data = await handleGetProductById(productId);
      setProduct(data);
    }
    fetchProduct();
  }, [productId]);

  if (!product) return (
    <div className="h-screen bg-black flex items-center justify-center">
      <div className="w-6 h-6 border border-white/20 border-t-white rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#070707] text-white font-sans selection:bg-white selection:text-black flex flex-col relative">
      {/* Minimal Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md py-8 px-6 lg:px-24 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-10">
            <Link to="/" className="text-xl font-bold tracking-tighter hover:opacity-70 transition-opacity">SNITCH</Link>
            <div className="hidden lg:block h-4 w-[1px] bg-white/10" />
            <Link to="/" className="hidden lg:flex items-center gap-2 group">
              <ArrowLeft className="w-3 h-3 text-white/40 group-hover:text-white transition-colors" />
              <span className="text-[9px] uppercase tracking-[0.3em] font-black text-white/30 group-hover:text-white transition-colors">Back to Collection</span>
            </Link>
          </div>
          <div className="flex items-center gap-8">
            <User className="w-3.5 h-3.5 text-white/40 hover:text-white transition-colors cursor-pointer" />
            <div className="relative cursor-pointer group">
              <ShoppingBag className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
              <span className="absolute -top-1.5 -right-1.5 bg-white text-black text-[7px] font-bold w-3 h-3 flex items-center justify-center rounded-full">0</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Floating Back Button for Mobile/Scroll */}
      <Link to="/" className="fixed bottom-8 left-8 z-50 lg:hidden flex items-center justify-center w-12 h-12 bg-white text-black rounded-full shadow-2xl transition-transform active:scale-90">
         <ArrowLeft className="w-5 h-5" />
      </Link>

      {/* Centered Minimal Shell */}
      <main className="flex-1 max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-start lg:items-center justify-center gap-16 lg:gap-24 px-6 lg:px-24 pt-40 pb-20">
        
        {/* Gallery Section: Focus & Breathe */}
        <div className="w-full lg:w-1/2 flex flex-col items-center gap-10">
          <div className="w-full aspect-[4/5] lg:max-h-[60vh] flex items-center justify-center bg-neutral-900/40 rounded-[2.5rem] overflow-hidden border border-white/5 relative shadow-inner">
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedImage}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                src={product.images[selectedImage]?.url}
                className="w-full h-full object-contain p-8 lg:p-12"
                alt={product.title}
              />
            </AnimatePresence>
            
            <div className="absolute top-8 left-8 text-[8px] uppercase tracking-[0.4em] font-bold text-white/20">
               Registry Visual / 0{selectedImage + 1}
            </div>
          </div>

          {/* Micro Thumbnails */}
          <div className="flex gap-4 px-4 overflow-x-auto max-w-full scrollbar-hide">
            {product.images.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`flex-shrink-0 w-12 h-16 rounded-xl overflow-hidden border transition-all duration-300 ${
                  selectedImage === idx ? "border-white opacity-100 scale-110 shadow-lg" : "border-transparent opacity-30 hover:opacity-60"
                }`}
              >
                <img src={img.url} className="w-full h-full object-cover" alt="" />
              </button>
            ))}
          </div>
        </div>

        {/* Info Section: Refined Typography */}
        <div className="w-full lg:w-1/2 flex flex-col gap-12">
          
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-[9px] uppercase tracking-[0.4em] font-black text-white/30">
               <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
               Item Specification Path
            </div>
            <h1 className="text-4xl lg:text-5xl font-light tracking-tight uppercase leading-[0.9]">
              {product.title}
            </h1>
            <div className="flex items-end gap-8">
               <p className="text-3xl font-light tracking-tighter text-white">
                 {product.price.currency} {product.price.amount.toLocaleString()}
               </p>
               <div className="flex items-center gap-2 pb-1.5">
                  <Star className="w-3 h-3 fill-white text-white" />
                  <span className="text-[10px] font-black tracking-widest text-white/40 uppercase">4.9 / Verified</span>
               </div>
            </div>
          </div>

          <div className="space-y-8">
            <p className="text-[11px] uppercase tracking-[0.2em] leading-relaxed text-white/40 font-bold max-w-md">
              {product.description || "A MINIMALIST ARCHITECTURAL PIECE DESIGNED FOR THE MODERN COLLECTIVE. CRAFTED WITH PRECISION AND FORMAL RESTRAINT."}
            </p>

            {/* Compact Configuration */}
            <div className="flex flex-wrap items-center gap-12 py-8 border-y border-white/5">
                <div className="space-y-4">
                  <p className="text-[9px] uppercase tracking-[0.3em] text-white/20 font-black">Quantity Selection</p>
                  <div className="flex items-center gap-8 bg-white/5 border border-white/5 px-6 py-3 rounded-2xl">
                    <Minus onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-3.5 h-3.5 cursor-pointer text-white/30 hover:text-white overflow-visible" />
                    <span className="text-sm font-black w-4 text-center">{quantity}</span>
                    <Plus onClick={() => setQuantity(quantity + 1)} className="w-3.5 h-3.5 cursor-pointer text-white/30 hover:text-white" />
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="text-[9px] uppercase tracking-[0.3em] text-white/20 font-black">Registry Status</p>
                  <div className="flex items-center gap-3 h-[46px] bg-white/5 border border-white/5 px-6 rounded-2xl">
                     <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] animate-pulse" />
                     <span className="text-[9px] font-black uppercase tracking-widest text-white/60">Inventory Active</span>
                  </div>
                </div>
            </div>
          </div>

          {/* Action Buttons: Slim & Pro */}
          <div className="flex flex-col gap-4 max-w-sm">
            <button className="h-16 bg-white text-black rounded-3xl font-black uppercase tracking-[0.3em] text-[10px] transition-all hover:bg-neutral-200 flex items-center justify-center gap-6 group overflow-hidden">
               SECURE PURCHASE
               <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
            </button>
            <button className="h-14 border border-white/10 rounded-3xl font-black uppercase tracking-[0.2em] text-[9px] text-white/40 transition-all hover:bg-white/5 hover:text-white">
               Add to Bag Registry
            </button>
          </div>

          {/* Footer Meta */}
          <div className="flex items-center gap-8 pt-6 border-t border-white/5">
            <div className="flex gap-4 opacity-30">
               {[Truck, ShieldCheck, RefreshCcw].map((Icon, i) => (
                   <Icon key={i} className="w-4 h-4" />
               ))}
            </div>
            <span className="text-[8px] uppercase tracking-[0.4em] font-black text-white/20">SNITCH / BUILT FOR THE COLLECTIVE</span>
          </div>

        </div>
      </main>

      {/* Subtle Grain Surface */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
    </div>
  );
};

export default ProductDetail;
