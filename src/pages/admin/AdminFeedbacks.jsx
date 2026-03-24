import React, { useState, useEffect } from "react";
import { Star, MessageSquare, Search, Calendar, Filter } from "lucide-react";
import { request } from "../../api/apiClient";

const AdminFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("");

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      const data = await request("/admin_feedbacks.php");
      if (Array.isArray(data)) {
        setFeedbacks(data);
      }
    } catch (error) {
      console.error("Lỗi lấy danh sách đánh giá:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredFeedbacks = feedbacks.filter(fb => {
    const matchSearch = String(fb.OrderID || "").includes(searchTerm) || 
                        String(fb.TableID || "").includes(searchTerm) ||
                        String(fb.Comment || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchDate = filterDate ? fb.CreatedAt?.startsWith(filterDate) : true;
    return matchSearch && matchDate;
  });

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-800 flex items-center gap-3">
            <span className="bg-yellow-400 w-1.5 h-8 rounded-full"></span>
            Đánh giá khách hàng
          </h2>
          <p className="text-gray-500 mt-1">
            Xem tất cả phản hồi và đánh giá từ khách hàng sau bữa ăn
          </p>
        </div>
        
        <div className="flex items-center gap-2 bg-white p-2 rounded-xl shadow-sm border border-gray-100">
          <div className="px-4 border-r border-gray-100">
            <p className="text-[10px] uppercase font-bold text-gray-400 leading-none mb-1">Tổng quan</p>
            <p className="text-xl font-black text-gray-800 leading-none">{feedbacks.length} <span className="text-sm font-medium text-gray-500">lượt</span></p>
          </div>
          <div className="px-4">
            <p className="text-[10px] uppercase font-bold text-gray-400 leading-none mb-1">Điểm trung bình</p>
            <div className="flex items-center gap-1">
              <p className="text-xl font-black text-yellow-500 leading-none">
                {feedbacks.length ? (feedbacks.reduce((sum, f) => sum + Number(f.Rating), 0) / feedbacks.length).toFixed(1) : 0}
              </p>
              <Star size={16} fill="currentColor" className="text-yellow-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Tools */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Tìm theo nội dung, mã hóa đơn, hoặc số bàn..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl shadow-sm transition-all text-sm outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
           <div className="relative flex items-center min-w-[200px]">
             <Calendar size={18} className="absolute left-3 text-gray-400 z-10" />
             <input 
               type="date"
               value={filterDate}
               onChange={(e) => setFilterDate(e.target.value)}
               className="w-full bg-white border border-gray-200 pl-10 pr-4 py-3 rounded-xl flex items-center gap-2 text-gray-700 font-medium text-sm hover:border-blue-500 focus:border-blue-500 transition-all outline-none"
             />
           </div>
           <button 
            className="bg-white border border-gray-200 px-4 rounded-xl flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-all"
            onClick={() => { setSearchTerm(""); setFilterDate(""); }}
            title="Xóa bộ lọc"
           >
             <Filter size={18} />
           </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
           <div className="col-span-full py-20 flex flex-col items-center justify-center gap-4 opacity-50">
             <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
             <p className="font-bold text-gray-500">Đang tải đánh giá...</p>
           </div>
        ) : filteredFeedbacks.length === 0 ? (
           <div className="col-span-full py-20 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center justify-center gap-4 text-gray-400">
             <MessageSquare size={48} className="opacity-30" />
             <p className="font-bold">Không tìm thấy đánh giá nào phù hợp.</p>
           </div>
        ) : (
          filteredFeedbacks.map((fb) => (
            <div key={fb.FeedbackID} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col hover:shadow-md transition-shadow">
               <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-1">
                     {[...Array(5)].map((_, i) => (
                        <Star 
                           key={i} 
                           size={16} 
                           fill={i < fb.Rating ? "currentColor" : "none"} 
                           className={i < fb.Rating ? "text-yellow-400" : "text-gray-200"} 
                        />
                     ))}
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-md">
                     {new Date(fb.CreatedAt).toLocaleDateString("vi-VN")}
                  </span>
               </div>
               
               <p className="text-gray-700 text-sm flex-1 mb-6 break-words">
                 "{fb.Comment || "Khách hàng không để lại nhận xét."}"
               </p>

               <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-xs font-bold text-gray-500">Hóa đơn #{fb.OrderID}</span>
                  {fb.TableID && (
                    <span className="text-xs font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                      Bàn {fb.TableID}
                    </span>
                  )}
               </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminFeedbacks;
