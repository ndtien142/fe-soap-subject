// src/pages/Maintenance.jsx
import React, { useState, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import DataTable from "../components/common/DataTable";
import Pagination from "../components/common/Pagination";
import AddFormModal from "../components/common/AddFormModal";
import FormInput from "../components/common/FormInput";

const initialMaintenanceData = [
  {
    id: "SC001",
    assetId: "TS001",
    assetName: "Máy chiếu",
    repairDate: "2025-05-10",
    cost: 2000000,
    description: "Thay bóng đèn projector",
    status: "Chờ xử lý",
  },
  {
    id: "SC002",
    assetId: "TS002",
    assetName: "Xe tải",
    repairDate: "2025-05-12",
    cost: 5000000,
    description: "Sửa động cơ",
    status: "Đã hoàn thành",
  },
];

const Maintenance = ({ setIsAuthenticated }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [maintenanceData, setMaintenanceData] = useState(initialMaintenanceData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMaintenance, setNewMaintenance] = useState({
    id: "",
    assetId: "",
    assetName: "",
    repairDate: "",
    cost: "",
    description: "",
    status: "",
  });
  const navigate = useNavigate();
  const location = useLocation();

  // Nhận dữ liệu mới từ modal
  useEffect(() => {
    if (location.state?.newMaintenance) {
      setMaintenanceData((prevData) => [
        ...prevData,
        location.state.newMaintenance,
      ]);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate, location.pathname]);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleFilterChange = useCallback((e) => {
    setFilterStatus(e.target.value);
  }, []);

  const filteredData = maintenanceData.filter((item) => {
    const matchesSearch = Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesFilter = filterStatus === "all" || item.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleStartProcessing = useCallback((id) => {
    if (window.confirm("Bắt đầu xử lý sửa chữa này?")) {
      setMaintenanceData((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, status: "Đang xử lý" } : item
        )
      );
    }
  }, []);

  const handleMarkComplete = useCallback((id) => {
    if (window.confirm("Đánh dấu sửa chữa này là đã hoàn thành?")) {
      setMaintenanceData((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, status: "Đã hoàn thành" } : item
        )
      );
    }
  }, []);

  const handleAddNew = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
      navigate("/login");
      return;
    }
    setIsModalOpen(true);
  };

  const handleModalSubmit = (formData) => {
    console.log("Form data before submit:", formData);
    // Tạm thời bỏ qua kiểm tra đầy đủ để debug status
    if (!formData.status || formData.status === "") {
      alert("Vui lòng chọn trạng thái!");
      return;
    }

    // Kiểm tra các trường khác
    if (
      !formData.id ||
      !formData.assetId ||
      !formData.assetName ||
      !formData.repairDate ||
      !formData.cost ||
      !formData.description
    ) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    const updatedMaintenanceData = {
      ...formData,
      cost: parseFloat(formData.cost),
    };
    setMaintenanceData((prevData) => [...prevData, updatedMaintenanceData]);
    setIsModalOpen(false);
    setNewMaintenance({
      id: "",
      assetId: "",
      assetName: "",
      repairDate: "",
      cost: "",
      description: "",
      status: "",
    });
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setNewMaintenance({
      id: "",
      assetId: "",
      assetName: "",
      repairDate: "",
      cost: "",
      description: "",
      status: "",
    });
  };

  const columns = [
    { key: "id", label: "Mã sửa chữa" },
    { key: "assetId", label: "Mã tài sản" },
    { key: "assetName", label: "Tên tài sản" },
    { key: "repairDate", label: "Ngày sửa chữa" },
    {
      key: "cost",
      label: "Chi phí",
      render: (value) => value.toLocaleString("vi-VN", { style: "currency", currency: "VND" }),
    },
    { key: "description", label: "Mô tả công việc" },
    { key: "status", label: "Trạng thái" },
  ];

  const renderActions = (item) => (
    <div className="flex space-x-2">
      {item.status === "Chờ xử lý" && (
        <button
          onClick={() => handleStartProcessing(item.id)}
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
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      )}
      {item.status === "Đang xử lý" && (
        <button
          onClick={() => handleMarkComplete(item.id)}
          className="text-green-500 hover:text-green-700"
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
      )}
    </div>
  );

  const fields = [
    { name: "id", label: "Mã sửa chữa", type: "text", required: true },
    { name: "assetId", label: "Mã tài sản", type: "text", required: true },
    { name: "assetName", label: "Tên tài sản", type: "text", required: true },
    { name: "repairDate", label: "Ngày sửa chữa", type: "date", required: true },
    { name: "cost", label: "Chi phí (VNĐ)", type: "number", required: true },
    {
      name: "status",
      label: "Trạng thái",
      type: "select",
      required: true,
      options: [
        { value: "", label: "Chọn một giá trị" },
        { value: "Chờ xử lý", label: "Chờ xử lý" },
        { value: "Đang xử lý", label: "Đang xử lý" },
        { value: "Đã hoàn thành", label: "Đã hoàn thành" },
      ],
    },
    { name: "description", label: "Mô tả công việc", type: "textarea", required: true },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col">
        <Header setIsAuthenticated={setIsAuthenticated} />
        <main className="p-6 flex-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Quản lý sửa chữa</h2>
            <button
              onClick={handleAddNew}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Thêm sửa chữa
            </button>
          </div>

          <DataTable
            columns={columns}
            data={filteredData}
            searchTerm={searchTerm}
            onSearch={handleSearch}
            title=""
            filterComponent={
              <div className="relative">
                <select
                  value={filterStatus}
                  onChange={handleFilterChange}
                  className="border rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Tất cả</option>
                  <option value="Chờ xử lý">Chờ xử lý</option>
                  <option value="Đang xử lý">Đang xử lý</option>
                  <option value="Đã hoàn thành">Đã hoàn thành</option>
                </select>
              </div>
            }
            renderActions={renderActions}
          />
          <Pagination totalItems={filteredData.length} />

          <AddFormModal
            isOpen={isModalOpen}
            onClose={handleModalClose}
            onSubmit={handleModalSubmit}
            fields={fields}
            title="Thêm sửa chữa mới"
            newItem={newMaintenance}
            setNewItem={setNewMaintenance}
          />
        </main>
      </div>
    </div>
  );
};

export default Maintenance;