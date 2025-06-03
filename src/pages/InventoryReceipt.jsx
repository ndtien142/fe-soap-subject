import React, { useState, useCallback, useEffect } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import DataTable from "../components/common/DataTable";
import Pagination from "../components/common/Pagination";
import AddFormModal from "../components/common/AddFormModal";

const initialReceiptData = [
  {
    id: "NK001",
    assetId: "TS001",
    assetName: "Máy chiếu",
    quantity: 5,
    date: "2025-05-25",
    createdBy: "admin", 
  },
];

const InventoryReceipt = ({ setIsAuthenticated }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [receiptData, setReceiptData] = useState(() => {
    const savedData = localStorage.getItem("inventoryReceipt");
    return savedData ? JSON.parse(savedData) : initialReceiptData;
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState(null);
  const [newReceipt, setNewReceipt] = useState({
    id: "",
    assetId: "",
    assetName: "",
    quantity: "",
    date: "",
  });
  const [userRole, setUserRole] = useState(localStorage.getItem("role") || "nhan_vien");
  const [username, setUsername] = useState(localStorage.getItem("username") || userRole); // Lấy username từ localStorage

  useEffect(() => {
    localStorage.setItem("inventoryReceipt", JSON.stringify(receiptData));
  }, [receiptData]);

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
      setNotification("Bạn không có quyền tạo phiếu nhập kho!");
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const updateInventoryStock = (assetId, assetName, quantity) => {
    let inventoryData = JSON.parse(localStorage.getItem("inventoryStock")) || [];
    const existingItem = inventoryData.find((item) => item.id === assetId);

    if (existingItem) {
      existingItem.quantity += parseInt(quantity);
    } else {
      inventoryData.push({
        id: assetId,
        name: assetName,
        quantity: parseInt(quantity),
        location: "Kho mặc định",
      });
    }

    localStorage.setItem("inventoryStock", JSON.stringify(inventoryData));
  };

  const handleModalSubmit = () => {
    if (
      !newReceipt.id ||
      !newReceipt.assetId ||
      !newReceipt.assetName ||
      !newReceipt.quantity ||
      !newReceipt.date
    ) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    setReceiptData((prevData) => [
      ...prevData,
      { ...newReceipt, quantity: parseInt(newReceipt.quantity), createdBy: username },
    ]);
    updateInventoryStock(newReceipt.assetId, newReceipt.assetName, newReceipt.quantity);

    setIsModalOpen(false);
    setNewReceipt({
      id: "",
      assetId: "",
      assetName: "",
      quantity: "",
      date: "",
    });
    setNotification("Thêm phiếu nhập kho thành công!");
    setTimeout(() => setNotification(null), 3000);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setNewReceipt({
      id: "",
      assetId: "",
      assetName: "",
      quantity: "",
      date: "",
    });
  };

  const columns = [
    { key: "id", label: "Mã phiếu nhập" },
    { key: "assetId", label: "Mã tài sản" },
    { key: "assetName", label: "Tên tài sản" },
    { key: "quantity", label: "Số lượng nhập" },
    { key: "date", label: "Ngày nhập" },
    { key: "createdBy", label: "Người nhập" }, // Thêm cột Người nhập
  ];

  const fields = [
    { name: "id", label: "Mã phiếu nhập", type: "text", required: true },
    { name: "assetId", label: "Mã tài sản", type: "text", required: true },
    { name: "assetName", label: "Tên tài sản", type: "text", required: true },
    { name: "quantity", label: "Số lượng nhập", type: "number", required: true },
    { name: "date", label: "Ngày nhập", type: "date", required: true },
  ];

  const filteredData = receiptData.filter((item) =>
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
            <h2 className="text-lg font-semibold">Phiếu nhập kho</h2>
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
            title="Thêm phiếu nhập kho mới"
            newItem={newReceipt}
            setNewItem={setNewReceipt}
          />
        </main>
      </div>
    </div>
  );
};

export default InventoryReceipt;