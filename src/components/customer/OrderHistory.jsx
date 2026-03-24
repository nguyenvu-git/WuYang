import React from "react";
import { formatPrice } from "../../utils/format";

const statusConfig = {
  Pending:  { label: "Chờ bếp",   color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  Cooking:  { label: "Đang nấu",  color: "bg-orange-100 text-orange-700 border-orange-200" },
  Served:   { label: "Đã phục vụ", color: "bg-green-100 text-green-700 border-green-200"  },
  Cancelled:{ label: "Đã huỷ",   color: "bg-gray-100 text-gray-500 border-gray-200"       },
};

const OrderHistory = ({ orderItems }) => {
  if (!orderItems || orderItems.length === 0) return null;

  const total = orderItems.reduce(
    (sum, item) => sum + Number(item.PriceAtTime || 0) * Number(item.Quantity || 1),
    0,
  );

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-bold text-[#8B0000] uppercase tracking-wide">
          Lịch sử gọi món
        </h2>
        <span className="text-xs text-gray-500 font-medium">
          {orderItems.length} món
        </span>
      </div>

      <div className="space-y-2">
        {orderItems.map((item) => {
          const sc = statusConfig[item.ItemStatus] || statusConfig["Pending"];
          return (
            <div
              key={item.OrderItemID}
              className="flex items-center justify-between bg-white rounded-xl px-3 py-2.5 border border-[#F0E6D2] shadow-sm"
            >
              <div className="flex-1 min-w-0 pr-2">
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {item.ProductName}
                </p>
                {item.Note ? (
                  <p className="text-[11px] text-gray-400 italic truncate">
                    📝 {item.Note}
                  </p>
                ) : null}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs text-gray-500">x{item.Quantity}</span>
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${sc.color}`}
                >
                  {sc.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tổng tiền */}
      {total > 0 && (
        <div className="mt-3 flex justify-between items-center bg-[#FFF8ED] rounded-xl px-4 py-3 border border-[#E8D5B5]">
          <span className="text-sm font-bold text-gray-600">Tạm tính đã gọi:</span>
          <span className="text-base font-black text-[#A00000]">
            {formatPrice(total)}
          </span>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
