// src/pages/HandoverDocument.jsx
import React, { useState, useCallback, useEffect } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import DataTable from "../components/common/DataTable";
import Pagination from "../components/common/Pagination";
import AddFormModal from "../components/common/AddFormModal";
import FormInput from "../components/common/FormInput";
import { jsPDF } from "jspdf";

const initialHandoverData = [
  {
    id: "BB001",
    handoverDate: "2025-05-10",
    handoverParty: "Phòng Hành chính",
    receivingParty: "Khoa Công nghệ",
    asset: "Máy chiếu",
    signature: "Chờ ký",
    borrowerEmployeeId: "NV001",
    receiverEmployeeId: "NV002",
    signedAt: null,
  },
];

const HandoverDocument = ({ setIsAuthenticated }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [handoverData, setHandoverData] = useState(() => {
    const savedData = localStorage.getItem("handoverData");
    return savedData ? JSON.parse(savedData) : initialHandoverData;
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState(null);
  const [filterStatus, setFilterStatus] = useState("Tất cả");
  const [newHandover, setNewHandover] = useState({
    id: "",
    handoverDate: "",
    handoverParty: "",
    receivingParty: "",
    asset: "",
    borrowerEmployeeId: "",
    receiverEmployeeId: "",
    signature: "",
  });

  // Định nghĩa fields cho AddFormModal
  const fields = [
    { name: "id", label: "Mã biên bản", type: "text", required: true },
    { name: "handoverDate", label: "Ngày bàn giao", type: "date", required: true },
    { name: "handoverParty", label: "Bên bàn giao", type: "text", required: true },
    { name: "receivingParty", label: "Bên nhận", type: "text", required: true },
    { name: "asset", label: "Nhóm tài sản", type: "text", required: true },
    { name: "borrowerEmployeeId", label: "Mã nhân viên mượn", type: "text", required: true },
    { name: "receiverEmployeeId", label: "Mã nhân viên nhận", type: "text", required: true },
  ];

  useEffect(() => {
    localStorage.setItem("handoverData", JSON.stringify(handoverData));
  }, [handoverData]);

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
    if (
      !newHandover.id ||
      !newHandover.handoverDate ||
      !newHandover.handoverParty ||
      !newHandover.receivingParty ||
      !newHandover.asset ||
      !newHandover.borrowerEmployeeId ||
      !newHandover.receiverEmployeeId
    ) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    setHandoverData((prevData) => [
      ...prevData,
      { ...newHandover, signature: "Chờ ký" },
    ]);
    printHandoverDocument();
    setIsModalOpen(false);
    setNewHandover({
      id: "",
      handoverDate: "",
      handoverParty: "",
      receivingParty: "",
      asset: "",
      borrowerEmployeeId: "",
      receiverEmployeeId: "",
      signature: "",
    });
    setNotification("Thêm phiếu bàn giao thành công!");
    setTimeout(() => setNotification(null), 3000);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setNewHandover({
      id: "",
      handoverDate: "",
      handoverParty: "",
      receivingParty: "",
      asset: "",
      borrowerEmployeeId: "",
      receiverEmployeeId: "",
      signature: "",
    });
  };

  const printHandoverDocument = () => {
    const doc = new jsPDF();
    doc.setFont("times", "normal");
    doc.setFontSize(16);
    doc.text("PHIẾU BÀN GIAO NHÓM TÀI SẢN", 105, 15, { align: "center" });
    doc.setFontSize(12);
    doc.text(`Mã biên bản: ${newHandover.id}`, 20, 30);
    doc.text(`Ngày bàn giao: ${newHandover.handoverDate}`, 20, 40);
    doc.text(`Bên bàn giao: ${newHandover.handoverParty}`, 20, 50);
    doc.text(`Bên nhận: ${newHandover.receivingParty}`, 20, 60);
    doc.text(`Nhóm tài sản: ${newHandover.asset}`, 20, 70);
    doc.text(`Mã nhân viên mượn: ${newHandover.borrowerEmployeeId}`, 20, 80);
    doc.text(`Mã nhân viên nhận: ${newHandover.receiverEmployeeId}`, 20, 90);
    doc.text("Chữ ký:", 20, 110);
    doc.save(`PhieuBanGiao_${newHandover.id}.pdf`);
  };

  const confirmSignature = (id) => {
    console.log("Click confirmSignature with id:", id);
    const confirm = window.confirm("Bạn có chắc chắn muốn xác nhận ký biên bản này?");
    if (confirm) {
      setHandoverData((prevData) => {
        const updatedData = prevData.map((item) =>
          item.id === id
            ? { ...item, signature: "Đã ký", signedAt: new Date().toISOString() }
            : item
        );
        console.log("Updated handoverData:", updatedData);
        return updatedData;
      });
      setNotification("Xác nhận ký thành công!");
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const columns = [
    { key: "id", label: "Mã biên bản" },
    { key: "handoverDate", label: "Ngày bàn giao" },
    { key: "handoverParty", label: "Bên bàn giao" },
    { key: "receivingParty", label: "Bên nhận" },
    { key: "asset", label: "Nhóm tài sản" },
    { key: "borrowerEmployeeId", label: "Mã nhân viên mượn" },
    { key: "receiverEmployeeId", label: "Mã nhân viên nhận" },
    {
      key: "signature",
      label: "Trạng thái ký",
      render: (value) => (
        <span
          className={
            value === "Chờ ký"
              ? "text-yellow-600"
              : value === "Đã ký"
              ? "text-green-600"
              : ""
          }
        >
          {value}
        </span>
      ),
    },
    {
      key: "signedAt",
      label: "Thời gian ký",
      render: (value) =>
        value ? new Date(value).toLocaleString("vi-VN") : "Chưa ký",
    },
  ];

  const renderActions = (item) => (
    <button
      onClick={() => confirmSignature(item.id)}
      className={`px-2 py-1 rounded text-white ${
        item.signature === "Đã ký"
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-500 hover:bg-blue-600"
      }`}
      disabled={item.signature === "Đã ký"}
    >
      {item.signature === "Đã ký" ? "Đã ký" : "Xác nhận ký"}
    </button>
  );

  const filteredData = handoverData
    .filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .filter((item) => {
      if (filterStatus === "Tất cả") return true;
      return item.signature === filterStatus;
    });

  const filterComponent = (
    <select
      value={filterStatus}
      onChange={(e) => setFilterStatus(e.target.value)}
      className="border rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="Tất cả">Tất cả</option>
      <option value="Chờ ký">Chờ ký</option>
      <option value="Đã ký">Đã ký</option>
    </select>
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col">
        <Header setIsAuthenticated={setIsAuthenticated} />
        <main className="p-6 flex-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Biên bản bàn giao</h2>
            <button
              onClick={handleAddNew}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Thêm phiếu bàn giao
            </button>
          </div>

          {notification && (
            <div className="mb-4 p-2 bg-green-100 text-green-700 rounded-lg">
              {notification}
            </div>
          )}

          <DataTable
            columns={columns}
            data={filteredData}
            searchTerm={searchTerm}
            onSearch={handleSearch}
            title=""
            renderActions={renderActions}
            filterComponent={filterComponent}
          />
          <Pagination totalItems={filteredData.length} />

          <AddFormModal
            isOpen={isModalOpen}
            onClose={handleModalClose}
            onSubmit={handleModalSubmit}
            fields={fields}
            title="Thêm phiếu bàn giao mới"
            newItem={newHandover}
            setNewItem={setNewHandover}
          />
        </main>
      </div>
    </div>
  );
};

export default HandoverDocument;