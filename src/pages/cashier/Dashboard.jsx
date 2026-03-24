// import React, { useEffect, useState } from "react";
// import Sidebar from "../../components/cashier/SidebarItem"; // Đảm bảo tên file đúng
// import { Menu, Bell } from "lucide-react";
// import { Outlet } from "react-router-dom"; // Import Outlet
// import { request } from "../../api/apiClient";

// const Dashboard = () => {
//   const [isSidebarOpen, setSidebarOpen] = useState(true);
//   const [notifications, setNotifications] = useState([]);
//   const [showNotiPanel, setShowNotiPanel] = useState(false);
//   const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

//   // Poll các yêu cầu dịch vụ từ khách
//   useEffect(() => {
//     let timer;
//     const loadNotifications = async () => {
//       try {
//         const data = await request("/notifications_list.php");
//         setNotifications(data || []);
//       } catch {
//         // bỏ qua lỗi để không làm vỡ màn hình thu ngân
//       }
//     };
//     loadNotifications();
//     timer = setInterval(loadNotifications, 8000);
//     return () => clearInterval(timer);
//   }, []);

//   const handleMarkNotificationRead = async (id) => {
//     try {
//       await request("/notifications_mark_read.php", {
//         method: "POST",
//         body: { id },
//       });
//       setNotifications((prev) => prev.filter((n) => n.NotificationID !== id));
//     } catch {
//       // có thể thêm alert nếu cần
//     }
//   };

//   return (
//     <div className="flex min-h-screen" style={{ backgroundColor: "#FFF1CA" }}>
//       <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

//       <div className="flex-1 flex flex-col min-w-0">
//         {/* Header cố định */}
//         <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6 border-b-4 border-[#9F1514]">
//           <button onClick={toggleSidebar} className="p-2 text-[#850A0A]">
//             <Menu size={24} />
//           </button>
//           <div className="flex items-center gap-4 relative">
//             {/* Nút chuông thông báo dịch vụ */}
//             <button
//               onClick={() => setShowNotiPanel((v) => !v)}
//               className="relative p-2 text-[#850A0A] rounded-full hover:bg-[#FFF1CA]"
//             >
//               <Bell size={22} />
//               {notifications.length > 0 && (
//                 <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] rounded-full bg-red-600 text-white text-[10px] flex items-center justify-center font-bold">
//                   {notifications.length}
//                 </span>
//               )}
//             </button>

//             {showNotiPanel && (
//               <div className="absolute right-16 top-12 w-80 max-h-80 overflow-auto bg-white border border-red-100 rounded-xl shadow-2xl z-50">
//                 <div className="px-3 py-2 border-b border-red-100 flex items-center justify-between">
//                   <p className="text-xs font-bold text-[#850A0A] uppercase">
//                     Yêu cầu dịch vụ
//                   </p>
//                   <button
//                     className="text-[11px] text-gray-500 hover:text-[#850A0A]"
//                     onClick={() => setShowNotiPanel(false)}
//                   >
//                     Đóng
//                   </button>
//                 </div>
//                 <div className="p-3 space-y-2">
//                   {notifications.length === 0 && (
//                     <p className="text-xs text-gray-400 italic">
//                       Hiện chưa có yêu cầu nào từ khách.
//                     </p>
//                   )}
//                   {notifications.map((n) => (
//                     <div
//                       key={n.NotificationID}
//                       className="border border-red-100 rounded-lg p-2 bg-[#FFF9F3] flex flex-col gap-1"
//                     >
//                       <div className="flex justify-between items-center">
//                         <span className="text-xs font-bold text-[#850A0A]">
//                           Bàn {n.TableID}
//                         </span>
//                         <span className="text-[10px] text-gray-400">
//                           {n.CreatedAt}
//                         </span>
//                       </div>
//                       <p className="text-xs text-gray-700">{n.Message}</p>
//                       <button
//                         onClick={() => handleMarkNotificationRead(n.NotificationID)}
//                         className="self-end mt-1 px-2 py-1 rounded-md bg-[#850A0A] text-[10px] text-[#FFF1CA] font-semibold active:scale-95"
//                       >
//                         Đã xử lý
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             <div className="hidden sm:block text-right">
//               <p className="text-xs text-gray-500 italic">
//                 YuWang
//               </p>
//               <p className="text-sm font-bold text-[#850A0A]">
//                 User:
//               </p>
//             </div>
//             <div className="w-10 h-10 rounded-full bg-[#9F1514] border-2 border-[#FFF1CA] flex items-center justify-center text-[#FFF1CA] font-bold">
//               MH
//             </div>
//           </div>
//         </header>

//         {/* VÙNG NỘI DUNG THAY ĐỔI */}
//         <main className="p-6 overflow-y-auto">
//           {/* Outlet chính là nơi trang TableManagement sẽ xuất hiện
//              khi bạn Link tới /cashier/tables
//           */}

