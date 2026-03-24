import React, { useState, useEffect } from "react";
import { FileText, Search, Calendar, Filter, Eye } from "lucide-react";
import { request } from "../../api/apiClient";
import { formatPrice } from "../../utils/format";

const AdminBills = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [selectedBill, setSelectedBill] = useState(null);
  const [billItems, setBillItems] = useState([]);
  const [itemsLoading, setItemsLoading] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      setLoading(true);
      const data = await request("/bills_list.php");
      if (Array.isArray(data)) {
        setBills(data);
      }
    } catch (error) {
      console.error("Lỗi lấy danh sách hóa đơn:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBills = bills.filter(bill => {
    const matchSearch = String(bill.OrderID || "").includes(searchTerm) || 
                        String(bill.TableNumber || bill.TableID || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchDate = filterDate ? bill.CreatedAt?.startsWith(filterDate) : true;
    return matchSearch && matchDate;
  });

  const handleViewDetail = async (bill) => {
    setSelectedBill(bill);
    setShowDetailModal(true);
    setBillItems([]);
    
    try {
      setItemsLoading(true);
      const data = await request(`/bill_details.php?OrderID=${bill.OrderID}`);
      if (Array.isArray(data)) {
        setBillItems(data);
      }
    } catch (error) {
      console.error("Lỗi lấy chi tiết hóa đơn:", error);
    } finally {
      setItemsLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Completed":
      case "Paid":
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-green-100 text-green-700 border border-green-200">ĐÃ THANH TOÁN</span>;
      case "Cancelled":
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-100 text-red-700 border border-red-200">ĐÃ HỦY</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-yellow-100 text-yellow-700 border border-yellow-200">{status}</span>;
    }
  };

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <h2 className="text-3xl font-black text-gray-800 flex items-center gap-3">
            <span className="bg-purple-600 w-1.5 h-8 rounded-full"></span>
            Lịch sử Hóa đơn
          </h2>
          <p className="text-gray-500 mt-1">Tra cứu toàn bộ hóa đơn từ hệ thống thu ngân</p>
        </div>
        
        <div className="flex items-center gap-2 bg-white p-2 rounded-xl shadow-sm border border-gray-100">
          <div className="px-4 border-r border-gray-100">
            <p className="text-[10px] uppercase font-bold text-gray-400 leading-none mb-1">Tổng số Bill</p>
            <p className="text-xl font-black text-gray-800 leading-none">{bills.length}</p>
          </div>
          <div className="px-4">
            <p className="text-[10px] uppercase font-bold text-gray-400 leading-none mb-1">Tìm thấy</p>
            <p className="text-xl font-black text-purple-600 leading-none">{filteredBills.length}</p>
          </div>
        </div>
      </div>

      {/* Toolbox */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Tìm theo mã hóa đơn hoặc số bàn..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 focus:border-purple-500 rounded-xl shadow-sm transition-all focus:ring-2 focus:ring-purple-200 text-sm outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 relative">
           <div className="flex-1 relative flex items-center">
             <Calendar size={18} className="absolute left-3 text-gray-400 z-10" />
             <input 
               type="date"
               value={filterDate}
               onChange={(e) => setFilterDate(e.target.value)}
               className="w-full bg-white border border-gray-200 pl-10 pr-4 py-3 rounded-xl flex items-center justify-center gap-2 text-gray-700 font-bold text-sm hover:border-purple-500 focus:border-purple-500 transition-all outline-none"
             />
           </div>
           <button 
            className="bg-white border border-gray-200 w-12 rounded-xl flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-all"
            onClick={() => { setSearchTerm(""); setFilterDate(""); }}
            title="Xóa bộ lọc"
           >
             <Filter size={18} />
           </button>
        </div>
      </div>

      {/* Bill Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#F8FAFC] border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-[11px] font-black text-gray-500 uppercase tracking-wider">Mã Hóa Đơn</th>
                <th className="px-6 py-4 text-[11px] font-black text-gray-500 uppercase tracking-wider">Bàn</th>
                <th className="px-6 py-4 text-[11px] font-black text-gray-500 uppercase tracking-wider">Thời gian</th>
                <th className="px-6 py-4 text-[11px] font-black text-gray-500 uppercase tracking-wider text-right">Tổng tiền</th>
                <th className="px-6 py-4 text-[11px] font-black text-gray-500 uppercase tracking-wider text-center">Trạng thái</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-2">
                       <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
                       <p className="text-gray-400 text-xs font-bold">Đang tải danh sách...</p>
                    </div>
                  </td>
                </tr>
              ) : filteredBills.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-2 opacity-30">
                       <FileText size={48} className="text-gray-400" />
                       <p className="text-sm font-bold text-gray-500">Không tìm thấy hóa đơn nào</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredBills.map((bill) => (
                  <tr key={bill.OrderID} className="hover:bg-purple-50/30 transition-colors group">
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm font-bold text-gray-700">#{bill.OrderID}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="inline-flex items-center gap-2 px-2 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs font-black">
                         Bàn {bill.TableNumber || bill.TableID}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                       <p className="text-sm text-gray-700 font-medium">{new Date(bill.CreatedAt).toLocaleDateString('vi-VN')}</p>
                       <p className="text-[10px] font-bold text-gray-400">{new Date(bill.CreatedAt).toLocaleTimeString('vi-VN')}</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <span className="text-sm font-black text-gray-800">{formatPrice(bill.TotalAmount)}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                       {getStatusBadge(bill.Status)}
                    </td>
                    <td className="px-6 py-4 text-right">
                       <button 
                        onClick={() => handleViewDetail(bill)}
                        className="p-2 hover:bg-purple-100 hover:text-purple-700 rounded-xl transition-all text-gray-400"
                       >
                         <Eye size={18} />
                       </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedBill && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowDetailModal(false)} />
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="bg-gray-50 p-6 text-center border-b border-gray-100 relative">
              <button 
                onClick={() => setShowDetailModal(false)}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-800 transition-colors bg-white w-8 h-8 rounded-full flex items-center justify-center shadow-sm"
              >
                ✕
              </button>
              <h3 className="text-gray-800 font-serif text-2xl font-black uppercase tracking-widest mt-2">Chi tiết hóa đơn</h3>
              <p className="text-gray-400 text-xs font-mono font-bold mt-1">#{selectedBill.OrderID}</p>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-center mb-6 pt-2 pb-4 border-b border-dashed border-gray-200">
                <div>
                  <p className="text-[10px] text-gray-400 font-black uppercase">Thời gian</p>
                  <p className="text-sm font-bold text-gray-700">{new Date(selectedBill.CreatedAt).toLocaleString('vi-VN')}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-400 font-black uppercase">Phương thức</p>
                  <p className="text-sm font-bold text-gray-700">Tiền mặt</p>
                </div>
              </div>

              <div className="space-y-4 max-h-64 overflow-y-auto pr-2 custom-scrollbar border-b border-dashed border-gray-100 pb-4">
                {itemsLoading ? (
                  <div className="flex flex-col items-center py-10 gap-2">
                    <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-[10px] text-gray-400 font-bold">Đang tải món...</p>
                  </div>
                ) : billItems.length === 0 ? (
                  <p className="text-center py-10 text-gray-400 text-xs font-bold">Không có dữ liệu món ăn</p>
                ) : (
                  billItems.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-800 leading-tight truncate">{item.ProductName}</p>
                        <p className="text-[10px] font-bold text-gray-400">
                          {formatPrice(item.PriceAtTime || item.Price)} × {item.Quantity}
                        </p>
                      </div>
                      <span className="text-sm font-bold text-gray-700">
                        {formatPrice((item.PriceAtTime || item.Price) * item.Quantity)}
                      </span>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100 space-y-2">
                <div className="flex justify-between text-gray-500 text-xs font-bold">
                  <span>Tạm tính</span>
                  <span>{formatPrice(selectedBill.TotalAmount)}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-sm font-black text-gray-800 uppercase tracking-tight">Tổng cộng</span>
                  <span className="text-2xl font-black text-purple-600">{formatPrice(selectedBill.TotalAmount)}</span>
                </div>
              </div>

              <div className="mt-8">
                 <button 
                   className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-xl transition-all text-sm"
                   onClick={() => setShowDetailModal(false)}
                 >
                   Đóng cửa sổ
                 </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBills;
