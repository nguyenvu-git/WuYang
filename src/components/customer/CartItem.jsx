import React from "react";
import { formatPrice } from "../../utils/format";

const CartItem = ({ item, onChangeQuantity, onChangeNote }) => {
  return (
    <div className="flex flex-col bg-white rounded-xl p-3 shadow-sm border border-[#F0E6D2] gap-2">
      <div className="flex items-center justify-between">
        <div className="flex-1 pr-2">
          <p className="text-sm font-bold text-gray-800 line-clamp-1">
            {item.ProductName}
          </p>
          <p className="text-xs font-bold text-[#A00000] mt-1">
            {formatPrice(item.Price)}
          </p>
        </div>
        <div className="flex items-center gap-3 bg-[#FDFBF7] p-1 rounded-lg border border-[#E8D5B5]">
          <button
            onClick={() => onChangeQuantity(item.ProductID, -1)}
            className="w-6 h-6 flex items-center justify-center text-[#8B0000] font-bold text-lg leading-none active:scale-90"
          >
            -
          </button>
          <span className="text-sm font-bold w-4 text-center">
            {item.quantity}
          </span>
          <button
            onClick={() => onChangeQuantity(item.ProductID, 1)}
            className="w-6 h-6 flex items-center justify-center text-[#8B0000] font-bold text-lg leading-none active:scale-90"
          >
            +
          </button>
        </div>
      </div>
      <input
        type="text"
        placeholder="Ghi chú (vd: ít cay, không hành...)"
        className="w-full text-xs p-2 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#E8D5B5] focus:outline-none focus:ring-1 focus:ring-[#A00000]/20 transition-all placeholder:text-gray-400"
        value={item.Note || ""}
        onChange={(e) => onChangeNote(item.ProductID, e.target.value)}
      />
    </div>
  );
};

export default CartItem;