//           <div className="animate-in fade-in duration-500">
//             <Outlet />
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from "react";
import Sidebar from "../../components/cashier/SidebarItem";
import { Menu, Bell } from "lucide-react";
import { Outlet } from "react-router-dom";
import { request } from "../../api/apiClient";

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [showNotiPanel, setShowNotiPanel] = useState(false);
  const [userData, setUserData] = useState(null);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  // 1. Lấy thông tin User từ danh sách (Dùng GET để tránh lỗi 400)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const users = await request("/user_crud.php"); // Mặc định là GET
        if (users && users.length > 0) {
          // Giả sử lấy user đầu tiên để hiển thị, hoặc logic filter theo session của bạn
          setUserData(users[0]);
        }
      } catch (error) {
        console.error("Lỗi lấy thông tin user:", error);
      }
    };
    fetchUser();
  }, []);

  // 2. Poll các yêu cầu dịch vụ từ khách (8 giây/lần)
  useEffect(() => {
    let timer;
    const loadNotifications = async () => {
      try {
        const data = await request("/notifications_list.php");
        setNotifications(data || []);
      } catch {
        // Bỏ qua lỗi để không làm gián đoạn trải nghiệm
      }
    };
    loadNotifications();
    timer = setInterval(loadNotifications, 8000);
    return () => clearInterval(timer);
  }, []);

  const handleMarkNotificationRead = async (id) => {
    try {
      await request("/notifications_mark_read.php", {
        method: "POST",
        body: { id },
      });
      setNotifications((prev) => prev.filter((n) => n.NotificationID !== id));
    } catch {
      console.error("Không thể đánh dấu đã đọc");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "#FFF1CA" }}>
      {/* Sidebar điều hướng */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 flex flex-col min-w-0 h-full">
        {/* Header */}
        <header className="h-16 shrink-0 bg-white shadow-sm flex items-center justify-between px-6 border-b-4 border-[#9F1514]">
          <button
            onClick={toggleSidebar}
            className="p-2 text-[#850A0A] hover:bg-red-50 rounded-lg transition-colors"
          >
            <Menu size={24} />
          </button>

          <div className="flex items-center gap-4 relative">
            {/* Chuông thông báo */}
            <button
              onClick={() => setShowNotiPanel((v) => !v)}
              className="relative p-2 text-[#850A0A] rounded-full hover:bg-[#FFF1CA] transition-colors"
            >
              <Bell size={22} />
              {notifications.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] rounded-full bg-red-600 text-white text-[10px] flex items-center justify-center font-bold">
                  {notifications.length}
                </span>
              )}
            </button>

            {/* Panel thông báo dịch vụ */}
            {showNotiPanel && (
              <div className="absolute right-16 top-12 w-80 max-h-80 overflow-auto bg-white border border-red-100 rounded-xl shadow-2xl z-50">
                <div className="px-3 py-2 border-b border-red-100 flex items-center justify-between bg-white sticky top-0">
                  <p className="text-xs font-bold text-[#850A0A] uppercase">
                    Yêu cầu dịch vụ
                  </p>
                  <button
                    className="text-[11px] text-gray-500 hover:text-red-600"
                    onClick={() => setShowNotiPanel(false)}
                  >
                    Đóng
                  </button>
                </div>
                <div className="p-3 space-y-2">
                  {notifications.length === 0 && (
                    <p className="text-xs text-gray-400 italic text-center py-4">
                      Hiện chưa có yêu cầu nào.
                    </p>
                  )}
                  {notifications.map((n) => (
                    <div
                      key={n.NotificationID}
                      className="border border-red-500/10 rounded-lg p-2 bg-[#FFF9F3] flex flex-col gap-1"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-[#850A0A]">
                          Bàn {n.TableID}
                        </span>
                        <span className="text-[10px] text-gray-400">
                          {n.CreatedAt}
                        </span>
                      </div>
                      <p className="text-xs text-gray-700">{n.Message}</p>
                      <button
                        onClick={() =>
                          handleMarkNotificationRead(n.NotificationID)
                        }
                        className="self-end mt-1 px-2 py-1 rounded-md bg-[#850A0A] text-[10px] text-[#FFF1CA] font-semibold active:scale-95"
                      >
                        Đã xử lý
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Thông tin User */}
            <div className="hidden sm:block text-right">
              <p className="text-xs text-gray-500 italic leading-tight">
                YuWang
              </p>
              <p className="text-sm font-bold text-[#850A0A] leading-tight">
                User: {userData ? userData.Username : "Guest"}
              </p>
            </div>

            <div className="w-10 h-10 rounded-full bg-[#9F1514] border-2 border-[#FFF1CA] flex items-center justify-center text-[#FFF1CA] font-bold uppercase shadow-sm">
              {userData ? userData.Username.substring(0, 2) : "YW"}
            </div>
          </div>
        </header>

        {/* Nội dung chính */}
        <main className="p-6 overflow-y-auto flex-1">
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
