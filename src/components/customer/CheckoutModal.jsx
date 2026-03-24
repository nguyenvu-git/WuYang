import React from "react";
import { formatPrice } from "../../utils/format";

const CheckoutModal = ({
  checkoutPreview,
  displayTable,
  checkoutLoading,
  onConfirm,
  onClose,
}) => {
  if (!checkoutPreview) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md bg-[#FDFBF7] rounded-2xl shadow-2xl overflow-hidden border border-[#D4AF37]">
        <div className="bg-gradient-to-r from-[#8B0000] to-[#B22222] text-[#F5D7A0] px-5 py-4 text-center relative">
          <h2 className="text-xl font-serif font-bold tracking-widest uppercase">
            Hóa Đơn
          </h2>
          <p className="text-sm opacity-90">Bàn {displayTable}</p>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#F5D7A0] hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-4 text-gray-800">
          <div className="flex justify-between border-b border-dashed border-[#E8D5B5] pb-2">
            <span>Tiền món:</span>
            <span className="font-bold">
              {formatPrice(checkoutPreview.subtotal || 0)}
            </span>
          </div>
          <div className="flex justify-between border-b border-dashed border-[#E8D5B5] pb-2">
            <span>Thuế (VAT):</span>
            <span className="font-bold">
              {formatPrice(checkoutPreview.vat || 0)}
            </span>
          </div>
          <div className="flex justify-between border-b border-solid border-[#D4AF37] pb-4">
            <span>Phí phục vụ:</span>
            <span className="font-bold">
              {formatPrice(checkoutPreview.service_fee || 0)}
            </span>
          </div>
          <div className="flex justify-between items-end">
            <span className="font-bold text-lg">TỔNG CỘNG:</span>
            <span className="font-black text-2xl text-[#A00000]">
              {formatPrice(checkoutPreview.total || 0)}
            </span>
          </div>
          <button
            onClick={onConfirm}
            disabled={checkoutLoading}
            className="w-full mt-4 py-3.5 rounded-xl bg-gradient-to-r from-[#A00000] to-[#C1121F] text-[#F5D7A0] font-bold uppercase tracking-wide active:scale-95 shadow-lg"
          >
            {checkoutLoading ? "Đang xử lý..." : "Xác nhận yêu cầu"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
