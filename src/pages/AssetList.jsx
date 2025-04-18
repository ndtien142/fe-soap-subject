// src/pages/AssetList.jsx
import React, { useState, useCallback } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import DataTable from "../components/common/DataTable";
import AddFormModal from "../components/common/AddFormModal";
import DetailModal from "../components/common/DetailModal";
import EditFormModal from "../components/common/EditFormModal";
import Pagination from "../components/common/Pagination";

// Dữ liệu giả lập
const initialAssetData = [
  { id: "TS001", name: "Máy tính xách tay", type: "Điện tử", quantity: 10, status: "Tốt" },
  { id: "TS002", name: "Bàn làm việc", type: "Nội thất", quantity: 20, status: "Tốt" },
];

const AssetList = ({ setIsAuthenticated }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [assetData, setAssetData] = useState(initialAssetData);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [newAsset, setNewAsset] = useState({
    id: "",
    name: "",
    type: "",
    quantity: "",
    status: "",
  });

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleAddAsset = useCallback(
    (e) => {
      e.preventDefault();
      setAssetData((prevData) => [...prevData, newAsset]);
      setNewAsset({ id: "", name: "", type: "", quantity: "", status: "" });
      setShowAddForm(false);
    },
    [newAsset]
  );

  const handleShowDetail = useCallback((asset) => {
    setSelectedAsset(asset);
    setShowDetailModal(true);
  }, []);

  const handleShowEdit = useCallback((asset) => {
    setSelectedAsset({ ...asset });
    setShowEditModal(true);
  }, []);

  const handleEditAsset = useCallback(
    (e) => {
      e.preventDefault();
      setAssetData((prevData) =>
        prevData.map((asset) => (asset.id === selectedAsset.id ? selectedAsset : asset))
      );
      setShowEditModal(false);
      setSelectedAsset(null);
    },
    [selectedAsset]
  );

  const handleDeleteAsset = useCallback((id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa tài sản này?")) {
      setAssetData((prevData) => prevData.filter((asset) => asset.id !== id));
    }
  }, []);

  const columns = [
    { key: "id", label: "Mã tài sản" },
    { key: "name", label: "Tên tài sản" },
    { key: "type", label: "Loại tài sản" },
    { key: "quantity", label: "Số lượng" },
    { key: "status", label: "Trạng thái" },
  ];

  const fields = [
    { name: "id", label: "Mã tài sản", type: "text", required: true },
    { name: "name", label: "Tên tài sản", type: "text", required: true },
    { name: "type", label: "Loại tài sản", type: "text", required: true },
    { name: "quantity", label: "Số lượng", type: "number", required: true },
    { name: "status", label: "Trạng thái", type: "text", required: true },
  ];

  const editFields = fields.map((field) => ({
    ...field,
    disabled: field.name === "id",
  }));

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col">
        <Header setIsAuthenticated={setIsAuthenticated} />
        <main className="p-6 flex-1">
          <div className="mb-4">
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              Thêm mới
            </button>
          </div>
          <DataTable
            columns={columns}
            data={assetData}
            searchTerm={searchTerm}
            onSearch={handleSearch}
            onShowDetail={handleShowDetail}
            onShowEdit={handleShowEdit}
            onDelete={handleDeleteAsset}
            title="Danh sách tài sản"
          />
          <Pagination totalItems={assetData.length} />
          <AddFormModal
            isOpen={showAddForm}
            onClose={() => setShowAddForm(false)}
            onSubmit={handleAddAsset}
            fields={fields}
            title="Thêm tài sản mới"
            newItem={newAsset}
            setNewItem={setNewAsset}
          />
          <DetailModal
            isOpen={showDetailModal}
            onClose={() => setShowDetailModal(false)}
            item={selectedAsset}
            fields={fields}
            title="Chi tiết tài sản"
          />
          <EditFormModal
            isOpen={showEditModal}
            onClose={() => setShowEditModal(false)}
            onSubmit={handleEditAsset}
            fields={editFields}
            title="Chỉnh sửa tài sản"
            selectedItem={selectedAsset}
            setSelectedItem={setSelectedAsset}
          />
        </main>
      </div>
    </div>
  );
};

export default AssetList;