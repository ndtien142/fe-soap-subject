// src/pages/ApprovalRequestList.jsx
import React, { useState, useCallback } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import DataTable from "../components/common/DataTable";
import AddFormModal from "../components/common/AddFormModal";
import Pagination from "../components/common/Pagination";

// Dữ liệu giả lập
const initialRequestData = [
  {
    id: "YC001",
    type: "Nhập kho",
    status: "Chờ duyệt",
    createdDate: "2023-10-01",
    requester: "Nguyễn Văn A",
  },
  {
    id: "YC002",
    type: "Xuất kho",
    status: "Đã duyệt",
    createdDate: "2023-10-02",
    requester: "Trần Thị B",
  },
];

const ApprovalRequestList = ({ setIsAuthenticated }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [requestData, setRequestData] = useState(initialRequestData);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRequest, setNewRequest] = useState({
    id: "",
    type: "",
    status: "Chờ duyệt", // Mặc định là Chờ duyệt
    createdDate: "",
    requester: "",
  });

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleAddRequest = useCallback(
    (e) => {
      e.preventDefault();
      setRequestData((prevData) => [...prevData, newRequest]);
      setNewRequest({
        id: "",
        type: "",
        status: "Chờ duyệt",
        createdDate: "",
        requester: "",
      });
      setShowAddForm(false);
    },
    [newRequest]
  );

  const handleApprove = useCallback((id) => {
    if (window.confirm("Bạn có chắc chắn muốn duyệt yêu cầu này?")) {
      setRequestData((prevData) =>
        prevData.map((request) =>
          request.id === id ? { ...request, status: "Đã duyệt" } : request
        )
      );
    }
  }, []);

  const handleReject = useCallback((id) => {
    if (window.confirm("Bạn có chắc chắn muốn từ chối yêu cầu này?")) {
      setRequestData((prevData) =>
        prevData.map((request) =>
          request.id === id ? { ...request, status: "Từ chối" } : request
        )
      );
    }
  }, []);

  const columns = [
    { key: "id", label: "Mã yêu cầu" },
    { key: "type", label: "Loại yêu cầu" },
    { key: "status", label: "Trạng thái" },
    { key: "createdDate", label: "Ngày tạo" },
    { key: "requester", label: "Người yêu cầu" },
  ];

  const fields = [
    { name: "id", label: "Mã yêu cầu", type: "text", required: true },
    { name: "type", label: "Loại yêu cầu", type: "text", required: true },
    { name: "status", label: "Trạng thái", type: "text", required: true, disabled: true },
    { name: "createdDate", label: "Ngày tạo", type: "date", required: true },
    { name: "requester", label: "Người yêu cầu", type: "text", required: true },
  ];

  const renderActions = (item) =>
    item.status === "Chờ duyệt" ? (
      <div className="flex space-x-2">
        <button
          onClick={() => handleApprove(item.id)}
          className="text-green-500 hover:text-green-700"
          title="Duyệt"
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
              d="M5 13l4 4L19 7"
            />
          </svg>
        </button>
        <button
          onClick={() => handleReject(item.id)}
          className="text-red-500 hover:text-red-700"
          title="Từ chối"
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    ) : null;

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
            data={requestData}
            searchTerm={searchTerm}
            onSearch={handleSearch}
            title="Danh sách yêu cầu duyệt"
            renderActions={renderActions}
          />
          <Pagination totalItems={requestData.length} />
          <AddFormModal
            isOpen={showAddForm}
            onClose={() => setShowAddForm(false)}
            onSubmit={handleAddRequest}
            fields={fields}
            title="Thêm yêu cầu mới"
            newItem={newRequest}
            setNewItem={setNewRequest}
          />
        </main>
      </div>
    </div>
  );
};

export default ApprovalRequestList;