// import {
//   Facebook,
//   Instagram,
//   Youtube,
//   MapPin,
//   Mail,
//   Clock,
//   ShieldCheck,
// } from "lucide-react";

// const Footer = () => {
//   return (
//     <footer className="bg-[#121212] text-gray-400 pt-16 pb-6 relative overflow-hidden">
//       {/* Nền họa tiết kỷ hà chìm */}
//       <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')]"></div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
//           {/* Cột 1: About */}
//           <div className="space-y-6">
//             <div className="flex items-center gap-2 border-l-4 border-red-700 pl-4">
//               <h3 className="text-white font-serif text-2xl font-bold tracking-widest">
//                 海底捞
//               </h3>
//               <span className="text-xs text-yellow-600 self-end mb-1 italic">
//                 HOTPOT
//               </span>
//             </div>
//             <p className="text-sm leading-relaxed pr-4">
//               Hơn cả một bữa ăn, chúng tôi mang đến nghệ thuật phục vụ tận tâm
//               và hương vị lẩu truyền thống tinh túy từ năm 1994.
//             </p>
//             <div className="flex gap-4">
//               <a
//                 href="#"
//                 className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-red-800 hover:border-red-800 transition-all group"
//               >
//                 <Facebook size={18} className="group-hover:text-white" />
//               </a>
//               <a
//                 href="#"
//                 className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-red-800 hover:border-red-800 transition-all group"
//               >
//                 <Instagram size={18} className="group-hover:text-white" />
//               </a>
//               <a
//                 href="#"
//                 className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-red-800 hover:border-red-800 transition-all group"
//               >
//                 <Youtube size={18} className="group-hover:text-white" />
//               </a>
//             </div>
//           </div>

//           {/* Cột 2: Quick Links */}
//           <div>
//             <h4 className="text-white font-bold text-sm uppercase tracking-[0.2em] mb-8 relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-10 after:h-[2px] after:bg-yellow-600">
//               Khám Phá
//             </h4>
//             <ul className="space-y-4 text-sm">
//               <li>
//                 <a
//                   href="#"
//                   className="hover:text-yellow-500 transition-colors flex items-center gap-2"
//                 >
//                   Câu chuyện thương hiệu
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#"
//                   className="hover:text-yellow-500 transition-colors flex items-center gap-2"
//                 >
//                   Chính sách chất lượng
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#"
//                   className="hover:text-yellow-500 transition-colors flex items-center gap-2"
//                 >
//                   Đặc quyền thành viên
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#"
//                   className="hover:text-yellow-500 transition-colors flex items-center gap-2"
//                 >
//                   Tin tức ưu đãi
//                 </a>
//               </li>
//             </ul>
//           </div>

//           {/* Cột 3: Contact Info */}
//           <div>
//             <h4 className="text-white font-bold text-sm uppercase tracking-[0.2em] mb-8 relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-10 after:h-[2px] after:bg-yellow-600">
//               Liên Hệ
//             </h4>
//             <ul className="space-y-5 text-sm">
//               <li className="flex gap-4 items-start">
//                 <MapPin size={20} className="text-red-700 shrink-0" />
//                 <span>
//                   Trụ sở: TTTM Gigamall, Phạm Văn Đồng, TP. Thủ Đức, HCM
//                 </span>
//               </li>
//               <li className="flex gap-4 items-center">
//                 <Clock size={18} className="text-red-700 shrink-0" />
//                 <span>09:00 AM - 02:00 AM</span>
//               </li>
//               <li className="flex gap-4 items-center">
//                 <Mail size={18} className="text-red-700 shrink-0" />
//                 <span>support@haidilaovn.com</span>
//               </li>
//             </ul>
//           </div>

