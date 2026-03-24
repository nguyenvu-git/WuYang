import React, { useState, useEffect } from "react";
import { request } from "../../api/apiClient";
import { formatPrice } from "../../utils/format";
import { Star, TrendingUp, DollarSign } from "lucide-react";

const AdminDashboard = () => {
  const [startDate, setStartDate] = useState(() => {
    const d = new Date();
    d.setDate(1); // Ngày đầu tháng
    return d.toISOString().split("T")[0];
  });
  
  const [endDate, setEndDate] = useState(() => {
    return new Date().toISOString().split("T")[0]; // Hôm nay
  });

  const [revenueData, setRevenueData] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, [startDate, endDate]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // 1. Fetch Doanh thu
      const resRevenue = await request(`/admin_reports.php?startDate=${startDate}&endDate=${endDate}`);
      if (Array.isArray(resRevenue)) {
        setRevenueData(resRevenue);
      } else {
        setRevenueData([]);
      }

      // 2. Fetch Điểm đánh giá (POST)
      const resRating = await request("/admin_reports.php", {
        method: "POST",
        body: {}
      });
      if (resRating && resRating.AverageRating) {
        setAvgRating(parseFloat(resRating.AverageRating));
      }
    } catch (error) {
      console.error("Lỗi lấy báo cáo:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalRevenue = revenueData.reduce((sum, item) => sum + parseFloat(item.Revenue || 0), 0);
  const maxRevenue = Math.max(...revenueData.map(d => parseFloat(d.Revenue || 0)), 1); // Avoid div by 0

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <h2 className="text-3xl font-black text-gray-800 flex items-center gap-3">
            <span className="bg-blue-600 w-1.5 h-8 rounded-full"></span>
            Báo cáo Doanh thu
          </h2>
          <p className="text-gray-500 mt-1">
            Tổng hợp doanh thu theo ngày và độ hài lòng của khách hàng
          </p>
        </div>

        <div className="flex bg-white p-2 rounded-xl shadow-sm border border-gray-100 items-center justify-between w-full md:w-auto h-12">
           <div className="flex items-center px-4">
              <input 
                 type="date" 
                 value={startDate} 
                 onChange={e => setStartDate(e.target.value)}
                 className="outline-none text-sm font-bold text-gray-700 bg-transparent flex-1"
              />
           </div>
           <span className="text-gray-300 font-bold">-</span>
           <div className="flex items-center px-4">
              <input 
                 type="date" 
                 value={endDate}
                 onChange={e => setEndDate(e.target.value)}
                 className="outline-none text-sm font-bold text-gray-700 bg-transparent flex-1"
              />
           </div>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 opacity-50">
           <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
           <p className="font-bold text-gray-500">Đang tải báo cáo...</p>
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl p-6 border-l-4 border-l-blue-600 shadow-sm flex flex-col justify-between relative overflow-hidden group">
               <DollarSign size={80} className="absolute -right-4 -bottom-4 text-blue-50 opacity-50 group-hover:scale-110 transition-transform" />
               <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Tổng Doanh Thu</p>
               <h3 className="text-4xl font-black text-gray-800 mt-4">{formatPrice(totalRevenue)}</h3>
               <p className="text-xs text-blue-600 font-bold mt-2">Trong giai đoạn đã chọn</p>
            </div>

            <div className="bg-white rounded-3xl p-6 border-l-4 border-l-yellow-400 shadow-sm flex flex-col justify-between relative overflow-hidden group">
               <Star size={80} className="absolute -right-4 -bottom-4 text-yellow-50 opacity-50 group-hover:scale-110 transition-transform" />
               <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Đánh giá trung bình</p>
               <div className="flex items-center gap-2 mt-4">
                  <h3 className="text-4xl font-black text-gray-800">{avgRating.toFixed(1)}</h3>
                  <Star fill="currentColor" stroke="none" size={28} className="text-yellow-400" />
               </div>
               <p className="text-xs text-yellow-600 font-bold mt-2">Từ tất cả khách hàng</p>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-indigo-800 rounded-3xl p-6 shadow-xl flex flex-col items-center justify-center text-white relative overflow-hidden text-center">
               <TrendingUp size={48} className="mb-4 opacity-80" />
               <h4 className="text-lg font-bold">Biểu đồ Phân Tích</h4>
               <p className="text-xs text-white/70 mt-2">Dữ liệu được cập nhật Real-time từ nhà hàng</p>
            </div>
          </div>

          {/* Simple Bar Chart */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 overflow-hidden">
             <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
                <h3 className="text-lg font-black text-gray-800 uppercase tracking-widest">Biểu đồ Doanh Thu</h3>
             </div>
             
             {revenueData.length === 0 ? (
               <div className="text-center py-20 text-gray-400 font-bold italic">
                 Không có dữ liệu trong khoảng thời gian này.
               </div>
             ) : (
               <div className="h-64 flex items-end gap-2 overflow-x-auto custom-scrollbar pb-2">
                 {revenueData.map((day, idx) => {
                    const heightPercent = (parseFloat(day.Revenue || 0) / maxRevenue) * 100;
                    return (
                      <div key={idx} className="flex flex-col items-center justify-end flex-1 min-w-[40px] h-full group">
                         {/* Tooltip */}
                         <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs font-bold py-1 px-2 rounded mb-2 whitespace-nowrap shadow-xl pointer-events-none">
                            {formatPrice(day.Revenue || 0)}
                         </div>
                         {/* Bar */}
                         <div 
                           className="w-full max-w-[40px] bg-blue-500 rounded-t-md hover:bg-blue-600 transition-colors"
                           style={{ height: `${heightPercent}%`, minHeight: '4px' }}
                         ></div>
                         {/* Label */}
                         <div className="text-[10px] font-bold text-gray-400 mt-2 rotate-45 origin-left w-12 truncate">
                           {day.Date.split('-').slice(1).join('/')}
                         </div>
                      </div>
                    );
                 })}
               </div>
             )}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
