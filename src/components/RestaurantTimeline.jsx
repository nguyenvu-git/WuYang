import React from "react";

const RestaurantTimeline = () => {
  const milestones = [
    {
      year: "1998",
      title: "Khởi Nguồn Tổ Nghiệp",
      desc: "Wu Yang bắt đầu từ một xe đẩy Dimsum nhỏ tại phố cổ, mang theo bí quyết gia truyền về hương vị ẩm thực Quảng Đông thuần túy.",
    },
    {
      year: "2005",
      title: "Khai Trương Đại Lầu",
      desc: "Nhà hàng đầu tiên chính thức tọa lạc tại trung tâm thành phố, khẳng định vị thế với phong cách kiến trúc cung đình đặc trưng.",
    },
    {
      year: "2012",
      title: "Tinh Hoa Hội Tụ",
      desc: "Đón nhận danh hiệu đầu bếp hạng nhất quốc gia. Ra mắt thực đơn 'Bát Đại Danh Thái' kết hợp phong vị hiện đại và truyền thống.",
    },
    {
      year: "2021",
      title: "Vươn Tầm Quốc Tế",
      desc: "Mở rộng hệ thống với 23 chi nhánh, trở thành điểm đến biểu tượng cho những ai tìm kiếm trải nghiệm ẩm thực Trung Hoa đích thực.",
    },
  ];

  return (
    <section className="bg-[#850A0A] py-24 px-6 relative overflow-hidden mt-10 sm:mt-30">
      {/* Họa tiết hoa văn mây hoặc rồng chìm bên dưới (Nếu có ảnh hãy thay vào src) */}
      <div className="absolute inset-0 opacity-5 pointer-events-none flex justify-center items-center">
        {/* <img src="./dragon-bg-red.png" className="w-[50%] object-contain" /> */}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Đường line kết nối các mốc thời gian */}
        <div className="hidden md:block absolute top-[4.5rem] left-0 w-full h-[1px] border-t border-dashed border-[#FFF1CA]/40"></div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {milestones.map((item, index) => (
            <div key={index} className="relative group">
              {/* Điểm nhấn mốc thời gian (Hình thỏi vàng hoặc biểu tượng cổ) */}
              <div className="flex flex-col items-center md:items-start">
                <div className="w-12 h-2 bg-[#FFF1CA] mb-8 relative z-20 shadow-[0_0_10px_rgba(255,241,202,0.5)]">
                  {/* Hiệu ứng trang trí nhỏ tại điểm mốc */}
                  <div className="absolute -top-1 -left-1 w-14 h-4 border border-[#FFF1CA]/30"></div>
                </div>

                <h3 className="text-[#FFF1CA] text-5xl font-['Gang_of_Three'] mb-4 tracking-wider group-hover:scale-110 transition-transform duration-300">
                  {item.year}
                </h3>

                <h4 className="text-[#FFF1CA] font-['Unbounded'] font-bold text-lg mb-3 uppercase tracking-tight">
                  {item.title}
                </h4>

                <p className="text-[#FFF1CA]/80 font-['Unbounded'] text-sm leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RestaurantTimeline;
