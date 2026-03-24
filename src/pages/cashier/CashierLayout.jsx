// import React, { useState } from "react";
// import { Outlet } from "react-router-dom"; // Outlet là nơi nội dung trang con sẽ hiển thị
// import Sidebar from "../../components/cashier/Sidebar";
// import { Menu } from "lucide-react";
// import TableManagement from "./TableManagement";
// const CashierLayout = () => {
//   const [isSidebarOpen, setSidebarOpen] = useState(true);

//   return (
//     <div className="flex min-h-screen" style={{ backgroundColor: "#FFF1CA" }}>
//       {/* Sidebar chỉ xuất hiện 1 lần duy nhất ở đây */}
//       <Sidebar
//         isOpen={isSidebarOpen}
//         toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
//       />

//       <div className="flex-1 flex flex-col min-w-0">
//         {/* Header cũng chỉ cần 1 cái ở đây */}
//         <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6 border-b-4 border-[#9F1514]">
//           <button
//             onClick={() => setSidebarOpen(!isSidebarOpen)}
//             className="p-2 text-[#850A0A]"
//           >
//             <Menu size={24} />
//           </button>
//           <div className="font-bold text-[#850A0A]">HỆ THỐNG LONG PHỤNG</div>
//         </header>

//         {/* NỘI DUNG THAY ĐỔI NẰM Ở ĐÂY */}
//         <main className="p-6">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default CashierLayout;
