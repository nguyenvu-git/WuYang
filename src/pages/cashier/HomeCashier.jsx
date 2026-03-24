import React, { useState, useEffect } from "react";
import { BellRing, CheckCircle2, TrendingUp, Receipt, Users, Clock } from "lucide-react";
import { request } from "../../api/apiClient";
import { formatPrice } from "../../utils/format";

const HomeCashier = () => {
  const [notifications, setNotifications] = useState([]);
  const [stats, setStats] = useState({ revenue: 0, count: 0 });
  const [loading, setLoading] = useState(true);

  // Poll dữ liệu mỗi 8 giây
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 8000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      // 1. Lấy thông báo dịch vụ
      const notiData = await request("/notifications_list.php");
      setNotifications(notiData || []);

      // 2. Lấy hóa đơn để tính thống kê hôm nay
      const billsData = await request("/bills_list.php");
      if (Array.isArray(billsData)) {
        const today = new Date().toISOString().split('T')[0];
        const todayBills = billsData.filter(b => b.CreatedAt?.startsWith(today) && (b.Status === "Completed" || b.Status === "Paid"));
        
        const totalRevenue = todayBills.reduce((sum, b) => sum + parseFloat(b.TotalAmount || 0), 0);
        setStats({ revenue: totalRevenue, count: todayBills.length });
      }
    } catch (error) {
      console.error("Lỗi lấy dữ liệu Home:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkProcessed = async (id) => {
    try {
      // Optimistic update
      setNotifications(prev => prev.filter(n => n.NotificationID !== id));
      
      await request("/notifications_mark_read.php", {
        method: "POST",
        body: { id },
      });
    } catch {
      console.error("Lỗi đánh dấu đã đọc");
    }
  };

  const getTimeAgo = (dateStr) => {
    const time = new Date(dateStr).getTime();
    const now = new Date().getTime();
    const diffMins = Math.floor((now - time) / 60000);
    if (diffMins < 1) return 'Vừa xong';
    if (diffMins < 60) return `${diffMins} phút trước`;
    return `${Math.floor(diffMins/60)} giờ trước`;
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto animate-in fade-in duration-500">
      <div className="border-b border-[#9F1514]/10 pb-4">
        <h2 className="text-3xl font-bold text-[#850A0A] flex items-center gap-3">
          <span className="bg-[#850A0A] w-1.5 h-8 rounded-full"></span>
          Tổng quan trong ngày
        </h2>
        <p className="text-gray-500 italic mt-1">
          Theo dõi doanh số và phục vụ khách hàng kịp thời
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Cột trái: Thống kê nhanh */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-gradient-to-br from-[#850A0A] to-[#600606] rounded-3xl p-6 text-[#FFF1CA] shadow-xl relative overflow-hidden group">
            <TrendingUp size={120} className="absolute -right-6 -bottom-6 opacity-10 group-hover:scale-110 transition-transform duration-500" />
            <p className="text-[#FFF1CA]/80 font-bold uppercase tracking-wider text-sm mb-2">Doanh thu hôm nay</p>
            <h3 className="text-4xl font-black mb-6">{formatPrice(stats.revenue)}</h3>
            
            <div className="bg-white/10 rounded-2xl p-4 flex items-center justify-between backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="bg-[#FFF1CA] text-[#850A0A] p-2 rounded-lg">
                  <Receipt size={24} />
                </div>
                <div>
                  <p className="text-xs text-[#FFF1CA]/70 font-semibold uppercase">Hóa đơn</p>
                  <p className="text-xl font-bold">{stats.count}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border-2 border-red-50 shadow-sm flex items-center gap-4">
             <div className="bg-orange-100 text-orange-600 p-4 rounded-full">
               <Users size={32} />
             </div>
             <div>
               <p className="text-xs text-gray-400 font-bold uppercase">Yêu cầu chưa xử lý</p>
               <p className="text-2xl font-black text-[#850A0A]">{notifications.length}</p>
             </div>
          </div>
        </div>

        {/* Cột phải: Bảng yêu cầu dịch vụ */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-red-100 shadow-xl overflow-hidden flex flex-col h-[calc(100vh-12rem)] md:h-[600px]">
          <div className="bg-[#FFF9F3] p-5 border-b border-red-50 flex justify-between items-center shrink-0">
             <h3 className="font-black text-[#850A0A] text-lg uppercase tracking-wider flex items-center gap-2">
               <BellRing size={20} className={notifications.length > 0 ? "animate-pulse" : ""} />
               Bảng lệnh phục vụ
             </h3>
             {notifications.length > 0 && (
                <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full animate-bounce">
                  Cần xử lý {notifications.length}
                </span>
             )}
          </div>
          
          <div className="flex-1 overflow-y-auto p-5 bg-gray-50/50">
            {loading && notifications.length === 0 ? (
               <div className="flex flex-col items-center justify-center h-full opacity-50 space-y-4">
                 <div className="w-10 h-10 border-4 border-[#850A0A] border-t-transparent rounded-full animate-spin" />
                 <p className="font-bold text-gray-500">Đang quét yêu cầu mới...</p>
               </div>
            ) : notifications.length === 0 ? (
               <div className="flex flex-col items-center justify-center h-full opacity-30 text-center space-y-4">
                 <CheckCircle2 size={80} className="text-gray-400" />
                 <div>
                   <p className="font-black text-xl text-gray-600">Tuyệt vời!</p>
                   <p className="font-semibold text-gray-500">Hiện không có yêu cầu nào từ khách.</p>
                 </div>
               </div>
            ) : (
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 {notifications.map((noti) => (
                    <div key={noti.NotificationID} className="bg-white rounded-2xl p-5 border-l-4 border-[#9F1514] shadow-md hover:shadow-lg transition-all flex flex-col justify-between gap-4 animate-in zoom-in-95">
                      <div className="flex justify-between items-start">
                         <div>
                           <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-[#850A0A] font-black rounded-lg text-sm mb-2">
                              Bàn {noti.TableID}
                           </div>
                           <h4 className="text-lg font-bold text-gray-800 leading-tight">{noti.Message}</h4>
                         </div>
                         <div className="text-right text-[10px] items-end flex flex-col text-gray-400 font-bold uppercase gap-1">
                            <Clock size={14} />
                            {getTimeAgo(noti.CreatedAt)}
                         </div>
                      </div>
                      
                      <button 
                        onClick={() => handleMarkProcessed(noti.NotificationID)}
                        className="w-full bg-[#FFF1CA] hover:bg-[#850A0A] text-[#850A0A] hover:text-[#FFF1CA] py-3 rounded-xl font-black uppercase text-xs transition-colors shadow-sm flex items-center justify-center gap-2 group"
                      >
                         <CheckCircle2 size={16} className="group-hover:scale-110 transition-transform" />
                         Đã hoàn thành
                      </button>
                    </div>
                 ))}
               </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default HomeCashier;
