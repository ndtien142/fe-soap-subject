// src/pages/BorrowReceiptList.jsx
import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import DataTable from "../components/common/DataTable";
import Pagination from "../components/common/Pagination";
import { Html5QrcodeScanner } from "html5-qrcode";
import { equipmentData } from "../data/equipmentData";

const initialBorrowData = [
  {
    id: "PM001",
    createdDate: "2025-06-01",
    borrower: "Nguyen Van A",
    status: "Chờ duyệt",
    dueDate: "2025-06-10",
    selectedItems: [
      { serial: "SN001", name: "Máy chiếu A", qrData: "SN001-Máy chiếu A" },
    ],
  },
];

const BorrowReceiptList = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [borrowData, setBorrowData] = useState(() => {
    const savedData = localStorage.getItem("borrowReceipts");
    return savedData ? JSON.parse(savedData) : initialBorrowData;
  });
  const [filter, setFilter] = useState({
    id: "",
    borrower: "",
    createdDate: "",
    status: "",
  });
  const [userRole, setUserRole] = useState(
    localStorage.getItem("role") || "nhan_vien"
  );
  const [scanning, setScanning] = useState(false);
  const [scannedEquipment, setScannedEquipment] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    localStorage.setItem("borrowReceipts", JSON.stringify(borrowData));
  }, [borrowData]);

  useEffect(() => {
    if (scanning) {
      const scanner = new Html5QrcodeScanner(
        "qr-reader",
        { fps: 10, qrbox: 250 },
        false
      );
      scanner.render(
        (decodedText) => {
          const equipment = equipmentData.equipments.find(
            (equip) => equip.qrData === decodedText
          );
          if (equipment) {
            setScannedEquipment(equipment);
            setNotification(
              `Tìm thấy thiết bị: ${equipment.name} (${equipment.serial})`
            );
            const receipt = borrowData.find((item) =>
              item.selectedItems.some((equip) => equip.qrData === decodedText)
            );
            if (receipt) {
              navigate(`/borrow-receipt-detail/${receipt.id}`);
            } else {
              setNotification("Không tìm thấy phiếu mượn liên quan!");
            }
          } else {
            setNotification("Không tìm thấy thiết bị!");
          }
          setTimeout(() => setNotification(null), 3000);
          setScanning(false);
          scanner.clear();
        },
        (error) => {
          console.warn("QR scan error:", error);
        }
      );
      return () => scanner.clear();
    }
  }, [scanning, borrowData, navigate]);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const handleScanQR = () => {
    setScanning(true);
  };

  // Logic cho nút "Chi tiết / Xem"
  const handleViewDetail = (id) => {
    try {
      const savedData = JSON.parse(
        localStorage.getItem("borrowReceipts") || "[]"
      );
      const receiptExists = savedData.some((item) => item.id === id);
      if (!receiptExists) {
        setNotification(`Không tìm thấy phiếu mượn ${id}!`);
        setTimeout(() => setNotification(null), 3000);
        return;
      }
      navigate(`/borrow-receipt-detail/${id}`);
    } catch (err) {
      setNotification("Lỗi khi xem chi tiết: " + err.message);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const filteredData = borrowData.filter(
    (item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      ) &&
      (!filter.id || item.id.toLowerCase().includes(filter.id.toLowerCase())) &&
      (!filter.borrower ||
        item.borrower.toLowerCase().includes(filter.borrower.toLowerCase())) &&
      (!filter.createdDate || item.createdDate === filter.createdDate) &&
      (!filter.status || item.status === filter.status)
  );

  const renderActions = (item) => (
    <div className="space-x-2">
      <button
        onClick={() => handleViewDetail(item.id)} // Sử dụng handleViewDetail
        className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Chi tiết / Xem
      </button>
      {(userRole === "admin" || userRole === "thu_kho") &&
        item.status === "Chờ duyệt" && (
          <>
            <button
              onClick={() => {
                const confirm = window.confirm(
                  `Bạn có chắc muốn chỉnh sửa phiếu ${item.id}?`
                );
                if (confirm) console.log(`Edit ${item.id}`);
              }}
              className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Chỉnh sửa
            </button>
            <button
              onClick={() => {
                const confirm = window.confirm(
                  `Bạn có chắc muốn hủy phiếu ${item.id}?`
                );
                if (confirm) {
                  setBorrowData((prev) => prev.filter((d) => d.id !== item.id));
                  setNotification("Hủy phiếu thành công!");
                  setTimeout(() => setNotification(null), 3000);
                }
              }}
              className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Hủy phiếu
            </button>
          </>
        )}
    </div>
  );

  const filterComponent = (
    <div className="space-y-2">
      <input
        name="id"
        value={filter.id}
        onChange={handleFilterChange}
        placeholder="Mã phiếu"
        className="border rounded-lg px-3 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        name="borrower"
        value={filter.borrower}
        onChange={handleFilterChange}
        placeholder="Người mượn"
        className="border rounded-lg px-3 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        name="createdDate"
        value={filter.createdDate}
        onChange={handleFilterChange}
        type="date"
        className="border rounded-lg px-3 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        name="status"
        value={filter.status}
        onChange={handleFilterChange}
        className="border rounded-lg px-3 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Tất cả trạng thái</option>
        <option value="Chờ duyệt">Chờ duyệt</option>
        <option value="Đã duyệt">Đã duyệt</option>
        <option value="Đã trả">Đã trả</option>
      </select>
      <button
        onClick={handleScanQR}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full"
      >
        Quét QR để tìm kiếm
      </button>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col">
        <Header setIsAuthenticated={setIsAuthenticated} />
        <main className="p-6 flex-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Danh sách phiếu mượn</h2>
            {(userRole === "admin" || userRole === "thu_kho") && (
              <button
                onClick={() => navigate("/create-borrow-receipt")}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                + Tạo phiếu mượn mới
              </button>
            )}
          </div>
          {scanning && (
            <div id="qr-reader" className="mt-4 w-[300px] h-[300px]"></div>
          )}
          {scannedEquipment && (
            <div className="mt-4 p-2 bg-blue-100 text-blue-700 rounded-lg">
              <p>
                <strong>Thiết bị quét được:</strong> {scannedEquipment.name}
              </p>
              <p>
                <strong>Serial:</strong> {scannedEquipment.serial}
              </p>
              <p>
                <strong>Trạng thái:</strong> {scannedEquipment.status}
              </p>
            </div>
          )}
          {notification && (
            <div className="mt-4 p-2 bg-green-100 text-green-700 rounded-lg">
              {notification}
            </div>
          )}
          <DataTable
            columns={[
              { key: "id", label: "Mã phiếu" },
              { key: "createdDate", label: "Ngày tạo" },
              { key: "borrower", label: "Người mượn" },
              { key: "status", label: "Trạng thái" },
              { key: "dueDate", label: "Hạn trả" },
            ]}
            data={filteredData}
            searchTerm={searchTerm}
            onSearch={handleSearch}
            title=""
            renderActions={renderActions}
            filterComponent={filterComponent}
          />
          <Pagination totalItems={filteredData.length} />
        </main>
      </div>
    </div>
  );
};

export default BorrowReceiptList;
