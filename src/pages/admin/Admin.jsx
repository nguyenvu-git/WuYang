import React, { useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { Menu } from "lucide-react";
import { Outlet } from "react-router-dom";

const Admin = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "#F9FAFB" }}>
      {/* Sidebar điều hướng */}
      <AdminSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 flex flex-col min-w-0 h-full">
        {/* Header */}
        <header className="h-16 shrink-0 bg-white shadow-sm flex items-center px-6 border-b border-gray-100 z-10">
          <button
            onClick={toggleSidebar}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu size={24} />
          </button>
          
          <div className="ml-4 flex items-center">
            <div className="hidden md:block">
              <h1 className="text-xl font-black text-gray-800 tracking-tight">Hệ Thống Quản Trị Trung Tâm</h1>
              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Administrator Portal</p>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-4 md:p-6 overflow-y-auto flex-1 custom-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Admin;
