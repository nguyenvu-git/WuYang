import React from "react";

const AboutAndFeatures = () => {
  return (
    <section className="relative w-full px-4 bg-[#FFF1CA] overflow-hidden">
      {/* NOTE: Ảnh Background con Rồng - Thay link của bạn vào src */}
      <div className="absolute inset-0 z-0 flex justify-center items-center pointer-events-none">
        <img
          src="./dragon.svg"
          alt="Dragon Background"
          className="object-contain"
        />
      </div>

      {/* NOTE: Ảnh Lồng Đèn trang trí góc - Thay link của bạn vào src */}
      <div className="w-full h-[2px] bg-red-600"></div>
      <div className="absolute left-4 top-0 z-10 hidden md:block">
        <img src="./lda.svg" alt="Lanterns" className="w-40" />
      </div>

      <div className="max-w-6xl mx-auto relative z-20 mt-8">
        {/* --- Phần About Us --- */}
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <h2 className="text-[#850A0A] text-5xl md:text-6xl font-['Gang_of_Three'] mb-8 tracking-widest uppercase">
            About Us
          </h2>
          <p className="text-[#850A0A] text-sm md:text-base font-['Unbounded'] font-medium leading-relaxed italic">
            Welcome! Wu Yang was established to offer the unique flavors of
            traditional Chinese cuisine. We carefully prepare each dish with our
            guests' taste preferences in mind. Our restaurant features a rich
            menu made with fresh, high-quality ingredients. From dim sum to a
            variety of noodles, from delicious wok-cooked dishes to special
            meals enriched with sweet and savory sauces, we provide a wide range
            of options. Each dish reflects the rich history and cultural
            heritage of Chinese cuisine.
          </p>
        </div>

        {/* --- Phần 4 Khung Features --- */}
        <img src="./abb.svg" alt="" className="w-full" />
      </div>
    </section>
  );
};

export default AboutAndFeatures;
