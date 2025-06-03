// src/pages/InventoryHistory.jsx
import React, { useState, useCallback } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import DataTable from "../components/common/DataTable";
import Pagination from "../components/common/Pagination";

// Dữ liệu giả lập
const initialHistoryData = [
  {
    id: "GD001",
    type: "Nhập",
    assetId: "TS001",
    assetName: "Máy tính xách tay",
    quantity: 5,
    date: "2023-01-15",
    performedBy: "Nguyễn Văn A",
  },
  {
    id: "GD002",
    type: "Xuất",
    assetId: "TS002",
    assetName: "Bàn làm việc",
    quantity: 3,
    date: "2023-02-10",
    performedBy: "Trần Thị B",
  },
];

const InventoryHistory = ({ setIsAuthenticated }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleFilterChange = useCallback((e) => {
    setFilterType(e.target.value);
  }, []);

  // Lọc dữ liệu dựa trên searchTerm và filterType
  const filteredData = initialHistoryData.filter((item) => {
    const matchesSearch = Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesFilter = filterType === "all" || item.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const columns = [
    { key: "id", label: "Mã giao dịch" },
    { key: "type", label: "Loại giao dịch" },
    { key: "assetId", label: "Mã tài sản" },
    { key: "assetName", label: "Tên tài sản" },
    { key: "quantity", label: "Số lượng" },
    { key: "date", label: "Ngày giao dịch" },
    { key: "performedBy", label: "Người thực hiện" },
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
            title="Lịch sử xuất nhập kho"
            filterComponent={
              <div className="relative">
                <select
                  value={filterType}
                  onChange={handleFilterChange}
                  className="border rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Tất cả</option>
                  <option value="Nhập">Nhập</option>
                  <option value="Xuất">Xuất</option>
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

export default InventoryHistory;