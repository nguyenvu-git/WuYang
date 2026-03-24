import React, { useState, useEffect } from "react";
import { 
  FileText, 
  Search, 
  Calendar, 
  Eye, 
  ChevronRight,
  MoreVertical,
  ArrowUpDown,
  Filter
} from "lucide-react";
import { request } from "../../api/apiClient";
import { formatPrice } from "../../utils/format";
import { ToastContainer, useToast } from "../../components/ui/Toast";
import { useConfirm } from "../../components/ui/ConfirmDialog";

const BillManagement = () => {
  const { toast } = useToast();
  const { confirm, ConfirmDialogComponent } = useConfirm();
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBill, setSelectedBill] = useState(null);
  const [billItems, setBillItems] = useState([]);
  const [itemsLoading, setItemsLoading] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [filterDate, setFilterDate] = useState(""); // State lọc ngày

  useEffect(() => {
    fetchBills();
    const interval = setInterval(fetchBills, 20000); // 20 giây/lần
    return () => clearInterval(interval);
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
      toast.error("Lỗi tải dữ liệu", "Không thể lấy danh sách hóa đơn.");
    } finally {
      setLoading(false);
    }
  };

  const filteredBills = bills.filter(bill => {
    const matchSearch = bill.OrderID?.toString().includes(searchTerm) || 
                        bill.TableNumber?.toString().toLowerCase().includes(searchTerm.toLowerCase());
    
    // Lọc theo ngày (YYYY-MM-DD), nếu không chọn filterDate thì bỏ qua
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

  const handleCheckout = async (bill) => {
    const ok = await confirm({
      title: "Xác nhận thanh toán?",
      message: `Xác nhận thanh toán cho Bàn ${bill.TableNumber || bill.TableID}? Hành động này sẽ đóng bàn.`,
      type: "info",
      confirmText: "Xác nhận & Đóng bàn"
    });
    if (!ok) return;

    try {
      const res = await request(`/tables_checkout.php?id=${bill.TableID}`);
      if (res.success) {
        toast.success("Thành công", `Bàn ${bill.TableNumber} đã được thanh toán và để trống.`);
        setShowDetailModal(false); // Close modal on successful checkout
        fetchBills();
      } else {
        toast.error("Lỗi thanh toán", res.error || "Không thể thanh toán");
      }
    } catch (error) {
      toast.error("Lỗi kết nối", "Không thể kết nối máy chủ PHP.");
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Completed":
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-green-100 text-green-700 border border-green-200">ĐÃ THANH TOÁN</span>;
      case "Cancelled":
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-100 text-red-700 border border-red-200">ĐÃ HỦY</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-yellow-100 text-yellow-700 border border-yellow-200">{status}</span>;
    }
  };

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto animate-in fade-in duration-500">
      {ConfirmDialogComponent}
      {/* Header & Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#850A0A] flex items-center gap-2 uppercase tracking-tight">
            <FileText className="text-[#9F1514]" size={28} />
            Quản lý hóa đơn
          </h1>
          <p className="text-gray-500 text-sm italic">Theo dõi và kiểm tra lịch sử giao dịch tại nhà hàng</p>
        </div>
        
        <div className="flex items-center gap-2 bg-white p-1 rounded-xl shadow-sm border border-red-100">
          <div className="px-4 py-2 border-r border-red-50/50">
            <p className="text-[10px] uppercase font-bold text-gray-400 leading-none mb-1">Hôm nay</p>
            <p className="text-lg font-black text-[#850A0A] leading-none">
              {bills.filter(b => b.CreatedAt?.includes(new Date().toISOString().split('T')[0])).length} bill
            </p>
          </div>
          <div className="px-4 py-2">
            <p className="text-[10px] uppercase font-bold text-gray-400 leading-none mb-1">Tổng cộng</p>
            <p className="text-lg font-black text-[#850A0A] leading-none">{bills.length}</p>
          </div>
        </div>
      </div>

      {/* Toolbox */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Tìm theo mã hóa đơn hoặc số bàn..."
            className="w-full pl-12 pr-4 py-3 bg-white border-2 border-transparent focus:border-[#9F1514] rounded-2xl shadow-sm transition-all text-sm outline-none"
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
               className="w-full bg-white border-2 border-gray-100 pl-10 pr-4 py-3 rounded-2xl flex items-center justify-center gap-2 text-gray-600 font-bold text-sm hover:border-[#9F1514] focus:border-[#9F1514] transition-all outline-none"
             />
           </div>
           <button 
            className="bg-white border-2 border-gray-100 w-12 rounded-2xl flex items-center justify-center text-gray-600 hover:border-[#9F1514] transition-all"
            onClick={() => { setSearchTerm(""); setFilterDate(""); }}
            title="Xóa bộ lọc"
           >
             <Filter size={18} />
           </button>
        </div>
      </div>

      {/* Bill Table */}
      <div className="bg-white rounded-3xl border border-red-100 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#FFF9F3] border-b border-red-50">
              <tr>
                <th className="px-6 py-4 text-[11px] font-black text-[#850A0A] uppercase tracking-wider">Mã Hóa Đơn</th>
                <th className="px-6 py-4 text-[11px] font-black text-[#850A0A] uppercase tracking-wider">Bàn</th>
                <th className="px-6 py-4 text-[11px] font-black text-[#850A0A] uppercase tracking-wider">Thời gian</th>
                <th className="px-6 py-4 text-[11px] font-black text-[#850A0A] uppercase tracking-wider text-right">Tổng tiền</th>
                <th className="px-6 py-4 text-[11px] font-black text-[#850A0A] uppercase tracking-wider text-center">Trạng thái</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-red-50/50">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-8 h-8 border-3 border-[#9F1514] border-t-transparent rounded-full animate-spin" />
                      <p className="text-gray-400 text-xs italic">Đang tải danh sách...</p>
                    </div>
                  </td>
                </tr>
              ) : filteredBills.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-2 opacity-30">
                      <FileText size={48} />
                      <p className="text-sm font-bold">Không tìm thấy hóa đơn nào</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredBills.map((bill) => (
                  <tr key={bill.OrderID} className="hover:bg-red-50/20 transition-colors group">
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm font-bold text-gray-700">#{bill.OrderID}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="inline-flex items-center gap-2 px-2 py-1 bg-[#850A0A] text-[#FFF1CA] rounded-lg text-xs font-black">
                         Bàn {bill.TableNumber || bill.TableID}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                       <p className="text-sm text-gray-600 font-medium">{new Date(bill.CreatedAt).toLocaleDateString('vi-VN')}</p>
                       <p className="text-[10px] text-gray-400">{new Date(bill.CreatedAt).toLocaleTimeString('vi-VN')}</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <span className="text-sm font-black text-[#850A0A]">{formatPrice(bill.TotalAmount)}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                       {getStatusBadge(bill.Status)}
                    </td>
                    <td className="px-6 py-4 text-right">
                       <button 
                        onClick={() => handleViewDetail(bill)}
                        className="p-2 hover:bg-[#850A0A] hover:text-[#FFF1CA] rounded-xl transition-all text-gray-400"
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
          <div className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border-4 border-[#850A0A] animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-[#850A0A] p-6 text-center relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-[#FFF1CA]/20 rounded-b-full" />
              <button 
                onClick={() => setShowDetailModal(false)}
                className="absolute right-4 top-4 text-[#FFF1CA]/60 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
              <h3 className="text-[#FFF1CA] font-serif text-2xl font-black uppercase tracking-widest mt-2">Chi tiết hóa đơn</h3>
              <p className="text-[#FFF1CA]/60 text-xs font-mono">#{selectedBill.OrderID}</p>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="flex justify-between items-center mb-6 pt-2 pb-4 border-b border-dashed border-gray-200">
                <div>
                  <p className="text-[10px] text-gray-400 font-black uppercase">Thời gian</p>
                  <p className="text-sm font-bold text-gray-700">{new Date(selectedBill.CreatedAt).toLocaleString('vi-VN')}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-400 font-black uppercase">Phương thức</p>
                  <p className="text-sm font-bold text-[#850A0A]">Tiền mặt</p>
                </div>
              </div>

              {/* Items Placeholder - In a real app we'd fetch items or they'd be included */}
              <div className="space-y-4 max-h-64 overflow-y-auto pr-2 custom-scrollbar border-b border-dashed border-gray-100 pb-4">
                {itemsLoading ? (
                  <div className="flex flex-col items-center py-10 gap-2">
                    <div className="w-6 h-6 border-2 border-[#850A0A] border-t-transparent rounded-full animate-spin" />
                    <p className="text-[10px] text-gray-400 italic">Đang tải món...</p>
                  </div>
                ) : billItems.length === 0 ? (
                  <p className="text-center py-10 text-gray-400 text-xs italic">Không có dữ liệu món ăn</p>
                ) : (
                  billItems.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-start gap-4 animate-in fade-in slide-in-from-right-1 duration-200" style={{ animationDelay: `${idx * 50}ms` }}>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-800 leading-tight truncate">{item.ProductName}</p>
                        <p className="text-[10px] text-gray-400">
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

              {/* Total Section */}
              <div className="mt-6 pt-6 border-t-2 border-[#850A0A]/10 space-y-2">
                <div className="flex justify-between text-gray-500 text-xs">
                  <span>Tạm tính</span>
                  <span>{formatPrice(selectedBill.TotalAmount)}</span>
                </div>
                <div className="flex justify-between text-gray-500 text-xs">
                  <span>Giảm giá</span>
                  <span>0₫</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-sm font-black text-[#850A0A] uppercase tracking-tight">Tổng cộng</span>
                  <span className="text-2xl font-black text-[#850A0A]">{formatPrice(selectedBill.TotalAmount)}</span>
                </div>
              </div>

              {selectedBill.Status === "Pending" ? (
                <button 
                  className="w-full mt-8 py-4 bg-green-600 text-white font-black rounded-2xl shadow-xl shadow-green-900/20 active:scale-95 transition-all text-sm uppercase tracking-widest flex items-center justify-center gap-2"
                  onClick={() => handleConfirmPayment(selectedBill)}
                  disabled={loading}
                >
                  <Eye size={18} />
                  Xác nhận thanh toán & Đóng bàn
                </button>
              ) : (
                <button 
                  className="w-full mt-8 py-4 bg-[#850A0A] text-[#FFF1CA] font-black rounded-2xl shadow-xl shadow-red-900/20 active:scale-95 transition-all text-sm uppercase tracking-widest"
                  onClick={() => setShowDetailModal(false)}
                >
                  In hóa đơn (Phục hồi)
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Helpers ---
const X = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

export default BillManagement;
