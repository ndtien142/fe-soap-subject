// src/pages/SupplierList.jsx
import React, { useState, useCallback } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import DataTable from "../components/common/DataTable";
import AddFormModal from "../components/common/AddFormModal";
import DetailModal from "../components/common/DetailModal";
import EditFormModal from "../components/common/EditFormModal";
import Pagination from "../components/common/Pagination";

// Dữ liệu giả lập
const initialSupplierData = [
  {
    id: "NCC001",
    name: "Công ty TNHH ABC",
    contact: "Nguyễn Văn A",
    phone: "0901234567",
    email: "abc@company.com",
    address: "123 Đường Láng, Hà Nội",
  },
  {
    id: "NCC002",
    name: "Công ty CP XYZ",
    contact: "Trần Thị B",
    phone: "0912345678",
    email: "xyz@company.com",
    address: "456 Nguyễn Trãi, TP.HCM",
  },
];

const SupplierList = ({ setIsAuthenticated }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [supplierData, setSupplierData] = useState(initialSupplierData);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [newSupplier, setNewSupplier] = useState({
    id: "",
    name: "",
    contact: "",
    phone: "",
    email: "",
    address: "",
  });

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleAddSupplier = useCallback(
    (e) => {
      e.preventDefault();
      setSupplierData((prevData) => [...prevData, newSupplier]);
      setNewSupplier({
        id: "",
        name: "",
        contact: "",
        phone: "",
        email: "",
        address: "",
      });
      setShowAddForm(false);
    },
    [newSupplier]
  );

  const handleShowDetail = useCallback((supplier) => {
    setSelectedSupplier(supplier);
    setShowDetailModal(true);
  }, []);

  const handleShowEdit = useCallback((supplier) => {
    setSelectedSupplier({ ...supplier });
    setShowEditModal(true);
  }, []);

  const handleEditSupplier = useCallback(
    (e) => {
      e.preventDefault();
      setSupplierData((prevData) =>
        prevData.map((supplier) =>
          supplier.id === selectedSupplier.id ? selectedSupplier : supplier
        )
      );
      setShowEditModal(false);
      setSelectedSupplier(null);
    },
    [selectedSupplier]
  );

  const handleDeleteSupplier = useCallback((id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa nhà cung cấp này?")) {
      setSupplierData((prevData) => prevData.filter((supplier) => supplier.id !== id));
    }
  }, []);

  const columns = [
    { key: "id", label: "Mã nhà cung cấp" },
    { key: "name", label: "Tên nhà cung cấp" },
    { key: "contact", label: "Người liên hệ" },
    { key: "phone", label: "Số điện thoại" },
    { key: "email", label: "Email" },
    { key: "address", label: "Địa chỉ" },
  ];

  const fields = [
    { name: "id", label: "Mã nhà cung cấp", type: "text", required: true },
    { name: "name", label: "Tên nhà cung cấp", type: "text", required: true },
    { name: "contact", label: "Người liên hệ", type: "text", required: true },
    { name: "phone", label: "Số điện thoại", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "address", label: "Địa chỉ", type: "text", required: true },
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
            data={supplierData}
            searchTerm={searchTerm}
            onSearch={handleSearch}
            onShowDetail={handleShowDetail}
            onShowEdit={handleShowEdit}
            onDelete={handleDeleteSupplier}
            title="Danh sách nhà cung cấp"
          />
          <Pagination totalItems={supplierData.length} />
          <AddFormModal
            isOpen={showAddForm}
            onClose={() => setShowAddForm(false)}
            onSubmit={handleAddSupplier}
            fields={fields}
            title="Thêm nhà cung cấp mới"
            newItem={newSupplier}
            setNewItem={setNewSupplier}
          />
          <DetailModal
            isOpen={showDetailModal}
            onClose={() => setShowDetailModal(false)}
            item={selectedSupplier}
            fields={fields}
            title="Chi tiết nhà cung cấp"
          />
          <EditFormModal
            isOpen={showEditModal}
            onClose={() => setShowEditModal(false)}
            onSubmit={handleEditSupplier}
            fields={editFields}
            title="Chỉnh sửa nhà cung cấp"
            selectedItem={selectedSupplier}
            setSelectedItem={setSelectedSupplier}
          />
        </main>
      </div>
    </div>
  );
};

export default SupplierList;