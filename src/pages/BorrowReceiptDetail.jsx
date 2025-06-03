// src/pages/BorrowReceiptDetail.jsx
import React, { useState, useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Thêm useNavigate
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import { QRCodeCanvas } from "qrcode.react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { equipmentData } from "../data/equipmentData";

const BorrowReceiptDetail = ({ setIsAuthenticated }) => {
  const { id } = useParams();
  const navigate = useNavigate(); // Khởi tạo useNavigate để điều hướng
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [borrowData, setBorrowData] = useState(null);
  const [userRole, setUserRole] = useState(
    localStorage.getItem("role") || "nhan_vien"
  );
  const [notification, setNotification] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [scannedEquipment, setScannedEquipment] = useState(null);
  const [error, setError] = useState(null); // Thêm state để xử lý lỗi

  useEffect(() => {
    try {
      const savedData = JSON.parse(
        localStorage.getItem("borrowReceipts") || "[]"
      );
      if (!Array.isArray(savedData)) {
        throw new Error("Dữ liệu phiếu mượn không hợp lệ!");
      }
      const data = savedData.find((item) => item.id === id);
      if (!data) {
        setError("Không tìm thấy phiếu mượn!");
        setTimeout(() => navigate("/borrow-receipt-list"), 3000); // Điều hướng về danh sách sau 3 giây
        return;
      }
      setBorrowData(data);
    } catch (err) {
      setError("Lỗi khi tải dữ liệu phiếu mượn: " + err.message);
      setTimeout(() => navigate("/borrow-receipt-list"), 3000);
    }
  }, [id, navigate]);

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
          } else {
            setNotification("Không tìm thấy thiết bị!");
          }
          setScanning(false);
          scanner.clear();
        },
        (error) => {
          console.warn("QR scan error:", error);
          setNotification("Lỗi khi quét QR: " + error.message);
          setScanning(false);
          scanner.clear();
        }
      );
      return () => scanner.clear();
    }
  }, [scanning]);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const handleApprove = () => {
    if (userRole !== "admin") {
      setNotification("Chỉ admin mới có quyền duyệt phiếu!");
      setTimeout(() => setNotification(null), 3000);
      return;
    }
    try {
      setBorrowData((prev) => ({ ...prev, status: "Đã duyệt" }));
      const savedData = JSON.parse(
        localStorage.getItem("borrowReceipts") || "[]"
      ).map((item) =>
        item.id === id ? { ...item, status: "Đã duyệt" } : item
      );
      localStorage.setItem("borrowReceipts", JSON.stringify(savedData));
      setNotification("Duyệt phiếu thành công!");
      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      setNotification("Lỗi khi duyệt phiếu: " + err.message);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleReturn = (serial) => {
    try {
      setBorrowData((prev) => {
        const updatedItems = prev.selectedItems.map((item) =>
          item.serial === serial ? { ...item, status: "Đã trả" } : item
        );
        const allReturned = updatedItems.every(
          (item) => item.status === "Đã trả"
        );
        return {
          ...prev,
          selectedItems: updatedItems,
          status: allReturned ? "Đã trả" : prev.status,
        };
      });
      const savedData = JSON.parse(
        localStorage.getItem("borrowReceipts") || "[]"
      ).map((item) =>
        item.id === id
          ? {
              ...item,
              selectedItems: item.selectedItems.map((equip) =>
                equip.serial === serial ? { ...equip, status: "Đã trả" } : equip
              ),
              status: item.selectedItems.every(
                (equip) => equip.status === "Đã trả"
              )
                ? "Đã trả"
                : item.status,
            }
          : item
      );
      localStorage.setItem("borrowReceipts", JSON.stringify(savedData));
      setNotification(`Trả thiết bị ${serial} thành công!`);
      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      setNotification("Lỗi khi trả thiết bị: " + err.message);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleScanQR = () => {
    setScanning(true);
  };

  // Hiển thị lỗi nếu có
  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="flex-1 flex flex-col">
          <Header setIsAuthenticated={setIsAuthenticated} />
          <main className="p-6 flex-1">
            <div className="mt-4 p-2 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          </main>
        </div>
      </div>
    );
  }

  // Hiển thị loading nếu chưa có dữ liệu
  if (!borrowData) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="flex-1 flex flex-col">
          <Header setIsAuthenticated={setIsAuthenticated} />
          <main className="p-6 flex-1">
            <div>Đang tải...</div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col">
        <Header setIsAuthenticated={setIsAuthenticated} />
        <main className="p-6 flex-1">
          <h2 className="text-lg font-semibold mb-4">
            Chi tiết phiếu mượn {borrowData.id}
          </h2>
          <div className="mb-4">
            <p>
              <strong>Người mượn:</strong> {borrowData.borrower || "N/A"}
            </p>
            <p>
              <strong>Ngày mượn:</strong> {borrowData.borrowDate || "N/A"}
            </p>
            <p>
              <strong>Hạn trả:</strong> {borrowData.dueDate || "N/A"}
            </p>
            <p>
              <strong>Trạng thái:</strong> {borrowData.status || "N/A"}
            </p>
            <p>
              <strong>Lý do:</strong> {borrowData.purpose || "Không có lý do"}
            </p>
          </div>
          <h3 className="mb-2">Danh sách thiết bị đã mượn</h3>
          {borrowData.selectedItems && borrowData.selectedItems.length > 0 ? (
            <table className="w-full border-collapse border">
              <thead>
                <tr>
                  <th className="border p-2">Serial</th>
                  <th className="border p-2">Tên</th>
                  <th className="border p-2">Số lượng</th>
                  <th className="border p-2">Tình trạng</th>
                  <th className="border p-2">QR Code</th>
                  <th className="border p-2">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {borrowData.selectedItems.map((item, index) => (
                  <tr key={index}>
                    <td className="border p-2">
                      {item.serial || item.id || "N/A"}
                    </td>
                    <td className="border p-2">{item.name || "N/A"}</td>
                    <td className="border p-2">{item.quantity || 1}</td>
                    <td className="border p-2">{item.status || "Đang mượn"}</td>
                    <td className="border p-2">
                      <QRCodeCanvas
                        value={
                          item.qrData ||
                          `${item.serial || item.id || "unknown"}-${
                            item.name || "unknown"
                          }`
                        }
                        size={50}
                        level="L"
                        bgColor="#FFFFFF"
                        fgColor="#000000"
                      />
                    </td>
                    <td className="border p-2">
                      {borrowData.status === "Đã duyệt" &&
                        item.status !== "Đã trả" && (
                          <button
                            onClick={() => handleReturn(item.serial)}
                            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                          >
                            Trả thiết bị
                          </button>
                        )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Không có thiết bị nào trong phiếu mượn này.</p>
          )}
          <div className="mt-4 space-x-2">
            {userRole === "admin" && borrowData.status === "Chờ duyệt" && (
              <button
                onClick={handleApprove}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Duyệt phiếu
              </button>
            )}
            {borrowData.status === "Đã duyệt" && (
              <button
                onClick={handleScanQR}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Quét QR để trả thiết bị
              </button>
            )}
            <button
              onClick={() => navigate("/borrow-receipt-list")}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
            >
              Quay lại
            </button>
          </div>
          {scanning && (
            <div id="qr-reader" className="mt-4 w-[300px] h-[300px]"></div>
          )}
          {scannedEquipment && (
            <div className="mt-4 p-2 bg-blue-100 text-blue-700 rounded-lg">
              <p>
                <strong>Thiết bị quét được:</strong>{" "}
                {scannedEquipment.name || "N/A"}
              </p>
              <p>
                <strong>Serial:</strong> {scannedEquipment.serial || "N/A"}
              </p>
              <p>
                <strong>Trạng thái:</strong> {scannedEquipment.status || "N/A"}
              </p>
              <button
                onClick={() => handleReturn(scannedEquipment.serial)}
                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mt-2"
              >
                Trả thiết bị này
              </button>
            </div>
          )}
          {notification && (
            <div className="mt-4 p-2 bg-green-100 text-green-700 rounded-lg">
              {notification}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default BorrowReceiptDetail;
