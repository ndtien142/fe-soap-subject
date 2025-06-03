// src/pages/CreateBorrowReceipt.jsx
import React, { useState, useCallback, useEffect } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import { QRCodeCanvas } from "qrcode.react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { equipmentData } from "../data/equipmentData";

const initialUsers = ["Nguyen Van A", "Tran Van B", "Le Thi C"];

const CreateBorrowReceipt = ({ setIsAuthenticated }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [step, setStep] = useState(1);
  const [borrowData, setBorrowData] = useState({
    id: `PM${Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")}`,
    borrower: "",
    createdDate: new Date().toISOString().split("T")[0],
    borrowDate: "",
    dueDate: "",
    purpose: "",
    equipmentType: "group",
    selectedItems: [],
  });
  const [notification, setNotification] = useState(null);
  const [userRole, setUserRole] = useState(
    localStorage.getItem("role") || "nhan_vien"
  );
  const [scanning, setScanning] = useState(false);
  const [scannedEquipment, setScannedEquipment] = useState(null);

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
            if (equipment.status === "Còn trống") {
              setBorrowData((prev) => ({
                ...prev,
                selectedItems: [
                  ...prev.selectedItems,
                  { ...equipment, quantity: 1, status: "Đang mượn" },
                ],
              }));
            } else {
              setNotification("Thiết bị không còn trống!");
            }
          } else {
            setNotification("Không tìm thấy thiết bị!");
          }
          setScanning(false);
          scanner.clear();
        },
        (error) => {
          console.warn("QR scan error:", error);
        }
      );
      return () => scanner.clear();
    }
  }, [scanning]);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const validateStep = () => {
    if (step === 1) {
      if (
        !borrowData.borrower ||
        !borrowData.borrowDate ||
        !borrowData.dueDate
      ) {
        setNotification("Vui lòng điền đầy đủ thông tin!");
        setTimeout(() => setNotification(null), 3000);
        return false;
      }
      if (new Date(borrowData.borrowDate) > new Date(borrowData.dueDate)) {
        setNotification("Ngày mượn phải trước hạn trả!");
        setTimeout(() => setNotification(null), 3000);
        return false;
      }
    } else if (step === 2 && borrowData.selectedItems.length === 0) {
      setNotification("Vui lòng chọn ít nhất một thiết bị!");
      setTimeout(() => setNotification(null), 3000);
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) setStep((prev) => prev + 1);
  };

  const handlePrev = () => setStep((prev) => prev - 1);

  const handleSave = () => {
    if (validateStep()) {
      setBorrowData((prev) => ({ ...prev, status: "Chờ duyệt" }));
      localStorage.setItem(
        "borrowReceipts",
        JSON.stringify([
          ...JSON.parse(localStorage.getItem("borrowReceipts") || "[]"),
          borrowData,
        ])
      );
      setNotification("Lưu phiếu mượn thành công!");
      setTimeout(() => {
        setNotification(null);
        window.location.href = "/borrow-receipt-list";
      }, 3000);
    }
  };

  const handleCancel = () => (window.location.href = "/borrow-receipt-list");

  const handleSelectItem = (item) => {
    if (borrowData.equipmentType === "group") {
      const quantity = prompt(
        `Nhập số lượng cho ${item.name} (tối đa ${item.available}):`
      );
      if (
        quantity &&
        parseInt(quantity) <= item.available &&
        parseInt(quantity) > 0
      ) {
        setBorrowData((prev) => ({
          ...prev,
          selectedItems: [
            ...prev.selectedItems,
            { ...item, quantity: parseInt(quantity), status: "Đang mượn" },
          ],
        }));
      } else {
        setNotification("Số lượng không hợp lệ hoặc vượt quá số lượng sẵn có!");
        setTimeout(() => setNotification(null), 3000);
      }
    } else {
      setBorrowData((prev) => ({
        ...prev,
        selectedItems: [
          ...prev.selectedItems,
          { ...item, quantity: 1, status: "Đang mượn" },
        ],
      }));
    }
  };

  const removeItem = (index) => {
    setBorrowData((prev) => ({
      ...prev,
      selectedItems: prev.selectedItems.filter((_, i) => i !== index),
    }));
  };

  const handleScanQR = () => {
    setScanning(true);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col">
        <Header setIsAuthenticated={setIsAuthenticated} />
        <main className="p-6 flex-1">
          <h2 className="text-lg font-semibold mb-4">Tạo phiếu mượn</h2>
          <div className="mb-4">
            <div className="flex space-x-2 mb-2">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`w-1/4 text-center py-2 ${
                    step >= s ? "bg-blue-500 text-white" : "bg-gray-300"
                  } rounded`}
                >
                  Bước {s}
                </div>
              ))}
            </div>
            {step === 1 && (
              <div>
                <select
                  value={borrowData.borrower}
                  onChange={(e) =>
                    setBorrowData((prev) => ({
                      ...prev,
                      borrower: e.target.value,
                    }))
                  }
                  className="border rounded-lg px-3 py-1 w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Chọn người mượn</option>
                  {initialUsers.map((user) => (
                    <option key={user} value={user}>
                      {user}
                    </option>
                  ))}
                </select>
                <input
                  type="date"
                  value={borrowData.borrowDate}
                  onChange={(e) =>
                    setBorrowData((prev) => ({
                      ...prev,
                      borrowDate: e.target.value,
                    }))
                  }
                  className="border rounded-lg px-3 py-1 w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="date"
                  value={borrowData.dueDate}
                  onChange={(e) =>
                    setBorrowData((prev) => ({
                      ...prev,
                      dueDate: e.target.value,
                    }))
                  }
                  className="border rounded-lg px-3 py-1 w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  value={borrowData.purpose}
                  onChange={(e) =>
                    setBorrowData((prev) => ({
                      ...prev,
                      purpose: e.target.value,
                    }))
                  }
                  placeholder="Lý do / Mục đích sử dụng"
                  className="border rounded-lg px-3 py-1 w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleNext}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Tiếp theo
                </button>
              </div>
            )}
            {step === 2 && (
              <div>
                <div className="mb-2">
                  <label>
                    <input
                      type="radio"
                      checked={borrowData.equipmentType === "group"}
                      onChange={() =>
                        setBorrowData((prev) => ({
                          ...prev,
                          equipmentType: "group",
                          selectedItems: [],
                        }))
                      }
                    />{" "}
                    Nhóm thiết bị
                  </label>
                  <label>
                    <input
                      type="radio"
                      checked={borrowData.equipmentType === "equipment"}
                      onChange={() =>
                        setBorrowData((prev) => ({
                          ...prev,
                          equipmentType: "equipment",
                          selectedItems: [],
                        }))
                      }
                    />{" "}
                    Thiết bị riêng lẻ
                  </label>
                  {borrowData.equipmentType === "equipment" && (
                    <button
                      onClick={handleScanQR}
                      className="ml-4 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                    >
                      Quét QR
                    </button>
                  )}
                </div>
                {scanning && (
                  <div
                    id="qr-reader"
                    className="mt-4 w-[300px] h-[300px]"
                  ></div>
                )}
                {scannedEquipment && (
                  <div className="mt-4 p-2 bg-blue-100 text-blue-700 rounded-lg">
                    <p>
                      <strong>Thiết bị quét được:</strong>{" "}
                      {scannedEquipment.name}
                    </p>
                    <p>
                      <strong>Serial:</strong> {scannedEquipment.serial}
                    </p>
                    <p>
                      <strong>Trạng thái:</strong> {scannedEquipment.status}
                    </p>
                  </div>
                )}
                {borrowData.equipmentType === "group"
                  ? equipmentData.equipmentGroups.map((group) => (
                      <div key={group.id} className="border p-2 mb-2">
                        {group.name} (Còn: {group.available})
                        <button
                          onClick={() => handleSelectItem(group)}
                          className="ml-2 bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                        >
                          Chọn
                        </button>
                      </div>
                    ))
                  : equipmentData.equipments.map((equip) => (
                      <div
                        key={equip.serial}
                        className="border p-2 mb-2 flex items-center"
                      >
                        {equip.serial} - {equip.name} ({equip.status})
                        <button
                          onClick={() => handleSelectItem(equip)}
                          className="ml-2 bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                          disabled={equip.status !== "Còn trống"}
                        >
                          Chọn
                        </button>
                        <div className="ml-4">
                          <QRCodeCanvas value={equip.qrData} size={50} />
                        </div>
                      </div>
                    ))}
                <button
                  onClick={handlePrev}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-gray-600"
                >
                  Quay lại
                </button>
                <button
                  onClick={handleNext}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Tiếp theo
                </button>
              </div>
            )}
            {step === 3 && (
              <div>
                <h3>Danh sách thiết bị mượn</h3>
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
                        <td className="border p-2">{item.serial || item.id}</td>
                        <td className="border p-2">{item.name}</td>
                        <td className="border p-2">{item.quantity || 1}</td>
                        <td className="border p-2">{item.status}</td>
                        <td className="border p-2">
                          <QRCodeCanvas
                            value={item.qrData || `${item.serial}-${item.name}`}
                            size={50}
                          />
                        </td>
                        <td className="border p-2">
                          <button
                            onClick={() => removeItem(index)}
                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                          >
                            Xóa
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button
                  onClick={handlePrev}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-gray-600"
                >
                  Quay lại
                </button>
                <button
                  onClick={handleNext}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Tiếp theo
                </button>
              </div>
            )}
            {step === 4 && (
              <div>
                <h3>Xác nhận thông tin</h3>
                <p>Người mượn: {borrowData.borrower}</p>
                <p>Ngày mượn: {borrowData.borrowDate}</p>
                <p>Hạn trả: {borrowData.dueDate}</p>
                <p>Lý do: {borrowData.purpose}</p>
                <h4>Danh sách thiết bị</h4>
                <table className="w-full border-collapse border">
                  <thead>
                    <tr>
                      <th className="border p-2">Serial</th>
                      <th className="border p-2">Tên</th>
                      <th className="border p-2">Số lượng</th>
                      <th className="border p-2">Tình trạng</th>
                      <th className="border p-2">QR Code</th>
                    </tr>
                  </thead>
                  <tbody>
                    {borrowData.selectedItems.map((item, index) => (
                      <tr key={index}>
                        <td className="border p-2">{item.serial || item.id}</td>
                        <td className="border p-2">{item.name}</td>
                        <td className="border p-2">{item.quantity || 1}</td>
                        <td className="border p-2">{item.status}</td>
                        <td className="border p-2">
                          <QRCodeCanvas
                            value={item.qrData || `${item.serial}-${item.name}`}
                            size={50}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button
                  onClick={handlePrev}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-gray-600"
                >
                  Quay lại
                </button>
                <button
                  onClick={handleSave}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 mr-2"
                >
                  Lưu phiếu mượn
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Hủy
                </button>
              </div>
            )}
          </div>
          {notification && (
            <div className="mb-4 p-2 bg-green-100 text-green-700 rounded-lg">
              {notification}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CreateBorrowReceipt;
