import React, { useState, useEffect } from "react";
import { request } from "../../api/apiClient";
import { useToast } from "../../components/ui/Toast";
import { useConfirm } from "../../components/ui/ConfirmDialog";
import { Check, X, Phone, Calendar as CalendarIcon, Clock, Users, Search } from "lucide-react";

const BookingManagement = () => {
    const { toast } = useToast();
    const { confirm, ConfirmDialogComponent } = useConfirm();
    
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("All"); // All, Pending, Confirmed, Arrived, Cancelled

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const res = await request("/admin_bookings.php");
            setBookings(Array.isArray(res) ? res : []);
        } catch (error) {
            toast.error("Lỗi tải lịch đặt bàn", "Không thể kết nối máy chủ.");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (bookingId, newStatus, customerName) => {
        let confirmMsg = "";
        let intent = "info";
        
        if (newStatus === "Confirmed") {
            confirmMsg = `Đã gọi xác nhận với khách ${customerName}?`;
        } else if (newStatus === "Cancelled") {
            confirmMsg = `Khách ${customerName} huỷ bàn hoặc không tới?`;
            intent = "danger";
        } else if (newStatus === "Arrived") {
            confirmMsg = `Khách ${customerName} đã đến nhà hàng?`;
        }

        const ok = await confirm({
            title: "Cập nhật trạng thái",
            message: confirmMsg,
            type: intent,
            confirmText: "Đồng ý",
        });

        if (!ok) return;

        try {
            await request("/admin_bookings.php", {
                method: "PUT",
                body: { BookingID: bookingId, Status: newStatus }
            });
            toast.success("Đã cập nhật", `Trạng thái đặt bàn được đổi thành ${newStatus}`);
            fetchBookings();
        } catch (err) {
            toast.error("Lỗi", "Không thể cập nhật trạng thái");
        }
    };

    const filteredBookings = bookings.filter(b => {
        const matchSearch = b.CustomerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            b.CustomerPhone.includes(searchTerm);
        const matchFilter = filterStatus === "All" || b.Status === filterStatus;
        return matchSearch && matchFilter;
    });

    const getStatusBadge = (status) => {
        switch (status) {
            case "Pending": return <span className="bg-yellow-100 text-yellow-800 border-yellow-200 border px-2 py-1 rounded-full text-xs font-bold w-max">Chờ gọi xác nhận</span>;
            case "Confirmed": return <span className="bg-blue-100 text-blue-800 border-blue-200 border px-2 py-1 rounded-full text-xs font-bold w-max">Đã xác nhận</span>;
            case "Arrived": return <span className="bg-green-100 text-green-800 border-green-200 border px-2 py-1 rounded-full text-xs font-bold w-max">Khách đã đến</span>;
            case "Cancelled": return <span className="bg-gray-100 text-gray-600 border-gray-200 border px-2 py-1 rounded-full text-xs font-bold w-max">Đã huỷ</span>;
            default: return null;
        }
    };

    return (
        <div className="space-y-6 max-w-[1400px] mx-auto animate-in fade-in duration-500">
            {ConfirmDialogComponent}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 pb-4">
                <div>
                    <h2 className="text-3xl font-black text-gray-800 flex items-center gap-3">
                        <span className="bg-orange-500 w-1.5 h-8 rounded-full"></span>
                        Quản lý Đặt Bàn (Booking)
                    </h2>
                    <p className="text-gray-500 mt-1">Theo dõi và gọi xác nhận khách đặt bàn qua Website</p>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-[70vh]">
                <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 bg-gray-50/50">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Tìm Tên khách hoặc SĐT..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none font-medium"
                        />
                    </div>

                    <div className="flex gap-2 bg-gray-200/50 p-1 rounded-xl w-max overflow-x-auto">
                        {['All', 'Pending', 'Confirmed', 'Arrived', 'Cancelled'].map(status => (
                            <button
                                key={status}
                                onClick={() => setFilterStatus(status)}
                                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap
                                    ${filterStatus === status ? "bg-white text-orange-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}
                                `}
                            >
                                {status === 'All' ? 'Tất cả' : status === 'Pending' ? 'Chờ xác nhận' : status === 'Confirmed' ? 'Đã xác nhận' : status === 'Arrived' ? 'Khách đã đến' : 'Huỷ'}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : filteredBookings.length === 0 ? (
                        <div className="text-center py-20 text-gray-400 font-bold italic">Chưa có lịch đặt bàn nào.</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                            {filteredBookings.map(b => (
                                <div key={b.BookingID} className="bg-white border hover:border-orange-300 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="font-black text-gray-800 text-lg flex items-center gap-2">
                                                {b.CustomerName}
                                            </h3>
                                            <a href={`tel:${b.CustomerPhone}`} className="text-blue-600 font-bold text-sm flex items-center gap-1 mt-1 hover:underline w-max">
                                                <Phone size={14} /> {b.CustomerPhone}
                                            </a>
                                        </div>
                                        {getStatusBadge(b.Status)}
                                    </div>

                                    <div className="bg-orange-50/50 rounded-xl p-3 border border-orange-100/50 space-y-2 mb-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-700">
                                            <CalendarIcon size={16} className="text-orange-500" />
                                            Ngày đến: <b>{b.BookingDate}</b>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-700">
                                            <Clock size={16} className="text-orange-500" />
                                            Giờ: <b>{b.BookingTime}</b>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-700">
                                            <Users size={16} className="text-orange-500" />
                                            Số lượng khách: <b>{b.GuestCount} người</b>
                                        </div>
                                    </div>
                                    
                                    {b.Note && (
                                        <div className="mb-4 text-sm text-gray-600 bg-gray-50 border border-dashed border-gray-300 p-2 rounded-lg italic">
                                            📝 {b.Note}
                                        </div>
                                    )}

                                    <div className="text-xs text-gray-400 mb-3 border-t border-gray-100 pt-3">
                                        Chi nhánh: <span className="font-bold text-gray-600">{b.BranchName}</span>
                                    </div>

                                    {/* Action Buttons */}
                                    {b.Status !== "Cancelled" && b.Status !== "Arrived" && (
                                        <div className="flex gap-2 mt-auto">
                                            {b.Status === "Pending" && (
                                                <button 
                                                    onClick={() => handleUpdateStatus(b.BookingID, "Confirmed", b.CustomerName)}
                                                    className="flex-1 py-2 bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white border border-blue-200 rounded-lg font-bold text-sm flex items-center justify-center gap-1 transition-colors"
                                                >
                                                    <Check size={16} /> Chốt đơn
                                                </button>
                                            )}
                                            {b.Status === "Confirmed" && (
                                                <button 
                                                    onClick={() => handleUpdateStatus(b.BookingID, "Arrived", b.CustomerName)}
                                                    className="flex-1 py-2 bg-green-50 text-green-700 hover:bg-green-600 hover:text-white border border-green-200 rounded-lg font-bold text-sm flex items-center justify-center gap-1 transition-colors"
                                                >
                                                    <Check size={16} /> Đã tới
                                                </button>
                                            )}
                                            <button 
                                                onClick={() => handleUpdateStatus(b.BookingID, "Cancelled", b.CustomerName)}
                                                className="flex-1 py-2 bg-gray-50 text-gray-600 hover:bg-red-500 hover:text-white hover:border-red-500 border border-gray-200 rounded-lg font-bold text-sm flex items-center justify-center gap-1 transition-colors"
                                            >
                                                <X size={16} /> Huỷ bàn
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookingManagement;
