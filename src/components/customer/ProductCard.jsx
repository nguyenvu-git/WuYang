import React from "react";
import { formatPrice } from "../../utils/format";

const ProductCard = ({ item, isTokenValid, onAddToCart }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-[#F0E6D2] overflow-hidden flex flex-col group">
      <div className="relative overflow-hidden aspect-w-4 aspect-h-3">
        <img
          src={item.ImageURL || "/assets/default-food.png"}
          alt={item.ProductName}
          className="w-full h-36 sm:h-44 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="p-4 flex-1 flex flex-col justify-between">
        <h3 className="font-bold text-gray-800 text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-[#A00000] transition-colors">
          {item.ProductName}
        </h3>
        <div className="flex items-end justify-between mt-4">
          <p className="text-[#A00000] font-black text-base sm:text-lg">
            {formatPrice(item.Price)}
          </p>
          {!isTokenValid || item.IsAvailable == 0 ? (
            <div className="text-[10px] sm:text-xs text-gray-400 font-bold border border-gray-200 px-2 py-1 rounded bg-gray-50 uppercase tracking-tighter">
              {item.IsAvailable == 0 ? "Hết món" : "Đã đóng"}
            </div>
          ) : (
            <button
              onClick={() => onAddToCart(item)}
              className="bg-[#FFF8ED] text-[#A00000] border border-[#F5D7A0] w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#A00000] hover:text-[#F5D7A0] hover:border-transparent active:scale-90 transition-all shadow-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
