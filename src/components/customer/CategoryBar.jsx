import React from "react";

const categoryImages = {
  "Tất cả": "/all.png",
  Lẩu: "/lau.png",
  Heo: "/heo.png",
  Cừu: "/cuu.png",
  "Nội tạng": "/noitang.png",
  "Hải sản": "/haisan.png",
  "Rau & nấm": "/rau.png",
  "Há cảo & sủi ": "/hacao.png",
  Rau: "/rau.png",
  Mỳ: "/my.png",
  Bò: "/bo.png",
  default: "/assets/categories/default.png",
};

const CategoryBar = ({ categories, activeCategory, onSelectCategory }) => {
  return (
    <div className="flex overflow-x-auto pb-6 no-scrollbar gap-4 sm:gap-6 snap-x snap-mandatory p-2">
      {categories.map((category) => {
        const imgSrc =
          categoryImages[category.CategoryName] || categoryImages["default"];
        const isActive = activeCategory === category.CategoryID;
        return (
          <div
            key={category.CategoryID}
            onClick={() => onSelectCategory(category.CategoryID)}
            className="snap-start shrink-0 flex flex-col items-center cursor-pointer group"
          >
            <div
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full p-1 transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-br from-[#A00000] to-[#D4AF37] shadow-lg scale-110"
                  : "bg-transparent group-hover:bg-[#E8D5B5]"
              }`}
            >
              <img
                src={imgSrc}
                alt={category.CategoryName}
                className="w-full h-full object-cover rounded-full border-2 border-white"
              />
            </div>
            <span
              className={`text-[11px] sm:text-sm mt-3 font-medium text-center w-20 line-clamp-2 ${
                isActive ? "font-bold text-[#8B0000]" : "text-gray-600"
              }`}
            >
              {category.CategoryName}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryBar;
