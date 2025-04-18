// src/pages/InventoryStock.jsx
import React, { useState, useCallback } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import DataTable from "../components/common/DataTable";
import Pagination from "../components/common/Pagination";

// Dữ liệu giả lập
const initialStockData = [
  {
    id: "TS001",
    name: "Máy tính xách tay",
    type: "Điện tử",
    quantity: 8,
    status: "Tốt",
  },
  {
    id: "TS002",
    name: "Bàn làm việc",
    type: "Nội thất",
    quantity: 17,
    status: "Tốt",
  },
];

const InventoryStock = ({ setIsAuthenticated }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAssetType, setFilterAssetType] = useState("all");

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleFilterChange = useCallback((e) => {
    setFilterAssetType(e.target.value);
  }, []);

  // Lọc dữ liệu dựa trên searchTerm và filterAssetType
  const filteredData = initialStockData.filter((item) => {
    const matchesSearch = Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesFilter = filterAssetType === "all" || item.type === filterAssetType;
    return matchesSearch && matchesFilter;
  });

  const columns = [
    { key: "id", label: "Mã tài sản" },
    { key: "name", label: "Tên tài sản" },
    { key: "type", label: "Loại tài sản" },
    { key: "quantity", label: "Số lượng tồn" },
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
            title="Danh sách tồn kho"
            filterComponent={
              <div className="relative">
                <select
                  value={filterAssetType}
                  onChange={handleFilterChange}
                  className="border rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Tất cả</option>
                  <option value="Điện tử">Điện tử</option>
                  <option value="Nội thất">Nội thất</option>
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

export default InventoryStock;