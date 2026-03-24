import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Search, X, ShieldAlert, KeyRound } from "lucide-react";
import { request } from "../../api/apiClient";
import { ToastContainer, useToast } from "../../components/ui/Toast";
import { useConfirm } from "../../components/ui/ConfirmDialog";

const AdminStaff = () => {
  const { toast } = useToast();
  const { confirm, ConfirmDialogComponent } = useConfirm();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  
  const [formData, setFormData] = useState({
    Username: "",
    Password: "",
    FullName: "",
    UserRole: "Cashier"
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await request("/user_crud.php");
      setUsers(Array.isArray(res) ? res : []);
    } catch (error) {
      console.error("Lỗi lấy danh sách nhân viên:", error);
      toast.error("Lỗi tải nhân viên", "Không thể kết nối máy chủ.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (user = null) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        Username: user.Username || "",
        Password: "", // Trống khi edit, chỉ điền khi muốn đổi
        FullName: user.FullName || "",
        UserRole: user.UserRole || "Cashier"
      });
    } else {
      setEditingUser(null);
      setFormData({
        Username: "",
        Password: "",
        FullName: "",
        UserRole: "Cashier"
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate
    if (!editingUser && !formData.Password) {
      toast.warning("Thiếu mật khẩu", "Vui lòng thiết lập mật khẩu cho nhân viên mới!");
      return;
    }

    try {
      if (editingUser) {
        // PUT API accepts JSON
        const payload = {
          UserID: editingUser.UserID,
          Username: formData.Username,
          FullName: formData.FullName,
          UserRole: formData.UserRole
        };
        // Chỉ gửi password nếu có thay đổi
        if (formData.Password) {
          payload.Password = formData.Password;
        }

        await request("/user_crud.php", {
          method: "PUT",
          body: payload
        });
      } else {
        // POST API accepts JSON
        await request("/user_crud.php", {
          method: "POST",
          body: {
            Username: formData.Username,
            Password: formData.Password,
            FullName: formData.FullName,
            UserRole: formData.UserRole
          }
        });
      }
      closeModal();
      toast.success(editingUser ? "Đã cập nhật" : "Đã tạo tài khoản", `Nhân viên "${formData.FullName}" đã được lưu.`);
      fetchUsers();
    } catch (error) {
      toast.error("Lỗi lưu nhân viên", "Vui lòng kiểm tra lại Username (có thể bị trùng).");
    }
  };

  const handleDelete = async (userId) => {
    const user = users.find(u => u.UserID === userId);
    const ok = await confirm({
      title: "Xóa tài khoản?",
      message: `Bạn có chắc chắn muốn xóa tài khoản "${user?.FullName || 'này'}"? Hành động này không thể hoàn tác!`,
      type: "danger",
      confirmText: "Xóa vĩnh viễn"
    });
    if (!ok) return;
    
    try {
      await request("/user_crud.php", {
        method: "DELETE",
        body: { UserID: userId } // user_crud.php mapped DELETE input from JSON
      });
      toast.success("Đã xóa", "Tài khoản nhân viên đã bị loại bỏ.");
      fetchUsers();
    } catch (error) {
      toast.error("Lỗi", "Xóa thất bại!");
    }
  };

  const filteredUsers = users.filter(u => 
    u.FullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.Username?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const roleColors = {
    Admin: "bg-red-100 text-red-700 border-red-200",
    Cashier: "bg-blue-100 text-blue-700 border-blue-200",
    Kitchen: "bg-orange-100 text-orange-700 border-orange-200"
  };

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto animate-in fade-in duration-500">
      {ConfirmDialogComponent}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <h2 className="text-3xl font-black text-gray-800 flex items-center gap-3">
            <span className="bg-purple-600 w-1.5 h-8 rounded-full"></span>
            Quản lý Nhân viên
          </h2>
          <p className="text-gray-500 mt-1">Quản lý tài khoản truy cập hệ thống của nhà hàng</p>
        </div>

        <button 
          onClick={() => handleOpenModal()}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 transition-all active:scale-95 whitespace-nowrap"
        >
          <Plus size={20} />
          Thêm Tài khoản
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-[70vh]">
        <div className="p-4 border-b border-gray-100 flex gap-4 bg-gray-50/50">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Tìm theo Tên hoặc Username..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all outline-none font-medium"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          {loading ? (
             <div className="flex justify-center py-20">
               <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
             </div>
          ) : filteredUsers.length === 0 ? (
             <div className="text-center py-20 text-gray-400 font-bold italic">Không tìm thấy nhân viên nào.</div>
          ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
               {filteredUsers.map(user => (
                  <div key={user.UserID} className="bg-white border hover:border-purple-300 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group overflow-hidden relative flex flex-col justify-between">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-14 h-14 rounded-full bg-gray-100 shrink-0 border border-gray-200 flex items-center justify-center font-black text-xl text-gray-400">
                         {user.FullName ? user.FullName.charAt(0).toUpperCase() : '?'}
                      </div>
                      <div className="flex-1 min-w-0">
                         <h3 className="font-black text-gray-800 text-lg truncate">{user.FullName}</h3>
                         <p className="text-xs text-gray-500 font-mono mb-2">@{user.Username}</p>
                         <span className={`inline-block px-2 py-1 border rounded-md text-[10px] font-black uppercase tracking-widest ${roleColors[user.UserRole] || 'bg-gray-100 border-gray-200 text-gray-600'}`}>
                           {user.UserRole}
                         </span>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-100 flex gap-2">
                       <button 
                         onClick={() => handleOpenModal(user)}
                         className="flex-1 py-2 bg-gray-50 hover:bg-purple-50 text-gray-700 hover:text-purple-700 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-colors"
                       >
                         <Edit2 size={16} /> Sửa
                       </button>
                       <button 
                         onClick={() => handleDelete(user.UserID)}
                         disabled={user.UserRole === 'Admin'} // Không xóa admin từ UI
                         className={`flex-1 py-2 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-colors
                            ${user.UserRole === 'Admin' ? 'bg-gray-100 text-gray-300 cursor-not-allowed' : 'bg-gray-50 hover:bg-red-50 text-gray-700 hover:text-red-700'}
                         `}
                         title={user.UserRole === 'Admin' ? "Không thể xóa quyền Admin qua bảng điều khiển" : ""}
                       >
                         <Trash2 size={16} /> Xóa
                       </button>
                    </div>
                  </div>
               ))}
             </div>
          )}
        </div>
      </div>

      {/* Modal Thêm/Sửa */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
               <h3 className="font-black text-xl text-gray-800 flex items-center gap-2">
                 <ShieldAlert className="text-purple-600" size={24} />
                 {editingUser ? "Chỉnh sửa Cấp phép" : "Tạo Tài Khoản"}
               </h3>
               <button onClick={closeModal} className="text-gray-400 hover:text-red-500 transition-colors p-1 bg-white rounded-lg shadow-sm border border-gray-200">
                 <X size={20} />
               </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
               <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Họ và Tên <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    required 
                    value={formData.FullName}
                    onChange={e => setFormData({...formData, FullName: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none font-semibold transition-all"
                    placeholder="VD: Nguyễn Văn A"
                  />
               </div>

               <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Tên Đăng Nhập (Username) <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    required 
                    readOnly={!!editingUser} // Thường không nên đổi username, hoặc cho phép nhưng cảnh báo
                    value={formData.Username}
                    onChange={e => setFormData({...formData, Username: e.target.value})}
                    className={`w-full px-4 py-3 rounded-xl border-2 font-mono transition-all outline-none
                      ${editingUser ? 'bg-gray-50 border-gray-200 text-gray-500' : 'border-gray-100 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 text-gray-800'}
                    `}
                    placeholder="VD: nva_cashier"
                  />
                  {editingUser && <p className="text-[10px] italic text-gray-400 mt-1">Tên đăng nhập không thể thay đổi.</p>}
               </div>

               <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-1">
                    <KeyRound size={12} /> Mật khẩu {editingUser ? "(Bỏ trống nếu không đổi)" : <span className="text-red-500">*</span>}
                  </label>
                  <input 
                    type="password" 
                    required={!editingUser}
                    value={formData.Password}
                    onChange={e => setFormData({...formData, Password: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-purple-500 outline-none font-semibold transition-all"
                    placeholder={editingUser ? "••••••••" : "Nhập mật khẩu an toàn"}
                  />
               </div>

               <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Quyền Hạn (Role)</label>
                  <select 
                    value={formData.UserRole}
                    onChange={e => setFormData({...formData, UserRole: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-purple-500 outline-none font-black appearance-none bg-white uppercase text-sm"
                  >
                    <option value="Cashier">Cashier (Thu Ngân)</option>
                    <option value="Kitchen">Kitchen (Bếp Đầu)</option>
                    <option value="Admin">Admin (Quản trị viên)</option>
                  </select>
               </div>
               
               <div className="pt-4 mt-6 border-t border-gray-100 flex gap-3">
                 <button 
                   type="button" 
                   onClick={closeModal}
                   className="flex-1 px-6 py-3 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
                 >
                   Hủy bỏ
                 </button>
                 <button 
                   type="submit" 
                   className="flex-1 px-6 py-3 rounded-xl font-bold text-white bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-600/30 transition-all active:scale-95"
                 >
                   {editingUser ? "Lưu thay đổi" : "Khởi tạo TK"}
                 </button>
               </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminStaff;
