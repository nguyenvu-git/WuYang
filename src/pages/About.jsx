import React from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";

const About = () => {
  const sections = [
    {
      id: "heritage",
      title: "Our Heritage",
      subtitle: "Imperial Roots",
      content: "Founded with a vision to bring authentic Sichuan flavors to the world, Haidilao began as a small table with a big dream. Our journey is paved with a commitment to quality and a passion for community.",
      image: "https://images.unsplash.com/photo-1541140134443-45a85532cd1b?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: "craft",
      title: "The Craft",
      subtitle: "Slow Broth, Bold Soul",
      content: "Our signature broths are simmered for 24 hours, blending over 30 traditional herbs and spices to achieve a depth of flavor that is both ancient and innovative.",
      image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=2071&auto=format&fit=crop"
    },
    {
      id: "hospitality",
      title: "Hospitality",
      subtitle: "Service as an Art",
      content: "At Haidilao, we believe dining is more than just food—it's an experience. Our legendary service is designed to make every guest feel like royalty in their own home.",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  return (
    <div className="bg-[#FFF1CA] min-h-screen font-serif text-[#850A0A]">
      <Header />

      {/* Hero Header */}
      <section className="pt-40 pb-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <p className="text-[20rem] font-black tracking-widest opacity-10 select-none">WuYang</p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-none mb-6">
            Legacy
          </h1>
          <div className="flex items-center justify-center gap-6">
            <div className="h-px w-24 bg-[#B8860B]"></div>
            <p className="text-xl md:text-2xl italic tracking-widest font-normal">Beyond the Boiling Pot</p>
            <div className="h-px w-24 bg-[#B8860B]"></div>
          </div>
        </motion.div>
      </section>

      {/* Narrative Sections */}
      <main className="max-w-7xl mx-auto px-4 space-y-32 pb-32">
        {sections.map((section, index) => (
          <motion.section
            key={section.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24`}
          >
            {/* Image Side */}
            <div className="w-full md:w-1/2 relative group">
              <div
                className="relative z-10 p-4 bg-white shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]"
                style={{
                  backgroundImage: "url('/chinese_parchment.png')",
                  backgroundSize: "cover"
                }}
              >
                <div className="absolute inset-0 border-[12px] border-white z-0"></div>
                <img
                  src={section.image}
                  alt={section.title}
                  className="w-full aspect-[4/5] object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                />

                {/* Traditional Border Decoration */}
                <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-[#B8860B] z-20"></div>
                <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-[#B8860B] z-20"></div>
              </div>

              {/* Backglow decoration */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-[#B8860B]/5 rounded-full blur-3xl -z-10"></div>
            </div>

            {/* Text Side */}
            <div className="w-full md:w-1/2 space-y-6">
              <div className="space-y-2">
                <span className="text-[#B8860B] font-bold tracking-[0.3em] uppercase text-xs">
                  {section.subtitle}
                </span>
                <h2 className="text-5xl md:text-6xl font-black tracking-tight leading-none uppercase italic">
                  {section.title}
                </h2>
              </div>

              <div className="w-16 h-1 bg-[#850A0A]"></div>

              <p className="text-lg md:text-xl font-medium leading-relaxed italic opacity-80">
                "{section.content}"
              </p>

              {/* Traditional Red Seal */}
              <div className="pt-8">
                <div className="w-10 h-10 bg-[#850A0A] flex items-center justify-center text-white font-bold text-[8px] rotate-12 shadow-md">
                  海底捞
                </div>
              </div>
            </div>
          </motion.section>
        ))}

        {/* Vision Timeline Section - Integrated as a section */}
        <section className="pt-20 text-center space-y-12">
          <div className="h-px w-full bg-[#850A0A]/10 max-w-2xl mx-auto"></div>
          <h2 className="text-4xl font-black uppercase tracking-[0.2em]">Our Global Reach</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { year: "1994", city: "Jianyang" },
              { year: "2012", city: "Singapore" },
              { year: "2013", city: "Los Angeles" },
              { year: "2024", city: "Worldwide" }
            ].map((milestone, idx) => (
              <div key={idx} className="space-y-2 p-6 border border-[#B8860B]/10 hover:border-[#B8860B]/40 transition-colors bg-[#FDFBF7]/50">
                <p className="text-[#B8860B] font-black text-2xl">{milestone.year}</p>
                <p className="uppercase tracking-widest text-xs font-bold">{milestone.city}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
