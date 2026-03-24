import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import OfferSection from "../components/OfferSection";
import AboutAndFeatures from "../components/AboutAndFeatures";
import RestaurantTimeline from "../components/RestaurantTimeline";
import LocationSection from "../components/LocationSection";

export const Home = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div className="bg-[#FFF1CA] overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-[#B8860B] z-[110] origin-left shadow-[0_0_10px_rgba(184,134,11,0.5)]"
        style={{ scaleX }}
      />

      <Header />

      <main>
        {/* Dynamic Hero Section */}
        <section className="relative h-[90vh] flex items-center justify-center overflow-hidden pt-20">
          {/* Background Image / Pattern */}
          <div className="absolute inset-0 z-0">
            <img
              src="/chinese_landscape.png"
              alt="Landscape"
              className="w-full h-full object-cover opacity-15 grayscale scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#FFF1CA]/20 via-transparent to-[#FFF1CA]"></div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-1/4 left-10 opacity-20 hidden lg:block rotate-12">
            <img src="/dragon.svg" alt="" className="w-96" />
          </div>

          <div className="relative z-10 text-center px-4 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="space-y-6"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-px h-12 bg-[#850A0A]"></div>
                <span className="text-[#850A0A] font-black tracking-[0.5em] uppercase text-xs">
                  Since 1994 • Authentic Sichuan
                </span>
              </div>

              <h1 className="text-[#850A0A] text-7xl md:text-9xl font-black tracking-tighter leading-none uppercase">
                WuYang <br />
                <span className="text-4xl md:text-6xl font-normal italic lowercase tracking-widest text-[#B8860B] block mt-4">
                  The art of the boil
                </span>
              </h1>

              <div className="flex flex-col items-center gap-8 pt-8">
                <p className="text-gray-800 text-lg md:text-xl font-medium max-w-2xl mx-auto italic opacity-80 leading-relaxed font-serif">
                  "A single table that united the world through the shared warmth of authentic flavors and extraordinary hospitality."
                </p>

                <div className="flex flex-wrap justify-center gap-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileActive={{ scale: 0.95 }}
                    className="px-12 py-4 bg-[#850A0A] text-white font-black tracking-[0.2em] uppercase text-sm shadow-2xl rounded-none relative overflow-hidden group"
                  >
                    <span className="relative z-10">Explore Menu</span>
                    <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileActive={{ scale: 0.95 }}
                    className="px-12 py-4 border-2 border-[#850A0A] text-[#850A0A] font-black tracking-[0.2em] uppercase text-sm group relative overflow-hidden"
                  >
                    <span className="relative z-10 transition-colors group-hover:text-white">Our Heritage</span>
                    <div className="absolute inset-0 bg-[#850A0A] -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Extreme Bottom Decorative Clouds */}
          <div className="absolute bottom-0 left-0 w-full flex justify-between opacity-20 pointer-events-none">
            <img src="/cloud.svg" alt="" className="w-80 md:w-[30%] -translate-y-10" />
            <img src="/cloud2.svg" alt="" className="w-80 md:w-[30%] translate-y-10 rotate-180" />
          </div>
        </section>

        {/* Featured Selection Header Divider */}
        <div className="py-20 flex flex-col items-center justify-center gap-4 bg-[#FFF1CA]">
          <div className="w-0.5 h-20 bg-gradient-to-b from-[#850A0A] to-transparent"></div>
          <div className="w-4 h-4 rotate-45 border border-[#850A0A]"></div>
        </div>

        <OfferSection />

        <div className="py-24">
          <AboutAndFeatures />
        </div>

        <div className="bg-[#850A0A]/5 py-24">
          <RestaurantTimeline />
        </div>

        <LocationSection />

        {/* Secondary Banner with Parallax-like effect */}
        <div className="relative h-[60vh] overflow-hidden group">
          <img
            src="./banner.jpg"
            alt="Banner"
            className="w-full h-full object-cover transition-transform duration-[20000ms] group-hover:scale-125"
          />
          <div className="absolute inset-0 bg-[#850A0A]/40 flex items-center justify-center">
            <div className="text-center p-8 border border-white/20 backdrop-blur-sm max-w-2xl">
              <h3 className="text-white text-4xl font-black uppercase tracking-[0.3em] mb-4">Taste the Legacy</h3>
              <p className="text-white/80 italic text-lg tracking-widest font-serif">Experience the warmth of a thousand years in every single broth.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
