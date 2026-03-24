import React from "react";

const LocationSection = () => {
  const locations = [
    {
      name: "Wu Yang - Hoàn Kiếm",
      address: "12 Phố Cổ, Hoàn Kiếm, Hà Nội",
      phone: "024 3333 8888",
      type: "Đại Lầu (Main Flagship)",
    },
    {
      name: "Wu Yang - Tây Hồ",
      address: "68 Quảng An, Tây Hồ, Hà Nội",
      phone: "024 3333 9999",
      type: "Thủy Tạ (Lake View)",
    },
    {
      name: "Wu Yang - Quận 1",
      address: "88 Lê Lợi, Quận 1, TP. HCM",
      phone: "028 3333 6666",
      type: "Tửu Lầu (Dining & Bar)",
    },
  ];

  return (
    <section className="relative py-24 px-6 bg-[#FFF1CA] overflow-hidden">
      {/* Background hoa văn sóng nước/mây chìm */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <img
          src="./bg_offer.jpg"
          className="w-full h-full object-cover"
          alt=""
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-[#850A0A] text-5xl font-['Gang_of_Three'] text-center mb-16 uppercase tracking-widest">
          Hệ Thống Đại Lầu
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {locations.map((loc, index) => (
            <div key={index} className="group relative">
              {/* Thẻ bài gỗ (Wooden Plate) */}
              <div className="bg-[#850A0A] p-8 rounded-sm shadow-2xl transform transition-transform group-hover:-translate-y-2 duration-300 border-l-8 border-[#9F1514]">
                {/* Icon trang trí: Con dấu triện đỏ hoặc họa tiết lồng đèn */}
                <div className="absolute top-4 right-4 opacity-20">
                  <span className="text-4xl text-[#FFF1CA]">武</span>{" "}
                  {/* Chữ "Vũ" trong Wu Yang */}
                </div>

                <span className="text-[#FFF1CA]/60 font-['Unbounded'] text-[10px] uppercase tracking-tighter block mb-2">
                  {loc.type}
                </span>

                <h3 className="text-[#FFF1CA] font-['Unbounded'] font-bold text-xl mb-6 border-b border-[#FFF1CA]/20 pb-4">
                  {loc.name}
                </h3>

                <div className="space-y-4 font-['Unbounded'] text-sm text-[#FFF1CA]/90 font-light">
                  <div className="flex items-start gap-3">
                    <span className="text-[#FFF1CA]">📍</span>
                    <p>{loc.address}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[#FFF1CA]">📞</span>
                    <p>{loc.phone}</p>
                  </div>
                </div>

                {/* Nút chỉ đường phong cách cổ */}
                <button className="mt-8 w-full py-2 border border-[#FFF1CA] text-[#FFF1CA] font-['Unbounded'] text-xs hover:bg-[#FFF1CA] hover:text-[#850A0A] transition-colors uppercase">
                  Xem Bản Đồ
                </button>
              </div>

              {/* Dây treo thẻ bài (Trang trí thêm) */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-1 h-8 bg-[#5A0606] hidden lg:block"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
