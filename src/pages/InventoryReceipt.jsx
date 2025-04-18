// src/pages/InventoryReceipt.jsx
import React, { useState, useCallback } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import DataTable from "../components/common/DataTable";
import AddFormModal from "../components/common/AddFormModal";
import DetailModal from "../components/common/DetailModal";
import EditFormModal from "../components/common/EditFormModal";
import Pagination from "../components/common/Pagination";

// Dữ liệu giả lập
const initialReceiptData = [
  {
    id: "PN001",
    assetId: "TS001",
    assetName: "Máy tính xách tay",
    quantity: 5,
    date: "2023-01-15",
    supplier: "Công ty TNHH ABC",
  },
  {
    id: "PN002",
    assetId: "TS002",
    assetName: "Bàn làm việc",
    quantity: 10,
    date: "2022-06-20",
    supplier: "Công ty CP XYZ",
  },
];

const InventoryReceipt = ({ setIsAuthenticated }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [receiptData, setReceiptData] = useState(initialReceiptData);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [newReceipt, setNewReceipt] = useState({
    id: "",
    assetId: "",
    assetName: "",
    quantity: "",
    date: "",
    supplier: "",
  });

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleAddReceipt = useCallback(
    (e) => {
      e.preventDefault();
      setReceiptData((prevData) => [...prevData, newReceipt]);
      setNewReceipt({
        id: "",
        assetId: "",
        assetName: "",
        quantity: "",
        date: "",
        supplier: "",
      });
      setShowAddForm(false);
    },
    [newReceipt]
  );

  const handleShowDetail = useCallback((receipt) => {
    setSelectedReceipt(receipt);
    setShowDetailModal(true);
  }, []);

  const handleShowEdit = useCallback((receipt) => {
    setSelectedReceipt({ ...receipt });
    setShowEditModal(true);
  }, []);

  const handleEditReceipt = useCallback(
    (e) => {
      e.preventDefault();
      setReceiptData((prevData) =>
        prevData.map((receipt) =>
          receipt.id === selectedReceipt.id ? selectedReceipt : receipt
        )
      );
      setShowEditModal(false);
      setSelectedReceipt(null);
    },
    [selectedReceipt]
  );

  const handleDeleteReceipt = useCallback((id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa phiếu nhập này?")) {
      setReceiptData((prevData) => prevData.filter((receipt) => receipt.id !== id));
    }
  }, []);

  const columns = [
    { key: "id", label: "Mã phiếu nhập" },
    { key: "assetId", label: "Mã tài sản" },
    { key: "assetName", label: "Tên tài sản" },
    { key: "quantity", label: "Số lượng" },
    { key: "date", label: "Ngày nhập" },
    { key: "supplier", label: "Nhà cung cấp" },
  ];

  const fields = [
    { name: "id", label: "Mã phiếu nhập", type: "text", required: true },
    { name: "assetId", label: "Mã tài sản", type: "text", required: true },
    { name: "assetName", label: "Tên tài sản", type: "text", required: true },
    { name: "quantity", label: "Số lượng", type: "number", required: true },
    { name: "date", label: "Ngày nhập", type: "date", required: true },
    { name: "supplier", label: "Nhà cung cấp", type: "text", required: true },
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
            data={receiptData}
            searchTerm={searchTerm}
            onSearch={handleSearch}
            onShowDetail={handleShowDetail}
            onShowEdit={handleShowEdit}
            onDelete={handleDeleteReceipt}
            title="Danh sách phiếu nhập"
          />
          <Pagination totalItems={receiptData.length} />
          <AddFormModal
            isOpen={showAddForm}
            onClose={() => setShowAddForm(false)}
            onSubmit={handleAddReceipt}
            fields={fields}
            title="Thêm phiếu nhập mới"
            newItem={newReceipt}
            setNewItem={setNewReceipt}
          />
          <DetailModal
            isOpen={showDetailModal}
            onClose={() => setShowDetailModal(false)}
            item={selectedReceipt}
            fields={fields}
            title="Chi tiết phiếu nhập"
          />
          <EditFormModal
            isOpen={showEditModal}
            onClose={() => setShowEditModal(false)}
            onSubmit={handleEditReceipt}
            fields={editFields}
            title="Chỉnh sửa phiếu nhập"
            selectedItem={selectedReceipt}
            setSelectedItem={setSelectedReceipt}
          />
        </main>
      </div>
    </div>
  );
};

export default InventoryReceipt;