import React from "react";
import { formatPrice } from "../../utils/format";
import CartItem from "./CartItem";

const CartContent = ({
  cartItems,
  displayTable,
  cartTotal,
  submittingOrder,
  serviceLoading,
  checkoutLoading,
  isTokenValid,
  onSubmitOrder,
  onClearCart,
  onChangeQuantity,
  onChangeNote,
  onCallService,
  onCheckoutPreview,
}) => {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#8B0000] to-[#B22222] text-[#F5D7A0] px-5 py-4 flex items-center justify-between shadow-md">
        <div>
          <p className="text-xs uppercase tracking-widest opacity-80 font-serif">
            Bàn của bạn
          </p>
          <p className="text-2xl font-serif font-bold">{displayTable}</p>
        </div>
        <div className="text-right">
          <p className="font-serif font-bold text-lg">海底捞</p>
          <p className="text-[10px] uppercase tracking-wider opacity-80">
            WuYang
          </p>
        </div>
      </div>

      {/* Items list */}
      <div className="flex-1 overflow-y-auto p-4 bg-[#FDFBF7]">
        <div className="flex items-center justify-between mb-3 border-b border-[#E8D5B5] pb-2">
          <p className="text-sm font-bold text-[#8B0000] uppercase tracking-wide">
            Giỏ món ({cartItems.length})
          </p>
          {cartItems.length > 0 && (
            <button
              onClick={onClearCart}
              className="text-xs text-gray-500 hover:text-red-600 transition-colors"
            >
              Xóa tất cả
            </button>
          )}
        </div>

        <div className="space-y-3">
          {cartItems.length === 0 ? (
            <div className="text-center py-10 opacity-50">
              <img
                src="/assets/categories/default.png"
                alt="Empty"
                className="w-16 h-16 mx-auto mb-2 grayscale"
              />
              <p className="text-sm font-serif">Chưa có món nào được chọn</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <CartItem
                key={item.ProductID}
                item={item}
                onChangeQuantity={onChangeQuantity}
                onChangeNote={onChangeNote}
              />
            ))
          )}
        </div>
      </div>

      {/* Footer actions */}
      <div className="p-4 bg-white border-t border-[#E8D5B5] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-bold text-gray-600">Tạm tính:</span>
          <span className="text-xl font-bold text-[#A00000]">
            {formatPrice(cartTotal)}
          </span>
        </div>

        <button
          onClick={onSubmitOrder}
          disabled={!cartItems.length || submittingOrder}
          className={`w-full py-3.5 rounded-xl font-bold text-sm uppercase tracking-wide transition-all shadow-md active:scale-95 mb-3 ${!cartItems.length || submittingOrder
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-[#A00000] to-[#C1121F] text-[#F5D7A0]"
            }`}
        >
          {submittingOrder ? "Đang truyền lệnh..." : "Gửi món xuống bếp"}
        </button>

        <div className="grid grid-cols-3 gap-2 mb-3">
          {["Thêm đá", "Khăn lạnh", "Gọi phục vụ"].map((label) => (
            <button
              key={label}
              disabled={serviceLoading}
              onClick={() => onCallService(label)}
              className="text-[11px] py-2 rounded-lg border border-[#A00000] text-[#A00000] font-bold active:bg-[#A00000] active:text-[#F5D7A0] transition-colors"
            >
              {label}
            </button>
          ))}
        </div>

        <button
          onClick={onCheckoutPreview}
          disabled={checkoutLoading || !isTokenValid}
          className={`w-full py-3 rounded-xl border-2 font-bold text-sm uppercase tracking-wide transition-all ${!isTokenValid
              ? "bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed"
              : "bg-[#FDFBF7] border-[#D4AF37] text-[#8B0000] active:bg-[#D4AF37] active:text-white"
            }`}
        >
          {checkoutLoading
            ? "Đang xử lý..."
            : !isTokenValid
              ? "Đã thanh toán"
              : "Yêu cầu thanh toán"}
        </button>
      </div>
    </div>
  );
};

export default CartContent;
