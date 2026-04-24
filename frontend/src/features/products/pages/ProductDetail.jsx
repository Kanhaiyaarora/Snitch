import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router';
import { useProduct } from '../hook/useProduct';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import {
  ShoppingBag,
  ChevronRight,
  Star,
  Truck,
  ShieldCheck,
  RefreshCcw,
  Minus,
  Plus,
  ArrowLeft,
  Heart,
  Share2
} from 'lucide-react';
import useCart from '../../cart/hook/useCart';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { handleGetProductById } = useProduct();
  const { handleAddItem } = useCart()
  const cartItems = useSelector(state => state.cart.items);

  useEffect(() => {
    async function fetchProduct() {
      const data = await handleGetProductById(productId);
      setProduct(data);

      if (data?.variants?.length > 0) {
        const firstVariant = data.variants[0];
        const initialAttrs = {};
        Object.entries(firstVariant.attributes).forEach(([key, value]) => {
          initialAttrs[key.toLowerCase()] = value;
        });
        setSelectedAttributes(initialAttrs);
      }
    }
    fetchProduct();
  }, [productId]);

  const availableAttributes = useMemo(() => {
    if (!product?.variants) return {};
    const attrs = {};
    product.variants.forEach(v => {
      Object.entries(v.attributes).forEach(([key, val]) => {
        const normalizedKey = key.toLowerCase();
        if (!attrs[normalizedKey]) attrs[normalizedKey] = new Set();
        attrs[normalizedKey].add(val);
      });
    });
    const result = {};
    Object.entries(attrs).forEach(([key, valSet]) => {
      result[key] = Array.from(valSet);
    });
    return result;
  }, [product]);

  const activeVariant = useMemo(() => {
    if (!product?.variants || Object.keys(selectedAttributes).length === 0) return null;
    return product.variants.find(v => {
      return Object.entries(selectedAttributes).every(([key, val]) => {
        const vVal = Object.entries(v.attributes).find(([vk]) => vk.toLowerCase() === key)?.[1];
        return vVal === val;
      });
    });
  }, [product, selectedAttributes]);

  const displayPrice = activeVariant?.price || product?.price;
  const displayImages = (activeVariant?.images?.length > 0 ? activeVariant.images : product?.images) || [];
  const displayStock = activeVariant?.stock ?? 0;

  useEffect(() => {
    setSelectedImage(0);
  }, [activeVariant?.images]);

  if (!product) return (
    <div className="h-screen bg-black flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-white/5 border-t-white rounded-full animate-spin" />
    </div>
  );

  const handleAttributeSelect = (key, value) => {
    setSelectedAttributes(prev => ({ ...prev, [key]: value }));
  };

  const onAddToCart = async () => {
    try {
      await handleAddItem({
        productId: product._id,
        variantId: activeVariant?._id
      });
    } catch (error) {
      console.error("Failed to add item to bag:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black">
      {/* Header / Nav */}
      <nav className="border-b border-white/5 sticky top-0 bg-black/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <Link to="/" className="text-2xl font-black tracking-tighter italic">SNITCH</Link>
          <div className="flex items-center gap-8">
            <div className="hidden lg:flex items-center gap-6">
              <Link to="/" className="text-[10px] uppercase font-bold tracking-widest text-white/40 hover:text-white transition-colors">Catalog</Link>
              <Link to="/" className="text-[10px] uppercase font-bold tracking-widest text-white/40 hover:text-white transition-colors">Registry</Link>
            </div>
            <div className="h-4 w-[1px] bg-white/10 hidden lg:block" />
            <div className="relative group cursor-pointer">
              <ShoppingBag className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
              <span className="absolute -top-1.5 -right-1.5 bg-white text-black text-[7px] font-bold w-3.5 h-3.5 flex items-center justify-center rounded-full">
                {cartItems.length}
              </span>
            </div>
          </div>
        </div>
      </nav>


      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

        {/* Column 1: Gallery (Normalized) */}
        <div className="space-y-8">
          <div className="w-full aspect-square max-h-[550px] bg-[#0a0a0a] rounded-sm overflow-hidden flex items-center justify-center border border-white/5 relative group">
            <AnimatePresence mode="wait">
              <motion.img
                key={displayImages[selectedImage]?.url || 'placeholder'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                src={displayImages[selectedImage]?.url}
                className="w-full h-full object-contain p-4 lg:p-8"
                alt={product.title}
              />
            </AnimatePresence>

            {/* Back to Catalog (Contextual) */}
            <Link to="/" className="absolute top-6 left-6 p-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>

          {/* Standard Thumbnail Strip */}
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
            {displayImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`flex-shrink-0 w-16 h-20 bg-[#0a0a0a] border-b-2 transition-all duration-300 ${selectedImage === idx ? "border-white opacity-100" : "border-transparent opacity-30 hover:opacity-100"
                  }`}
              >
                <img src={img.url} className="w-full h-full object-cover" alt="" />
              </button>
            ))}
          </div>
        </div>

        {/* Column 2: Details & Actions */}
        <div className="flex flex-col">
          {/* Header Info */}
          <div className="space-y-6 pb-10 border-b border-white/5">
            <div className="flex items-center justify-between">
              <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-black">Official Specification</p>
              <div className="flex gap-4 opacity-40">
                <button className="hover:text-white transition-colors"><Heart className="w-4 h-4" /></button>
                <button className="hover:text-white transition-colors"><Share2 className="w-4 h-4" /></button>
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter leading-tight italic">
              {product.title}
            </h1>
            <div className="flex items-center gap-10">
              <p className="text-3xl font-light tracking-tighter">
                {displayPrice.currency} {displayPrice.amount.toLocaleString()}
              </p>
              <div className="flex items-center gap-2">
                <Star className="w-3 h-3 fill-white text-white" />
                <span className="text-[10px] uppercase font-black tracking-widest text-white/30">Verified Entry</span>
              </div>
            </div>
          </div>

          {/* Dynamic Variant Matrix */}
          <div className="py-12 space-y-12">
            {Object.entries(availableAttributes).map(([key, values]) => (
              <div key={key} className="space-y-5">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.4em] text-white/20 italic">
                  <label>Select {key}</label>
                  {key.toLowerCase() === 'size' && <button className="text-white/40 hover:text-white cursor-pointer transition-colors border-b border-white/10 pb-0.5">Size Guide</button>}
                </div>
                <div className="flex flex-wrap gap-3">
                  {values.map(val => (
                    <button
                      key={val}
                      onClick={() => handleAttributeSelect(key, val)}
                      className={`min-w-[4rem] h-12 px-6 text-[10px] font-black uppercase tracking-widest transition-all border ${selectedAttributes[key] === val
                        ? "bg-white text-black border-white"
                        : "border-white/10 text-white/40 hover:border-white/40 hover:text-white"
                        }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Quantity & Stock Level */}
            <div className="flex flex-wrap items-center gap-16 pt-4">
              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 italic">Volume Selection</p>
                <div className="flex items-center gap-10 bg-white/5 border border-white/10 px-6 py-2.5 rounded-sm">
                  <Minus onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-3.5 h-3.5 cursor-pointer text-white/40 hover:text-white" />
                  <span className="text-xs font-black min-w-[20px] text-center">{quantity}</span>
                  <Plus onClick={() => setQuantity(quantity + 1)} className="w-3.5 h-3.5 cursor-pointer text-white/40 hover:text-white" />
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 italic">Registry Availability</p>
                <div className="flex items-center gap-3 py-2.5">
                  <div className={`w-2 h-2 rounded-full ${displayStock > 0 ? "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.3)]" : "bg-red-500 animate-pulse"} `} />
                  <span className={`text-[10px] font-black uppercase tracking-widest ${displayStock > 0 ? "text-white/60" : "text-red-500 opacity-60"}`}>
                    {displayStock > 0 ? `In Stock Registry (${displayStock})` : "Currently Depleted"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions - Normalized Size */}
          <div className="space-y-4 pb-12">
            <div className="grid grid-cols-2 gap-4">
              <button
                disabled={displayStock === 0}
                className="h-14 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:bg-neutral-200 active:scale-[0.98] disabled:opacity-20 disabled:cursor-not-allowed group flex items-center justify-center gap-3"
              >
                Buy Now
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={onAddToCart}
                disabled={displayStock === 0}
                className="h-14 bg-transparent border border-white/20 text-white/60 text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:bg-white/5 hover:text-white hover:border-white disabled:opacity-20 disabled:cursor-not-allowed"
              >
                Add to Bag
              </button>
            </div>
          </div>


          {/* Specs & Description Area */}
          <div className="pt-10 border-t border-white/5 space-y-10">
            <p className="text-xs text-white/40 leading-relaxed font-bold uppercase tracking-widest max-w-lg">
              {product.description || "A MINIMALIST ARCHITECTURAL PIECE DESIGNED FOR THE MODERN COLLECTIVE. CRAFTED WITH PRECISION AND FORMAL RESTRAINT."}
            </p>

            <div className="flex items-center gap-12 group opacity-30 hover:opacity-100 transition-opacity duration-700">
              <div className="flex items-center gap-4">
                <Truck className="w-4 h-4" />
                <span className="text-[8px] uppercase tracking-widest font-black">Express Delivery</span>
              </div>
              <div className="flex items-center gap-4">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[8px] uppercase tracking-widest font-black">Quality Registry</span>
              </div>
              <div className="flex items-center gap-4">
                <RefreshCcw className="w-4 h-4" />
                <span className="text-[8px] uppercase tracking-widest font-black">Global Support</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Global Grain Surface */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
    </div>
  );
};

export default ProductDetail;
