import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { User, Menu, X, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "News", path: "/news" },
    { name: "About", path: "/about" },
  ];

  return (
    <div className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${isScrolled ? 'pt-0' : 'pt-4'}`}>
      <header
        className={`relative max-w-7xl mx-auto transition-all duration-500 rounded-none md:rounded-full overflow-hidden shadow-2xl ${isScrolled
            ? "bg-[#850A0A]/95 backdrop-blur-md h-20 px-8"
            : "bg-[#850A0A] h-24 px-10 md:mx-4"
          } border-b-2 md:border-2 border-[#B8860B]/30`}
      >
        {/* Background Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none grayscale"
          style={{
            backgroundImage: "url('/chinese_bg_pattern.png')",
            backgroundSize: "200px",
            backgroundRepeat: "repeat"
          }}
        />

        <div className="relative z-10 w-full h-full flex justify-between items-center">
          {/* Logo Section */}
          <Link to="/" className="group flex items-center gap-3">
            <div className="relative w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center border-2 border-[#B8860B] shadow-lg transition-transform group-hover:rotate-12">
              <img src="/logo.svg" alt="Haidilao" className="w-[70%] h-[70%]" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-white font-black text-xl tracking-tighter leading-none mb-0.5">WUYANG</h1>
              <p className="text-[#B8860B] text-[8px] font-bold tracking-[0.4em] uppercase">Authentic Taste</p>
            </div>
          </Link>

          {/* Nav Links (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-8 xl:space-x-12">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `relative py-2 text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 group ${isActive ? "text-white" : "text-[#FFF1CA]/80 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.name}</span>
                    <motion.div
                      className="absolute -bottom-1 left-0 h-0.5 bg-[#B8860B]"
                      initial={isActive ? { width: "100%" } : { width: "0%" }}
                      animate={isActive ? { width: "100%" } : { width: "0%" }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-4">
            <Link to="/signin" className="hidden sm:flex p-2 text-[#FFF1CA] hover:text-white transition-colors">
              <User size={22} strokeWidth={2.5} />
            </Link>

            <div className="h-6 w-px bg-white/10 hidden lg:block"></div>

            <Link to="/booking">
              <button className="relative group px-6 py-2 md:px-8 md:py-3 bg-[#B8860B] hover:bg-[#a6790a] text-white font-black text-xs md:text-sm tracking-[0.2em] uppercase rounded-full shadow-lg transition-all active:scale-95 overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  <Globe size={16} className="text-white/60" />
                  Book Table
                </span>
                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
              </button>
            </Link>

            {/* Mobile Toggle */}
            <button
              className="lg:hidden p-2 text-white hover:bg-white/10 rounded-full transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 w-full mt-2 px-4 z-40"
          >
            <div className="bg-[#850A0A] border-2 border-[#B8860B]/30 rounded-3xl shadow-2xl p-8 space-y-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-xl font-black text-[#FFF1CA] tracking-widest uppercase hover:text-white border-b border-white/10 pb-4 transition-colors"
                >
                  {link.name}
                </NavLink>
              ))}
              <div className="pt-4 flex justify-between items-center text-[#FFF1CA]">
                <Link to="/signin" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 font-bold uppercase text-sm">
                  <User size={20} /> My Account
                </Link>
                <div className="w-10 h-10 bg-[#B8860B] flex items-center justify-center text-white font-bold text-[8px] rotate-3">海底捞</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;
