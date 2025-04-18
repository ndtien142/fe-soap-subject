// src/pages/InventoryIssue.jsx
import React, { useState, useCallback } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import DataTable from "../components/common/DataTable";
import AddFormModal from "../components/common/AddFormModal";
import DetailModal from "../components/common/DetailModal";
import EditFormModal from "../components/common/EditFormModal";
import Pagination from "../components/common/Pagination";

// Dữ liệu giả lập
const initialIssueData = [
  {
    id: "PX001",
    assetId: "TS001",
    assetName: "Máy tính xách tay",
    quantity: 2,
    date: "2023-02-10",
    recipient: "Phòng IT",
  },
  {
    id: "PX002",
    assetId: "TS002",
    assetName: "Bàn làm việc",
    quantity: 3,
    date: "2022-07-15",
    recipient: "Phòng Kế toán",
  },
];

const InventoryIssue = ({ setIsAuthenticated }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [issueData, setIssueData] = useState(initialIssueData);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [newIssue, setNewIssue] = useState({
    id: "",
    assetId: "",
    assetName: "",
    quantity: "",
    date: "",
    recipient: "",
  });

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleAddIssue = useCallback(
    (e) => {
      e.preventDefault();
      setIssueData((prevData) => [...prevData, newIssue]);
      setNewIssue({
        id: "",
        assetId: "",
        assetName: "",
        quantity: "",
        date: "",
        recipient: "",
      });
      setShowAddForm(false);
    },
    [newIssue]
  );

  const handleShowDetail = useCallback((issue) => {
    setSelectedIssue(issue);
    setShowDetailModal(true);
  }, []);

  const handleShowEdit = useCallback((issue) => {
    setSelectedIssue({ ...issue });
    setShowEditModal(true);
  }, []);

  const handleEditIssue = useCallback(
    (e) => {
      e.preventDefault();
      setIssueData((prevData) =>
        prevData.map((issue) => (issue.id === selectedIssue.id ? selectedIssue : issue))
      );
      setShowEditModal(false);
      setSelectedIssue(null);
    },
    [selectedIssue]
  );

  const handleDeleteIssue = useCallback((id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa phiếu xuất này?")) {
      setIssueData((prevData) => prevData.filter((issue) => issue.id !== id));
    }
  }, []);

  const columns = [
    { key: "id", label: "Mã phiếu xuất" },
    { key: "assetId", label: "Mã tài sản" },
    { key: "assetName", label: "Tên tài sản" },
    { key: "quantity", label: "Số lượng" },
    { key: "date", label: "Ngày xuất" },
    { key: "recipient", label: "Người nhận" },
  ];

  const fields = [
    { name: "id", label: "Mã phiếu xuất", type: "text", required: true },
    { name: "assetId", label: "Mã tài sản", type: "text", required: true },
    { name: "assetName", label: "Tên tài sản", type: "text", required: true },
    { name: "quantity", label: "Số lượng", type: "number", required: true },
    { name: "date", label: "Ngày xuất", type: "date", required: true },
    { name: "recipient", label: "Người nhận", type: "text", required: true },
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
            data={issueData}
            searchTerm={searchTerm}
            onSearch={handleSearch}
            onShowDetail={handleShowDetail}
            onShowEdit={handleShowEdit}
            onDelete={handleDeleteIssue}
            title="Danh sách phiếu xuất"
          />
          <Pagination totalItems={issueData.length} />
          <AddFormModal
            isOpen={showAddForm}
            onClose={() => setShowAddForm(false)}
            onSubmit={handleAddIssue}
            fields={fields}
            title="Thêm phiếu xuất mới"
            newItem={newIssue}
            setNewItem={setNewIssue}
          />
          <DetailModal
            isOpen={showDetailModal}
            onClose={() => setShowDetailModal(false)}
            item={selectedIssue}
            fields={fields}
            title="Chi tiết phiếu xuất"
          />
          <EditFormModal
            isOpen={showEditModal}
            onClose={() => setShowEditModal(false)}
            onSubmit={handleEditIssue}
            fields={editFields}
            title="Chỉnh sửa phiếu xuất"
            selectedItem={selectedIssue}
            setSelectedItem={setSelectedIssue}
          />
        </main>
      </div>
    </div>
  );
};

export default InventoryIssue;