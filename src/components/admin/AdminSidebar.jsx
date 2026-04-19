import React from "react";

import { NavLink, useNavigate, Link } from "react-router-dom";
import {
  BarChart3,
  FileText,
  MessageSquare,
  ListChecks,
  Users,
  Package,
  Grid,
  LogOut
} from "lucide-react";

const AdminSidebarItem = ({ icon: Icon, label, to, isOpen, end = false }) => {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) => `
        flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group relative
        ${isActive
          ? "bg-[#FFF1CA] text-[#850A0A] shadow-md font-bold"
          : "text-[#FFF1CA]/70 hover:bg-[#A00000] hover:text-[#FFF1CA]"
        }
      `}
      title={!isOpen ? label : ""}
    >
      <div className="relative">
        <Icon size={22} className={isOpen ? "" : "mx-auto"} />
      </div>

      {isOpen && (
        <span className="text-sm font-semibold tracking-wide whitespace-nowrap overflow-hidden transition-all duration-300">
          {label}
        </span>
      )}

      {/* Tooltip khi sidebar gập */}
      {!isOpen && (
        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-4 px-3 py-1.5 bg-gray-900 text-white text-xs font-bold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap whitespace-nowrap shadow-xl">
          {label}
        </div>
      )}
    </NavLink>
  );
};

const AdminSidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/signin");
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`
          fixed md:relative z-50 h-screen transition-all duration-300 shadow-2xl flex flex-col
          ${isOpen ? "w-64 translate-x-0" : "w-20 -translate-x-full md:translate-x-0"}
        `}
        style={{ backgroundColor: "#850A0A" }}
      >
        {/* Logo Section */}
        <div className="flex-shrink-0 p-4 border-b border-[#FFF1CA]/10">
          <div
            className="flex items-center gap-3 bg-[#600606] p-3 rounded-xl cursor-pointer"
            onClick={toggleSidebar}
          >
            <div className="w-10 h-10 bg-[#FFF1CA] rounded-lg shrink-0 flex items-center justify-center font-black text-xl text-[#850A0A]">
              H.
            </div>
            {isOpen && (
              <div className="flex flex-col overflow-hidden">
                <span className="font-serif font-black text-[#FFF1CA] uppercase tracking-widest leading-none">
                  WuYang
                </span>
                <span className="text-[10px] text-[#FFF1CA]/60 font-bold uppercase tracking-widest mt-1">
                  Manager Hub
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Section */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-2 custom-scrollbar">
          <AdminSidebarItem
            icon={BarChart3}
            label="Tổng quan"
            to="/admin"
            isOpen={isOpen}
            end={true}
          />
          <AdminSidebarItem
            icon={FileText}
            label="Hóa đơn"
            to="/admin/bills"
            isOpen={isOpen}
          />
          <AdminSidebarItem
            icon={MessageSquare}
            label="Đánh giá"
            to="/admin/feedbacks"
            isOpen={isOpen}
          />
          <AdminSidebarItem
            icon={ListChecks}
            label="Thực đơn"
            to="/admin/menu"
            isOpen={isOpen}
          />
          <AdminSidebarItem
            icon={Grid}
            label="Sơ đồ Bàn"
            to="/admin/tables"
            isOpen={isOpen}
          />
          <AdminSidebarItem
            icon={Users}
            label="Nhân viên"
            to="/admin/staff"
            isOpen={isOpen}
          />
          <AdminSidebarItem
            icon={Package}
            label="Quản lý Kho"
            to="/admin/inventory"
            isOpen={isOpen}
          />
        </div>

        {/* Footer Section */}
        <div className="flex-shrink-0 p-4 shrink-0 border-t border-[#FFF1CA]/10 space-y-2">
          <div className="group cursor-pointer">
            <div className={`
              flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300
              bg-black/20 text-[#FFF1CA] hover:bg-black/40
            `}>
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FFF1CA] to-[#D4AF37] text-[#850A0A] shrink-0 flex items-center justify-center font-bold text-sm">
                A
              </div>
              {isOpen && (
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-bold truncate">Admin User</span>
                  <span className="text-[10px] text-[#FFF1CA]/50 uppercase tracking-widest font-black">Manager</span>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleLogout}
            className={`
            w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
            text-[#FFF1CA]/70 hover:bg-red-950 hover:text-white mt-2
          `}
            title={!isOpen ? "Đăng xuất" : ""}
          >
            <LogOut size={22} className={isOpen ? "" : "mx-auto"} />
            {isOpen && <span className="text-sm font-semibold">Đăng xuất</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
