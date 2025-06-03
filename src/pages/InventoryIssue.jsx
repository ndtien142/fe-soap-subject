// src/pages/InventoryIssue.jsx
import React, { useState, useCallback, useEffect } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import DataTable from "../components/common/DataTable";
import Pagination from "../components/common/Pagination";
import AddFormModal from "../components/common/AddFormModal";

const initialIssueData = [
  {
    id: "XK001",
    assetId: "TS001",
    assetName: "Máy chiếu",
    quantity: 2,
    date: "2025-05-25",
    createdBy: "admin",
  },
];

const InventoryIssue = ({ setIsAuthenticated }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [issueData, setIssueData] = useState(() => {
    const savedData = localStorage.getItem("inventoryIssue");
    return savedData ? JSON.parse(savedData) : initialIssueData;
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState(null);
  const [newIssue, setNewIssue] = useState({
    id: "",
    assetId: "",
    assetName: "",
    quantity: "",
    date: "",
  });
  const [userRole, setUserRole] = useState(localStorage.getItem("role") || "nhan_vien");
  const [username, setUsername] = useState(localStorage.getItem("username") || userRole);

  useEffect(() => {
    localStorage.setItem("inventoryIssue", JSON.stringify(issueData));
  }, [issueData]);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleAddNew = () => {
    if (userRole === "admin" || userRole === "thu_kho") {
      setIsModalOpen(true);
    } else {
      setNotification("Bạn không có quyền tạo phiếu xuất kho!");
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const updateInventoryStock = (assetId, quantity) => {
    let inventoryData = JSON.parse(localStorage.getItem("inventoryStock")) || [];
    const existingItem = inventoryData.find((item) => item.id === assetId);

    if (!existingItem) {
      alert("Tài sản không tồn tại trong kho!");
      return false;
    }

    if (existingItem.quantity < parseInt(quantity)) {
      alert("Số lượng tồn kho không đủ để xuất!");
      return false;
    }

    existingItem.quantity -= parseInt(quantity);
    localStorage.setItem("inventoryStock", JSON.stringify(inventoryData));
    return true;
  };

  const handleModalSubmit = () => {
    if (
      !newIssue.id ||
      !newIssue.assetId ||
      !newIssue.assetName ||
      !newIssue.quantity ||
      !newIssue.date
    ) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    const success = updateInventoryStock(newIssue.assetId, newIssue.quantity);
    if (success) {
      setIssueData((prevData) => [
        ...prevData,
        { ...newIssue, quantity: parseInt(newIssue.quantity), createdBy: username },
      ]);
      setIsModalOpen(false);
      setNewIssue({
        id: "",
        assetId: "",
        assetName: "",
        quantity: "",
        date: "",
      });
      setNotification("Thêm phiếu xuất kho thành công!");
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setNewIssue({
      id: "",
      assetId: "",
      assetName: "",
      quantity: "",
      date: "",
    });
  };

  const columns = [
    { key: "id", label: "Mã phiếu xuất" },
    { key: "assetId", label: "Mã tài sản" },
    { key: "assetName", label: "Tên tài sản" },
    { key: "quantity", label: "Số lượng xuất" },
    { key: "date", label: "Ngày xuất" },
    { key: "createdBy", label: "Người xuất" }, // Thêm cột Người xuất
  ];

  const fields = [
    { name: "id", label: "Mã phiếu xuất", type: "text", required: true },
    { name: "assetId", label: "Mã tài sản", type: "text", required: true },
    { name: "assetName", label: "Tên tài sản", type: "text", required: true },
    { name: "quantity", label: "Số lượng xuất", type: "number", required: true },
    { name: "date", label: "Ngày xuất", type: "date", required: true },
  ];

  const filteredData = issueData.filter((item) =>
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
            <h2 className="text-lg font-semibold">Phiếu xuất kho</h2>
            <button
              onClick={handleAddNew}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Thêm mới
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
          />
          <Pagination totalItems={filteredData.length} />

          <AddFormModal
            isOpen={isModalOpen}
            onClose={handleModalClose}
            onSubmit={handleModalSubmit}
            fields={fields}
            title="Thêm phiếu xuất kho mới"
            newItem={newIssue}
            setNewItem={setNewIssue}
          />
        </main>
      </div>
    </div>
  );
};

export default InventoryIssue;