import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Search, X, Grid, Layout } from "lucide-react";
import { request } from "../../api/apiClient";
import { ToastContainer, useToast } from "../../components/ui/Toast";
import { useConfirm } from "../../components/ui/ConfirmDialog";

const AdminTables = () => {
    const { toast } = useToast();
    const { confirm, ConfirmDialogComponent } = useConfirm();
    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTable, setEditingTable] = useState(null);
    const [formData, setFormData] = useState({
        TableNumber: "",
        Status: "Available"
    });

    useEffect(() => {
        fetchTables();
    }, []);

    const fetchTables = async () => {
        try {
            setLoading(true);
            const res = await request("/admin_tables_crud.php");
            setTables(Array.isArray(res) ? res : []);
        } catch (error) {
            toast.error("Lỗi tải danh sách bàn", "Không thể kết nối máy chủ.");
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (table = null) => {
        if (table) {
            setEditingTable(table);
            setFormData({
                TableNumber: table.TableNumber,
                Status: table.Status
            });
        } else {
            setEditingTable(null);
            setFormData({
                TableNumber: "",
                Status: "Available"
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingTable(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingTable) {
                await request("/admin_tables_crud.php", {
                    method: "PUT",
                    body: { TableID: editingTable.TableID, ...formData }
                });
                toast.success("Đã cập nhật", `Bàn ${formData.TableNumber} đã được lưu.`);
            } else {
                await request("/admin_tables_crud.php", {
                    method: "POST",
                    body: formData
                });
                toast.success("Đã thêm bàn", `Bàn mới ${formData.TableNumber} đã được tạo.`);
            }
            closeModal();
            fetchTables();
        } catch (error) {
            toast.error("Lỗi thao tác", error.message);
        }
    };

    const handleDelete = async (tableId) => {
        const table = tables.find(t => t.TableID === tableId);
        const ok = await confirm({
            title: "Xóa bàn?",
            message: `Bạn có chắc chắn muốn xóa bàn "${table?.TableNumber}"?`,
            type: "danger",
            confirmText: "Xóa vĩnh viễn"
        });
        if (!ok) return;

        try {
            await request("/admin_tables_crud.php", {
                method: "DELETE",
                body: { TableID: tableId }
            });
            toast.success("Đã xóa", "Thông tin bàn đã bị loại bỏ.");
            fetchTables();
        } catch (error) {
            toast.error("Không thể xóa", error.message);
        }
    };

    const filteredTables = tables.filter(t => 
        t.TableNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusStyle = (status) => {
        switch (status) {
            case "Available": return "bg-green-100 text-green-700 border-green-200";
            case "Occupied": return "bg-red-100 text-red-700 border-red-200";
            case "Pending": return "bg-yellow-100 text-yellow-700 border-yellow-200";
            default: return "bg-gray-100 text-gray-700 border-gray-200";
        }
    };

    return (
        <div className="space-y-6 max-w-[1200px] mx-auto animate-in fade-in duration-500">
            {ConfirmDialogComponent}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 pb-4">
                <div>
                    <h2 className="text-3xl font-black text-gray-800 flex items-center gap-3">
                        <span className="bg-blue-600 w-1.5 h-8 rounded-full"></span>
                        Quản lý Bàn ăn
                    </h2>
                    <p className="text-gray-500 mt-1">Quản lý sơ đồ và tình trạng bàn trong nhà hàng</p>
                </div>

                <button 
                    onClick={() => handleOpenModal()}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all active:scale-95 whitespace-nowrap"
                >
                    <Plus size={20} />
                    Thêm Bàn mới
                </button>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col min-h-[60vh]">
                <div className="p-4 border-b border-gray-100 flex gap-4 bg-gray-50/50">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Tìm theo số bàn..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-medium"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                            {filteredTables.map(table => (
                                <div key={table.TableID} className="group relative bg-white border-2 hover:border-blue-500 rounded-3xl p-6 transition-all shadow-sm hover:shadow-xl flex flex-col items-center gap-4">
                                    <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-blue-600">
                                        <Grid size={32} />
                                    </div>
                                    <div className="text-center">
                                        <p className="font-black text-xl text-gray-800 uppercase tracking-tight">{table.TableNumber}</p>
                                        <span className={`mt-2 inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusStyle(table.Status)}`}>
                                            {table.Status === 'Available' ? 'Trống' : table.Status === 'Occupied' ? 'Đang ăn' : 'Đang chờ'}
                                        </span>
                                    </div>

                                    {/* Action buttons overlay on hover */}
                                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button 
                                            onClick={() => handleOpenModal(table)}
                                            className="p-1.5 bg-white shadow-md rounded-lg text-gray-400 hover:text-blue-600 border border-gray-100"
                                        >
                                            <Edit2 size={14} />
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(table.TableID)}
                                            className="p-1.5 bg-white shadow-md rounded-lg text-gray-400 hover:text-red-600 border border-gray-100"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Modal Add/Edit */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={closeModal} />
                    <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <h3 className="font-black text-xl text-gray-800 flex items-center gap-2">
                                <Layout className="text-blue-600" size={24} />
                                {editingTable ? "Chỉnh sửa Bàn" : "Thêm Bàn mới"}
                            </h3>
                            <button onClick={closeModal} className="text-gray-400 hover:text-red-500 transition-colors p-1 bg-white rounded-lg shadow-sm border border-gray-200">
                                <X size={20} />
                            </button>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Số hiệu Bàn (VD: Bàn 01) <span className="text-red-500">*</span></label>
                                <input 
                                    type="text" 
                                    required 
                                    value={formData.TableNumber}
                                    onChange={e => setFormData({...formData, TableNumber: e.target.value})}
                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none font-black text-lg transition-all"
                                    placeholder="Nhập số bàn..."
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Trạng thái hiện tại</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {['Available', 'Occupied', 'Pending'].map(status => (
                                        <button
                                            key={status}
                                            type="button"
                                            onClick={() => setFormData({...formData, Status: status})}
                                            className={`py-2 rounded-xl text-[10px] font-black uppercase transition-all border-2
                                                ${formData.Status === status 
                                                    ? 'bg-blue-600 border-blue-600 text-white shadow-md' 
                                                    : 'bg-gray-50 border-gray-100 text-gray-400 hover:border-blue-200'}
                                            `}
                                        >
                                            {status === 'Available' ? 'Trống' : status === 'Occupied' ? 'Đang ăn' : 'Đang chờ'}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="pt-4 flex gap-3">
                                <button 
                                    type="button" 
                                    onClick={closeModal}
                                    className="flex-1 px-6 py-3 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
                                >
                                    Hủy bỏ
                                </button>
                                <button 
                                    type="submit" 
                                    className="flex-1 px-6 py-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/30 transition-all active:scale-95"
                                >
                                    {editingTable ? "Lưu thay đổi" : "Khởi tạo"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminTables;
