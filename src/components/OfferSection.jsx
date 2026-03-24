import React from "react";
import { motion } from "framer-motion";

const OfferSection = () => {
  const offers = [
    {
      id: 1,
      name: "Dim Sum Treasures",
      description: "Hand-crafted shrimp hargao and pork sui mai.",
      price: "159,000",
      image: "./kung.svg",
      tag: "Best Seller"
    },
    {
      id: 2,
      name: "Signature Wok",
      description: "Tender beef with traditional savory black bean sauce.",
      price: "245,000",
      image: "./dumpl.svg",
      tag: "Chef's Choice"
    },
    {
      id: 3,
      name: "Imperial Brews",
      description: "Fine selection of aged jasmine and oolong teas.",
      price: "85,000",
      image: "./chow.svg",
      tag: "Signature"
    }
  ];

  return (
    <section className="relative py-24 px-4 overflow-hidden bg-[#FFF1CA]">
      {/* Background Silk Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none grayscale"
        style={{ 
          backgroundImage: "url('/chinese_bg_pattern.png')",
          backgroundSize: "300px",
          backgroundRepeat: "repeat"
        }}
      />

      {/* Decorative Lanterns */}
      <div className="absolute left-0 top-0 opacity-40 hidden lg:block">
        <img src="./ldl.svg" alt="" className="w-32" />
      </div>
      <div className="absolute right-0 top-0 opacity-40 hidden lg:block">
        <img src="./ldr.svg" alt="" className="w-32" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 relative">
          {/* Traditional Seal Decoration */}
          <div className="flex justify-center mb-10">
            <div className="w-12 h-14 bg-[#850A0A] flex items-center justify-center text-white font-bold text-xs ring-2 ring-offset-4 ring-[#850A0A] rotate-3 shadow-md">
              <span className="[writing-mode:vertical-rl] tracking-widest text-[10px]">海底捞</span>
            </div>
          </div>
          
          <h2 className="text-[#850A0A] text-4xl md:text-5xl font-black tracking-[0.2em] uppercase mb-4 font-serif">
            Signature Selections
          </h2>
          <div className="flex items-center justify-center gap-4 opacity-50">
            <div className="h-px w-16 bg-[#B8860B]"></div>
            <p className="text-[#850A0A] font-medium italic tracking-wide">Culinary Excellence in Every Bite</p>
            <div className="h-px w-16 bg-[#B8860B]"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group relative"
            >
              {/* Card Container with Parchment Texture */}
              <div 
                className="relative bg-[#FDFBF7] p-8 border-y-4 border-[#850A0A] shadow-xl transition-transform duration-500 hover:-translate-y-2 overflow-hidden"
                style={{
                  backgroundImage: "url('/chinese_parchment.png')",
                  backgroundSize: "cover"
                }}
              >
                {/* Decorative Gold Lattice Corners (CSS approach) */}
                <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#B8860B]/40"></div>
                <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#B8860B]/40"></div>
                <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#B8860B]/40"></div>
                <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#B8860B]/40"></div>

                {/* Offer Tag - Styled as a Traditional Stamp */}
                <div className="absolute top-4 right-4 bg-[#850A0A] text-white text-[10px] font-bold px-2 py-1 rotate-6 shadow-sm z-20">
                  {offer.tag}
                </div>

                {/* Circular Image Frame */}
                <div className="flex justify-center mb-6">
                  <div className="w-48 h-48 rounded-full border-8 border-[#FDFBF7] shadow-inner overflow-hidden bg-white/50 relative">
                    {/* Ring decoration */}
                    <div className="absolute inset-2 rounded-full border border-[#B8860B]/20"></div>
                    <img 
                      src={offer.image} 
                      alt={offer.name} 
                      className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="text-[#850A0A] text-xl font-bold font-serif mb-2 tracking-wide uppercase">
                    {offer.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-6 leading-relaxed italic">
                    {offer.description}
                  </p>
                  
                  <div className="pt-4 border-t border-[#B8860B]/20 flex flex-col items-center">
                    <span className="text-[#850A0A] text-2xl font-black mb-4">
                      {offer.price} VNĐ
                    </span>
                    <button className="w-full bg-[#850A0A] text-[#FFF1CA] py-3 font-bold tracking-[0.2em] transform transition-all active:scale-95 group-hover:shadow-[0_0_20px_rgba(133,10,10,0.3)]">
                      ORDER NOW
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Call to Action */}
        <div className="mt-20 text-center">
          <button className="relative px-12 py-4 group overflow-hidden border-2 border-[#850A0A]">
            <span className="relative z-10 text-[#850A0A] group-hover:text-[#FFF1CA] font-black tracking-[0.3em] uppercase transition-colors duration-300">
              View Full Menu
            </span>
            <div className="absolute inset-0 bg-[#850A0A] -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
          </button>
        </div>
      </div>

      {/* Extreme Bottom Decorative Clouds */}
      <div className="absolute bottom-0 left-0 w-full flex justify-between opacity-10 pointer-events-none">
        <img src="/cloud.svg" alt="" className="w-64" />
        <img src="/cloud2.svg" alt="" className="w-64 rotate-180" />
      </div>
    </section>
  );
};

export default OfferSection;
