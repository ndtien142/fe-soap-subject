// src/pages/AssetManagement.jsx
import React, { useState, useCallback } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import DataTable from "../components/common/DataTable";
import Pagination from "../components/common/Pagination";

// Dữ liệu giả lập
const initialAssetData = [
  {
    id: "TS001",
    name: "Máy chiếu",
    type: "Điện tử",
    initialValue: 15000000, // Giá trị ban đầu (VNĐ)
    purchaseDate: "2022-01-15",
    depreciationRate: 0.2, // Tỷ lệ khấu hao hàng năm (20%)
    status: "Đang sử dụng",
  },
  {
    id: "TS002",
    name: "Xe tải",
    type: "Phương tiện",
    initialValue: 500000000,
    purchaseDate: "2021-06-10",
    depreciationRate: 0.1, // Tỷ lệ khấu hao hàng năm (10%)
    status: "Đang bảo trì",
  },
];

// Hàm tính khấu hao và giá trị còn lại
const calculateDepreciation = (initialValue, purchaseDate, depreciationRate) => {
  const purchaseYear = new Date(purchaseDate).getFullYear();
  const currentYear = new Date().getFullYear();
  const yearsUsed = currentYear - purchaseYear;
  const totalDepreciation = initialValue * depreciationRate * yearsUsed;
  const remainingValue = initialValue - totalDepreciation;
  return {
    totalDepreciation: totalDepreciation > initialValue ? initialValue : totalDepreciation,
    remainingValue: remainingValue < 0 ? 0 : remainingValue,
  };
};

const AssetManagement = ({ setIsAuthenticated }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleFilterChange = useCallback((e) => {
    setFilterStatus(e.target.value);
  }, []);

  // Lọc dữ liệu dựa trên searchTerm và filterStatus
  const filteredData = initialAssetData
    .map((item) => {
      const { totalDepreciation, remainingValue } = calculateDepreciation(
        item.initialValue,
        item.purchaseDate,
        item.depreciationRate
      );
      return {
        ...item,
        totalDepreciation,
        remainingValue,
      };
    })
    .filter((item) => {
      const matchesSearch = Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
      const matchesFilter = filterStatus === "all" || item.status === filterStatus;
      return matchesSearch && matchesFilter;
    });

  const columns = [
    { key: "id", label: "Mã tài sản" },
    { key: "name", label: "Tên tài sản" },
    { key: "type", label: "Loại tài sản" },
    {
      key: "initialValue",
      label: "Giá trị ban đầu",
      render: (value) => value.toLocaleString("vi-VN", { style: "currency", currency: "VND" }),
    },
    { key: "purchaseDate", label: "Ngày mua" },
    {
      key: "totalDepreciation",
      label: "Khấu hao",
      render: (value) => value.toLocaleString("vi-VN", { style: "currency", currency: "VND" }),
    },
    {
      key: "remainingValue",
      label: "Giá trị còn lại",
      render: (value) => value.toLocaleString("vi-VN", { style: "currency", currency: "VND" }),
    },
    { key: "status", label: "Trạng thái" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col">
        <Header setIsAuthenticated={setIsAuthenticated} />
        <main className="p-6 flex-1">
          <DataTable
            columns={columns}
            data={filteredData}
            searchTerm={searchTerm}
            onSearch={handleSearch}
            title="Quản lý tài sản"
            filterComponent={
              <div className="relative">
                <select
                  value={filterStatus}
                  onChange={handleFilterChange}
                  className="border rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Tất cả</option>
                  <option value="Đang sử dụng">Đang sử dụng</option>
                  <option value="Đang bảo trì">Đang bảo trì</option>
                  <option value="Đã thanh lý">Đã thanh lý</option>
                </select>
              </div>
            }
          />
          <Pagination totalItems={filteredData.length} />
        </main>
      </div>
    </div>
  );
};

export default AssetManagement;