//           {/* Cột 4: Newsletter */}
//           <div>
//             <h4 className="text-white font-bold text-sm uppercase tracking-[0.2em] mb-8 relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-10 after:h-[2px] after:bg-yellow-600">
//               Đăng Ký
//             </h4>
//             <p className="text-xs mb-4 italic">
//               Nhận ngay mã ưu đãi 10% cho lần đầu trải nghiệm tại web.
//             </p>
//             <div className="flex flex-col gap-2">
//               <input
//                 type="email"
//                 placeholder="Email/SĐT của bạn"
//                 className="bg-zinc-900 border border-zinc-800 p-3 text-sm focus:outline-none focus:border-red-700 transition-all"
//               />
//               <button className="bg-red-800 text-white py-3 text-xs font-bold uppercase tracking-widest hover:bg-red-700 shadow-lg">
//                 Gửi Ngay
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] tracking-[0.1em] text-zinc-500 uppercase font-medium">
//           <p>© 2026 HAIDILAO VIETNAM. ALL RIGHTS RESERVED.</p>
//           <div className="flex items-center gap-6">
//             <span className="flex items-center gap-1">
//               <ShieldCheck size={12} /> An toàn thực phẩm
//             </span>
//             <a href="#" className="hover:text-white transition-colors">
//               Privacy Policy
//             </a>
//             <a href="#" className="hover:text-white transition-colors">
//               Terms of Use
//             </a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#850A0A] py-16 px-6 md:px-12 font-['Unbounded'] relative overflow-hidden mt-55">
      {/* Họa tiết hoa văn mây chìm trang trí phía trên footer */}
      <div className="absolute top-0 left-0 w-full opacity-10 pointer-events-none">
        <img
          src="./border_top.svg"
          className="w-full h-8 object-cover"
          alt=""
        />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 items-start">
        {/* CỘT 1: LOGO */}
        <div className="flex justify-center md:justify-start">
          <div className="relative group">
            {/* Ảnh Logo - Thay link của bạn vào đây */}
            <img
              src="logo.svg"
              alt="Wu Yang Logo"
              className="w-32 h-32 md:w-40 md:h-40 object-contain"
            />
            {/* Vạch kẻ dọc trang trí bên cạnh logo trên desktop */}
            <div className="hidden lg:block absolute -right-6 top-1/2 -translate-y-1/2 w-[1px] h-32 bg-[#FFF1CA]/30"></div>
          </div>
        </div>

        {/* CỘT 2: ADDRESS */}
        <div className="text-center md:text-left text-[#FFF1CA]">
          <h4 className="font-['Gang_of_Three'] text-xl mb-6 uppercase tracking-widest">
            Address
          </h4>
          <div className="space-y-2 opacity-90 text-sm leading-relaxed">
            <p>London, SW1A 1AA</p>
            <p>123 High Street, Unit 6</p>
          </div>
        </div>

        {/* CỘT 3: OPENING HOURS */}
        <div className="text-center md:text-left text-[#FFF1CA]">
          <h4 className="font-['Gang_of_Three'] text-xl mb-6 uppercase tracking-widest">
            Opening Hours
          </h4>
          <div className="space-y-2 opacity-90 text-sm">
            <p>Mon-Fri 10:00-23:00</p>
            <p>Sat-Sun 09:00-21:00</p>
          </div>
        </div>

        {/* CỘT 4: CONTACT & FOLLOW */}
        <div className="text-center md:text-left text-[#FFF1CA]">
          <h4 className="font-['Gang_of_Three'] text-xl mb-6 uppercase tracking-widest">
            Contact
          </h4>
          <div className="space-y-2 opacity-90 text-sm mb-8">
            <p>234-09-4532</p>
            <p>info@wuyang.com</p>
          </div>
        </div>

        <div className="text-center md:text-left text-[#FFF1CA]">
          <h4 className="font-['Gang_of_Three'] text-xl mb-6 uppercase tracking-widest">
            Follow
          </h4>
          <div className="flex justify-center md:justify-start gap-6 items-center">
            {/* Thay link mạng xã hội của bạn vào href */}
            <a href="#" className="hover:scale-110 transition-transform">
              <img src="./ig.svg" alt="" />
            </a>
            <a href="#" className="hover:scale-110 transition-transform">
              <img src="./yt.svg" alt="" />
            </a>
            <a href="#" className="hover:scale-110 transition-transform">
              <img src="./fb.svg" alt="" className="w-6"/>
            </a>
          </div>
        </div>
      </div>

      {/* Dòng bản quyền dưới cùng */}
      <div className="mt-16 pt-8 border-t border-[#FFF1CA]/10 text-center text-[#FFF1CA]/40 text-[10px] uppercase tracking-widest font-light">
        © 2026 Wu Yang Restaurant. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
