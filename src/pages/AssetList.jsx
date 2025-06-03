// src/pages/AssetList.jsx
import React, { useState, useCallback } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import DataTable from "../components/common/DataTable";
import Pagination from "../components/common/Pagination";
import AddFormModal from "../components/common/AddFormModal";
import FormInput from "../components/common/FormInput";
import Html5QrcodePlugin from "../components/Html5QrcodePlugin";

const initialAssetData = [
  { id: "TS001", name: "Máy chiếu", serialNumber: "SN001", purchaseDate: "2024-01-15", value: 10000000 },
  { id: "TS002", name: "Máy tính", serialNumber: "SN002", purchaseDate: "2023-06-20", value: 500000000 },
  { id: "TS003", name: "Bàn", serialNumber: "SN003", purchaseDate: "2025-05-15", value: 1500000 },
];

const AssetList = ({ setIsAuthenticated }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [assetData, setAssetData] = useState(initialAssetData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAsset, setNewAsset] = useState({
    id: "",
    name: "",
    serialNumber: "",
    purchaseDate: "",
    value: "",
  });

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleAddNew = () => {
    setIsModalOpen(true);
  };

  const handleModalSubmit = () => {
    if (!newAsset.id || !newAsset.name || !newAsset.serialNumber || !newAsset.purchaseDate || !newAsset.value) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    setAssetData((prevData) => [...prevData, newAsset]);
    setIsModalOpen(false);
    setNewAsset({ id: "", name: "", serialNumber: "", purchaseDate: "", value: "" });
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setNewAsset({ id: "", name: "", serialNumber: "", purchaseDate: "", value: "" });
  };

  const handleScan = (serialNumber) => {
    setNewAsset((prev) => ({ ...prev, serialNumber }));
  };

  const handleShowDetail = (item) => {
    alert(`Chi tiết nhóm tài sản: ${JSON.stringify(item)}`);
  };

  const handleShowEdit = (item) => {
    setNewAsset(item);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setAssetData((prevData) => prevData.filter((item) => item.id !== id));
  };

  const columns = [
    { key: "id", label: "Mã nhóm tài sản" },
    { key: "name", label: "Tên nhóm tài sản" },
    { key: "serialNumber", label: "Mã serial" },
    { key: "purchaseDate", label: "Ngày mua" },
    { key: "value", label: "Giá trị" },
  ];

  const renderActions = (item) => (
    <div className="flex space-x-2">
      <button
        onClick={() => handleShowDetail(item)}
        className="text-blue-500 hover:text-blue-700"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      </button>
      <button
        onClick={() => handleShowEdit(item)}
        className="text-blue-500 hover:text-blue-700"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      </button>
      <button
        onClick={() => handleDelete(item.id)}
        className="text-red-500 hover:text-red-700"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4M4 7h16"
          />
        </svg>
      </button>
    </div>
  );

  const filteredData = assetData.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const fields = [
    { name: "id", label: "Mã nhóm tài sản", type: "text", required: true },
    { name: "name", label: "Tên nhóm tài sản", type: "text", required: true },
    { name: "serialNumber", label: "Mã serial", type: "text", required: true },
    { name: "purchaseDate", label: "Ngày mua", type: "date", required: true },
    { name: "value", label: "Giá trị", type: "number", required: true },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col">
        <Header setIsAuthenticated={setIsAuthenticated} />
        <main className="p-6 flex-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Danh sách nhóm tài sản</h2>
            <button
              onClick={handleAddNew}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Thêm nhóm tài sản
            </button>
          </div>

          <DataTable
            columns={columns}
            data={filteredData}
            searchTerm={searchTerm}
            onSearch={handleSearch}
            title=""
            renderActions={renderActions}
          />
          <Pagination totalItems={filteredData.length} />

          <AddFormModal
            isOpen={isModalOpen}
            onClose={handleModalClose}
            onSubmit={handleModalSubmit}
            fields={fields}
            title="Thêm nhóm tài sản mới"
            newItem={newAsset}
            setNewItem={setNewAsset}
            extraContent={<Html5QrcodePlugin onScan={handleScan} />}
          />
        </main>
      </div>
    </div>
  );
};

export default AssetList;