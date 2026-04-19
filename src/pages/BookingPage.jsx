import React, { useState } from "react";
import BookingItem from "../components/BookingItem";
import Header from "../components/Header";
import { ToastProvider, useToast } from "../components/ui/Toast";

const STORES_DATA = [
  {
    id: 1,
    name: "WuYang Aeon Mall Long Biên",
    address:
      "Lô số T147-1 Sảnh Vườn TTTM Aeon Mall Long Biên, Số 27 Đường Cổ Linh, Phường Long Biên, Thành Phố Hà Nội, Việt Nam",
    openTime: "09:00 - 22:00",
    phone: "02473006766",
  },
  {
    id: 2,
    name: "WuYang Center Point Lê Văn Lương",
    address:
      "Tầng 4, Trung tâm thương mại Hà Nội Centerpoint, Số 27 Đường Lê Văn Lương, Phường Thanh Xuân, Thành Phố Hà Nội, Việt Nam",
    openTime: "09:00 - 22:00",
    phone: "02473007975",
  },
  {
    id: 3,
    name: "WuYang Giảng Võ",
    address:
      "Gian hàng 01-02, Tầng 2 Tòa nhà Grandeur Palace Giảng Võ, Số 138B Phố Giảng Võ, Phường Giảng Võ, Thành phố Hà Nội, Việt Nam",
    openTime: "09:00 - 22:00",
    phone: "02473008888",
  },
];

const BookingPageContent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    CustomerName: "",
    CustomerPhone: "",
    BookingDate: "",
    BookingTime: "",
    GuestCount: 2,
    Note: ""
  });

  const filteredStores = STORES_DATA.filter((store) =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleOpenBooking = (branchName) => {
    setSelectedBranch(branchName);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const res = await fetch("https://wuyang.xo.je/api/booking_create.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          BranchName: selectedBranch
        })
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || "Gửi yêu cầu thất bại.");
      }

      toast.success("Đặt bàn thành công!", "Nhà hàng sẽ liên hệ lại với bạn sớm nhất.");
      setShowModal(false);
      setFormData({
        CustomerName: "",
        CustomerPhone: "",
        BookingDate: "",
        BookingTime: "",
        GuestCount: 2,
        Note: ""
      });
    } catch (err) {
      toast.error("Lỗi", err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen mt-35 relative z-0">
      <Header />

      <div className="mx-auto w-full md:w-[90%] lg:max-w-5xl bg-white shadow-xl mt-24 md:mt-32 p-4 md:p-8 rounded-t-3xl md:rounded-3xl min-h-[80vh]">
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold text-[#850A0A] font-['Unbounded'] uppercase tracking-tight">
            Hệ thống nhà hàng
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Chọn chi nhánh gần bạn nhất để đặt bàn
          </p>
        </div>

        <div className="relative mb-8 group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Nhập tên nhà hàng, khu vực..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-3.5 pl-12 pr-4 bg-[#F8F8F8] border-none rounded-xl focus:ring-2 focus:ring-orange-400 text-gray-700 shadow-inner outline-none transition-all"
          />
        </div>

        <div className="space-y-2">
          {filteredStores.length > 0 ? (
            filteredStores.map((store) => (
              <BookingItem
                key={store.id}
                name={store.name}
                address={store.address}
                openTime={store.openTime}
                phone={store.phone}
                onBook={handleOpenBooking}
              />
            ))
          ) : (
            <div className="text-center py-20">
              <span className="text-5xl block mb-4 opacity-50">🏮</span>
              <p className="text-gray-400 italic">
                Không tìm thấy nhà hàng phù hợp...
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Booking Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-[#FDFBF7]">
              <h3 className="font-bold text-xl text-[#850A0A]">
                Đặt bàn nội bộ
              </h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-red-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-4 bg-orange-50 p-3 rounded-lg border border-orange-100 italic">
                  Chi nhánh đã chọn: <strong className="text-orange-700 block mt-1 not-italic">{selectedBranch}</strong>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Họ và tên *</label>
                  <input required type="text" value={formData.CustomerName} onChange={e => setFormData({ ...formData, CustomerName: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-100 focus:border-orange-500 outline-none transition-colors font-medium" placeholder="VD: Nguyễn Văn A" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Số điện thoại *</label>
                  <input required type="tel" value={formData.CustomerPhone} onChange={e => setFormData({ ...formData, CustomerPhone: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-100 focus:border-orange-500 outline-none transition-colors font-medium" placeholder="SĐT liên hệ" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Ngày *</label>
                  <input required type="date" value={formData.BookingDate} onChange={e => setFormData({ ...formData, BookingDate: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-100 focus:border-orange-500 outline-none transition-colors font-medium" />
                </div>
                <div className="col-span-1">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Giờ đến *</label>
                  <input required type="time" value={formData.BookingTime} onChange={e => setFormData({ ...formData, BookingTime: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-100 focus:border-orange-500 outline-none transition-colors font-medium" />
                </div>
                <div className="col-span-1">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Số khách *</label>
                  <input required type="number" min="1" max="100" value={formData.GuestCount} onChange={e => setFormData({ ...formData, GuestCount: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-100 focus:border-orange-500 outline-none transition-colors font-medium" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Ghi chú (Tùy chọn)</label>
                <textarea rows="2" value={formData.Note} onChange={e => setFormData({ ...formData, Note: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-100 focus:border-orange-500 outline-none transition-colors font-medium resize-none" placeholder="Yêu cầu ghế em bé, trang trí sinh nhật..." />
              </div>

              <div className="pt-2">
                <button type="submit" disabled={submitting} className="w-full py-3.5 rounded-xl bg-[#EE8D2D] text-white font-bold text-lg shadow-lg hover:bg-[#d67d26] transition-all active:scale-95 disabled:opacity-60 flex items-center justify-center">
                  {submitting ? "Đang gửi..." : "Gửi Yêu Cầu Đặt Bàn"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const BookingPage = () => {
  return (
    <ToastProvider>
      <BookingPageContent />
    </ToastProvider>
  );
};

export default BookingPage;
