import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useProduct } from '../hook/useProduct';
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  User,
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
  Command
} from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import gsap from 'gsap';

const Home = () => {
  const navigate = useNavigate();
  const products = useSelector((state) => state.product.products);
  const { handleGetAllProducts } = useProduct();
  const [isNavScrolled, setIsNavScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const heroRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    handleGetAllProducts();

    const handleScroll = () => {
      setIsNavScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    // GSAP Nexura-Inspired Reveal
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.5 } });

      tl.from(textRef.current?.children, {
        y: 100,
        opacity: 0,
        stagger: 0.2,
      }, 0.2)
        .from(imageRef.current, {
          x: 100,
          opacity: 0,
          scale: 1.1,
          duration: 2,
        }, 0.5)
        .from(cardsRef.current?.children, {
          y: 50,
          opacity: 0,
          stagger: 0.1,
        }, 1);
    }, heroRef);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ctx.revert();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#070707] text-white font-sans selection:bg-white selection:text-black">
      {/* Buyer-Centric Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${isNavScrolled || isMobileMenuOpen
          ? "bg-black/90 backdrop-blur-xl py-5 border-b border-white/10"
          : "bg-transparent py-10 border-b border-transparent"
          }`}
      >
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12 flex items-center justify-between">
          <Link to="/" className="group">
            <h1 className="text-3xl font-black tracking-tighter">SNITCH</h1>
          </Link>

          <div className="hidden lg:flex items-center gap-12">
            {['Home', 'Collection', 'About Us', 'Contact'].map((item) => (
              <Link key={item} to="#" className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-500 hover:text-white transition-colors">
                {item}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-6 lg:gap-10">
            <button className="hidden md:flex items-center gap-3 text-gray-500 hover:text-white transition-colors">
              <Search className="w-4 h-4" />
              <span className="text-[10px] uppercase tracking-widest font-black">Registry</span>
            </button>
            <Link to="/login" className="text-gray-500 hover:text-white transition-colors">
              <User className="w-4 h-4" />
            </Link>
            <button className="relative group p-2">
              <ShoppingBag className="w-5 h-5 text-white" />
              <span className="absolute top-0 right-0 bg-white text-black text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full">0</span>
            </button>
            <button className="lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 z-90 bg-black pt-40 px-10 flex flex-col gap-8 lg:hidden"
          >
            {['Home', 'Collection', 'About Us', 'Contact'].map((item) => (
              <Link key={item} to="#" className="text-5xl font-black tracking-tighter" onClick={() => setIsMobileMenuOpen(false)}>
                {item}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nexura-Inspired Hero Redesign */}
      <main ref={heroRef} className="relative pt-24 lg:pt-45 pb-10 px-6 lg:px-12 max-w-[1800px] mx-auto h-[100vh] lg:h-screen flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* Left Column: Text & Features */}
          <div className="lg:col-span-6 space-y-8 lg:space-y-10">
            <div ref={textRef} className="space-y-6 lg:space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-[1px] bg-white/30" />
                <p className="text-[9px] uppercase tracking-[0.5em] font-black text-white/40">Collective Registry 001</p>
              </div>
              <h1 className="text-[clamp(2.5rem,7vw,5rem)] font-extrabold leading-[0.9] tracking-tighter uppercase whitespace-pre-line">
                GET READY FOR <br />
                YEAR-END <br />
                <span className="bg-gradient-to-r from-white via-white/50 to-white/10 bg-clip-text text-transparent">EXCELLENCE</span>
              </h1>
              <p className="max-w-md text-gray-500 text-[11px] leading-relaxed font-medium uppercase tracking-[0.1em]">
                PREPARE FOR THE SEASON WITH EASE. MAXIMIZE STYLE, STREAMLINE YOUR CHOICE, AND ENJOY THE DARK LUXURY JOURNEY.
              </p>
              <button className="group flex items-center gap-6 bg-white text-black px-8 py-4 rounded-full font-black uppercase tracking-widest text-[9px] transition-all hover:bg-neutral-200">
                Shop Now
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-2" />
              </button>
            </div>

            {/* Feature Cards Bottom-Left */}
            <div ref={cardsRef} className="flex flex-col sm:flex-row gap-6  border-t border-white/5">
              <div className="flex-1 bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 space-y-4 group hover:bg-white/10 transition-colors">
                <Truck className="w-6 h-6 text-white/40 group-hover:text-white transition-colors" />
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest font-black mb-2">Free Shipping</h4>
                  <p className="text-[9px] text-gray-500 uppercase leading-relaxed font-bold">Instant support from our registry representatives.</p>
                </div>
              </div>
              <div className="flex-1 bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 space-y-4 group hover:bg-white/10 transition-colors">
                <ShieldCheck className="w-6 h-6 text-white/40 group-hover:text-white transition-colors" />
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest font-black mb-2">Secure Checkout</h4>
                  <p className="text-[9px] text-gray-500 uppercase leading-relaxed font-bold">Enjoy a seamless and protected shopping experience.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Image */}
          <div className="lg:col-span-6 relative">
            <div ref={imageRef} className="aspect-[4/5] lg:h-[65vh] rounded-[2rem] lg:rounded-[3rem] overflow-hidden border border-white/10 relative ml-auto">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              <img
                src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1974&auto=format&fit=crop"
                alt="Editorial Visual"
                className="w-full h-full object-cover brightness-95 hover:brightness-100 transition-all duration-1000"
              />
              <div className="absolute bottom-12 right-12 z-20 text-right">
                <p className="text-[9px] uppercase tracking-[0.6em] font-black text-white opacity-40">System Build 1.0.ARCH</p>
              </div>
            </div>
            {/* Minimalist Grid Overlays */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-white/[0.02] rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </main>

      {/* Product Registry Section */}
      <section className="py-20 lg:py-40 px-6 lg:px-12 max-w-[1800px] mx-auto border-t border-white/5">
        <div className="flex items-center justify-between gap-12 mb-20">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <Command className="w-4 h-4 text-white/30" />
              <span className="text-[10px] uppercase tracking-[0.5em] font-black text-gray-500">Inventory Status / Online</span>
            </div>
            <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-black tracking-tighter uppercase leading-none">The Catalogue</h2>
          </div>
          <p className="hidden md:block max-w-[200px] text-[9px] text-gray-600 uppercase tracking-widest font-bold leading-relaxed">
            A curated registry of high-end essentials. Built for the monolithic authority.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          <AnimatePresence>
            {products && products.length > 0 ? (
              products.map((product, i) => (
                <motion.div
                  onClick={() => navigate(`/product/${product._id}`)}
                  key={product._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-neutral-900 border border-white/10 relative mb-6">
                    <img
                      src={product.images[0]?.url}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 brightness-95 group-hover:brightness-100"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                      <button className="w-full py-4 bg-white text-black text-[9px] font-black uppercase tracking-widest rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform">
                        Explore Detailed Registry
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-start px-2">
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                        {product.title}
                        <Sparkles className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h3>
                      <p className="text-[9px] text-gray-600 font-black uppercase mt-1">RegistryID: {product._id.slice(-8)}</p>
                    </div>
                    <p className="text-xl font-light tracking-tighter">
                      {product.price.currency} {product.price.amount.toLocaleString()}
                    </p>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-40 border border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center gap-6">
                <p className="text-[10px] uppercase tracking-[0.5em] text-gray-500 font-black animate-pulse">Syncing Inventory Registry...</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Archival Footer */}
      <footer className="py-40 px-6 lg:px-12 max-w-[1800px] mx-auto border-t border-white/5 bg-neutral-950/20">
        <div className="flex flex-col lg:flex-row justify-between gap-24">
          <div className="max-w-xl space-y-10">
            <h2 className="text-4xl font-black tracking-tighter">SNITCH</h2>
            <p className="text-gray-500 text-sm leading-relaxed uppercase tracking-[0.2em] font-bold">
              WE ARE THE MONOLITHIC AUTHORITY IN MODERN APPAREL. OUR REGISTRY IS CURATED FOR THE DISCERNING INDIVIDUAL WHO VALUES PURE FORM OVER ADORNMENT.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-16 lg:gap-24">
            {[
              { title: "Navigation", links: ["All Collection", "Editorial", "Archives"] },
              { title: "Registry", links: ["Member Status", "Shipping", "Returns"] },
              { title: "System", links: ["Privacy", "Terms", "Legal"] },
            ].map((section) => (
              <div key={section.title} className="space-y-8">
                <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-white/50">{section.title}</h4>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-[10px] uppercase tracking-widest text-gray-600 hover:text-white transition-colors font-bold block">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-40 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
          <p className="text-[9px] uppercase tracking-[0.6em] text-gray-800 font-bold">© 2026 SNITCH MONOLITHIC / BUILT FOR THE COLLECTIVE</p>
          <div className="flex gap-10">
            {['INSTAGRAM', 'TWITTER', 'DISCORD'].map((s) => (
              <span key={s} className="text-[9px] uppercase tracking-widest text-gray-800 hover:text-white transition-colors cursor-pointer">{s}</span>
            ))}
          </div>
        </div>
      </footer>

      {/* Grain Surface */}
      <div className="fixed inset-0 pointer-events-none z-[200] opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
    </div>
  );
};

export default Home;
