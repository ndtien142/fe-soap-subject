
import React, { useState, useCallback, useEffect } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import DataTable from "../components/common/DataTable";
import Pagination from "../components/common/Pagination";

const InventoryStock = ({ setIsAuthenticated }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [inventoryData, setInventoryData] = useState(() => {
    const savedData = localStorage.getItem("inventoryStock");
    return savedData ? JSON.parse(savedData) : [];
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const savedData = localStorage.getItem("inventoryStock");
      setInventoryData(savedData ? JSON.parse(savedData) : []);
    };

    window.addEventListener("storage", handleStorageChange);
    handleStorageChange(); // Cập nhật lần đầu

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const columns = [
    { key: "id", label: "Mã tài sản" },
    { key: "name", label: "Tên tài sản" },
    { key: "quantity", label: "Số lượng tồn" },
    { key: "location", label: "Vị trí" },
  ];

  const filteredData = inventoryData.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col">
        <Header setIsAuthenticated={setIsAuthenticated} />
        <main className="p-6 flex-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Tồn kho</h2>
          </div>

          <DataTable
            columns={columns}
            data={filteredData}
            searchTerm={searchTerm}
            onSearch={handleSearch}
            title=""
          />
          <Pagination totalItems={filteredData.length} />
        </main>
      </div>
    </div>
  );
};

export default InventoryStock;