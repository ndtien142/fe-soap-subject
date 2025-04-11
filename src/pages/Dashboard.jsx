import React from "react";
import { useNavigate } from "react-router-dom";
import WarehouseOverview from "./WarehouseOverview";
import WarehouseTable from "./WarehouseTable";
import Filter from "../components/Filter";
import RequestManagement from "../components/requests/RequestManagement";
import AlertsList from "../components/alerts/AlertList";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header và logout */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Quản lý kho hàng</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Đăng xuất
        </button>
      </div>

      {/* Dashboard Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Tổng quan kho hàng */}
        <div className="md:col-span-1 bg-white p-4 shadow-lg rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Tổng quan kho hàng
          </h2>
          <WarehouseOverview />
        </div>

        {/* Danh sách vật tư */}
        <div className="md:col-span-2 bg-white p-4 shadow-lg rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Danh sách vật tư
          </h2>
          <Filter />
          <WarehouseTable />
        </div>

        {/* Yêu cầu cấp phát */}
        <div className="md:col-span-2 bg-white p-4 shadow-lg rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Quản lý yêu cầu cấp phát
          </h2>
          <RequestManagement />
        </div>

        {/* Danh sách cảnh báo */}
        <div className="md:col-span-1 bg-white p-4 shadow-lg rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Cảnh báo
          </h2>
          <AlertsList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

