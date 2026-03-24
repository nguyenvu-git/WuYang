import React from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";

const News = () => {
  const newsItems = [
    {
      id: 1,
      name: "The Art of Sichuan Service",
      date: "MAR 20",
      year: "2024",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop",
      excerpt: "Deep dive into our signature hospitality and the training behind our legendary service team.",
      category: "CULTURE"
    },
    {
      id: 2,
      name: "Seasonal Hot Pot Specials",
      date: "MAR 15",
      year: "2024",
      image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=2071&auto=format&fit=crop",
      excerpt: "Discover the new spring-inspired broths infused with rare mountain herbs and fresh spices.",
      category: "CUISINE"
    },
    {
      id: 3,
      name: "Our Global Heritage",
      date: "MAR 05",
      year: "2024",
      image: "https://images.unsplash.com/photo-1541140134443-45a85532cd1b?q=80&w=2070&auto=format&fit=crop",
      excerpt: "From a single table to a global phenomenon—tracing the journey of authentic flavors.",
      category: "HISTORY"
    }
  ];

  return (
    <div className="bg-[#FFF1CA] min-h-screen font-serif">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-4 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none grayscale"
          style={{
            backgroundImage: "url('/chinese_landscape.png')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="w-px h-16 bg-[#850A0A]"></div>
            <h1 className="text-[#850A0A] text-6xl md:text-7xl font-black tracking-tight uppercase leading-none">
              WuYang <br /> <span className="text-4xl md:text-5xl font-normal italic tracking-widest text-[#B8860B]">Stories</span>
            </h1>
            <p className="text-[#850A0A] font-medium tracking-widest opacity-70 uppercase text-xs">
              Culture • Cuisine • Community
            </p>
          </motion.div>
        </div>
      </section>

      {/* News Grid */}
      <main className="max-w-7xl mx-auto px-4 pb-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {newsItems.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div
                className="relative bg-white p-6 shadow-2xl border border-[#850A0A]/10 transition-transform duration-500 group-hover:-translate-y-2"
                style={{
                  backgroundImage: "url('/chinese_parchment.png')",
                  backgroundSize: "cover"
                }}
              >
                {/* Traditional Decorative Corners */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[#850A0A]/30"></div>
                <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[#850A0A]/30"></div>
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-[#850A0A]/30"></div>
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-[#850A0A]/30"></div>

                {/* Date Stamp */}
                <div className="absolute top-0 right-10 -translate-y-1/2 flex flex-col items-center">
                  <div className="w-12 h-14 bg-[#850A0A] flex flex-col items-center justify-center text-white shadow-lg">
                    <span className="text-[10px] font-bold leading-tight">{item.date}</span>
                    <div className="w-4 h-[1px] bg-white/30 my-0.5"></div>
                    <span className="text-[8px] opacity-70">{item.year}</span>
                  </div>
                </div>

                {/* Image Frame */}
                <div className="overflow-hidden mb-6 h-64 border-b border-[#850A0A]/10">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  />
                </div>

                <div className="space-y-4">
                  <span className="inline-block text-[10px] font-black tracking-[0.2em] text-[#B8860B] uppercase">
                    {item.category}
                  </span>
                  <h2 className="text-[#850A0A] text-2xl font-bold leading-tight group-hover:text-[#6b0808] transition-colors">
                    {item.name}
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed italic line-clamp-3">
                    {item.excerpt}
                  </p>

                  <div className="pt-4 flex items-center gap-2 group-hover:gap-4 transition-all">
                    <span className="text-xs font-bold text-[#850A0A] uppercase tracking-widest">Read Story</span>
                    <div className="h-px flex-1 bg-[#850A0A]/20"></div>
                    <div className="w-2 h-2 rotate-45 border-t border-r border-[#850A0A]"></div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Floating Calligraphy or Decorative Clouds */}
        <div className="absolute -left-20 top-1/2 opacity-5 -translate-y-1/2 pointer-events-none hidden xl:block">
          <p className="[writing-mode:vertical-rl] text-[#850A0A] text-9xl font-black tracking-[1em]">海底捞</p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default News;
