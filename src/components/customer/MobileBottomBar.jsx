import React from "react";
import { formatPrice } from "../../utils/format";

const MobileBottomBar = ({ cartItems, cartTotal, isTokenValid, onOpenCart }) => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-[#E8D5B5] p-3 px-4 flex justify-between items-center shadow-[0_-10px_20px_rgba(0,0,0,0.05)] z-40">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-12 h-12 bg-[#FFF8ED] rounded-full flex items-center justify-center border border-[#F5D7A0]">
            <svg className="w-6 h-6 text-[#A00000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
              {cartItems.length}
            </span>
          )}
        </div>
        <div>
          <p className="text-xs text-gray-500 font-medium">Tổng cộng</p>
          <p className="text-lg font-black text-[#A00000]">
            {formatPrice(cartTotal)}
          </p>
        </div>
      </div>

      {!isTokenValid ? (
        <button
          disabled
          className="bg-gray-300 text-gray-500 px-6 py-3 rounded-xl font-bold uppercase tracking-wide text-sm shadow-md cursor-not-allowed"
        >
          Đã thanh toán
        </button>
      ) : (
        <button
          onClick={onOpenCart}
          className="bg-gradient-to-r from-[#8B0000] to-[#C1121F] text-[#F5D7A0] px-6 py-3 rounded-xl font-bold uppercase tracking-wide text-sm shadow-md active:scale-95"
        >
          Xem đơn
        </button>
      )}
    </div>
  );
};

export default MobileBottomBar;
