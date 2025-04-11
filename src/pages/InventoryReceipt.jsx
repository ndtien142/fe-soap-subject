import React, { useState, useCallback } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import useRole from "../components/auth/useRole";

const InventoryReceipt = ({ setIsAuthenticated }) => {
  const role = useRole(); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [receipts, setReceipts] = useState([]); 
  const [newReceipt, setNewReceipt] = useState({
    id: "",
    date: "",
    supplier: "",
    quantity: "",
    note: "",
  });

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const handleAddReceipt = useCallback(
    (e) => {
      e.preventDefault();
      setReceipts((prevData) => [...prevData, newReceipt]);
      setNewReceipt({
        id: "",
        date: "",
        supplier: "",
        quantity: "",
        note: "",
      });
      setShowAddForm(false);
    },
    [newReceipt]
  );

  const handleShowDetail = useCallback((receipt) => {
    setSelectedReceipt(receipt);
    setShowDetailModal(true);
  }, []);

  const handleShowEdit = useCallback((receipt) => {
    setSelectedReceipt({ ...receipt });
    setShowEditModal(true);
  }, []);

  const handleEditReceipt = useCallback(
    (e) => {
      e.preventDefault();
      setReceipts((prevData) =>
        prevData.map((receipt) =>
          receipt.id === selectedReceipt.id ? selectedReceipt : receipt
        )
      );
      setShowEditModal(false);
      setSelectedReceipt(null);
    },
    [selectedReceipt]
  );

  const handleDeleteReceipt = useCallback((id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa phiếu nhập này?")) {
      setReceipts((prevData) => prevData.filter((receipt) => receipt.id !== id));
    }
  }, []);

  // Kiểm tra quyền
  const canAdd = role === "admin" || role === "manager" || role === "supplier"; // Admin, Quản lý, Supplier có quyền thêm
  const canEdit = role === "admin" || role === "manager"; // Chỉ Admin và Quản lý có quyền sửa
  const canDelete = role === "admin"; // Chỉ Admin có quyền xóa

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header setIsAuthenticated={setIsAuthenticated} />

        {/* Content */}
        <main className="p-6 flex-1">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Phiếu nhập</h2>
              <div className="flex items-center space-x-2">
                {canAdd && (
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Thêm mới
                  </button>
                )}
              </div>
            </div>

            {/* Form Thêm mới (Modal) */}
            {showAddForm && canAdd && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                  <h3 className="text-lg font-semibold mb-4">Thêm phiếu nhập mới</h3>
                  <form onSubmit={handleAddReceipt}>
                    <div className="mb-4">
                      <label className="block text-gray-700">Mã phiếu nhập</label>
                      <input
                        type="text"
                        value={newReceipt.id}
                        onChange={(e) =>
                          setNewReceipt({ ...newReceipt, id: e.target.value })
                        }
                        className="w-full border rounded-lg px-3 py-1"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Ngày nhập</label>
                      <input
                        type="date"
                        value={newReceipt.date}
                        onChange={(e) =>
                          setNewReceipt({ ...newReceipt, date: e.target.value })
                        }
                        className="w-full border rounded-lg px-3 py-1"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Nhà cung cấp</label>
                      <input
                        type="text"
                        value={newReceipt.supplier}
                        onChange={(e) =>
                          setNewReceipt({ ...newReceipt, supplier: e.target.value })
                        }
                        className="w-full border rounded-lg px-3 py-1"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Số lượng</label>
                      <input
                        type="number"
                        value={newReceipt.quantity}
                        onChange={(e) =>
                          setNewReceipt({ ...newReceipt, quantity: e.target.value })
                        }
                        className="w-full border rounded-lg px-3 py-1"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Ghi chú</label>
                      <textarea
                        value={newReceipt.note}
                        onChange={(e) =>
                          setNewReceipt({ ...newReceipt, note: e.target.value })
                        }
                        className="w-full border rounded-lg px-3 py-1"
                        rows="3"
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button
                        type="button"
                        onClick={() => setShowAddForm(false)}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                      >
                        Hủy
                      </button>
                      <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      >
                        Thêm
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Modal Chi tiết phiếu nhập */}
            {showDetailModal && selectedReceipt && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                  <h3 className="text-lg font-semibold mb-4">Chi tiết phiếu nhập</h3>
                  <div className="space-y-2">
                    <p>
                      <strong>Mã phiếu nhập:</strong> {selectedReceipt.id}
                    </p>
                    <p>
                      <strong>Ngày nhập:</strong> {selectedReceipt.date}
                    </p>
                    <p>
                      <strong>Nhà cung cấp:</strong> {selectedReceipt.supplier}
                    </p>
                    <p>
                      <strong>Số lượng:</strong> {selectedReceipt.quantity}
                    </p>
                    <p>
                      <strong>Ghi chú:</strong>{" "}
                      {selectedReceipt.note || "Không có ghi chú"}
                    </p>
                  </div>
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={() => setShowDetailModal(false)}
                      className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                      Đóng
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Modal Chỉnh sửa phiếu nhập */}
            {showEditModal && selectedReceipt && canEdit && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                  <h3 className="text-lg font-semibold mb-4">Chỉnh sửa phiếu nhập</h3>
                  <form onSubmit={handleEditReceipt}>
                    <div className="mb-4">
                      <label className="block text-gray-700">Mã phiếu nhập</label>
                      <input
                        type="text"
                        value={selectedReceipt.id}
                        onChange={(e) =>
                          setSelectedReceipt({ ...selectedReceipt, id: e.target.value })
                        }
                        className="w-full border rounded-lg px-3 py-1"
                        disabled
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Ngày nhập</label>
                      <input
                        type="date"
                        value={selectedReceipt.date}
                        onChange={(e) =>
                          setSelectedReceipt({ ...selectedReceipt, date: e.target.value })
                        }
                        className="w-full border rounded-lg px-3 py-1"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Nhà cung cấp</label>
                      <input
                        type="text"
                        value={selectedReceipt.supplier}
                        onChange={(e) =>
                          setSelectedReceipt({ ...selectedReceipt, supplier: e.target.value })
                        }
                        className="w-full border rounded-lg px-3 py-1"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Số lượng</label>
                      <input
                        type="number"
                        value={selectedReceipt.quantity}
                        onChange={(e) =>
                          setSelectedReceipt({ ...selectedReceipt, quantity: e.target.value })
                        }
                        className="w-full border rounded-lg px-3 py-1"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Ghi chú</label>
                      <textarea
                        value={selectedReceipt.note}
                        onChange={(e) =>
                          setSelectedReceipt({ ...selectedReceipt, note: e.target.value })
                        }
                        className="w-full border rounded-lg px-3 py-1"
                        rows="3"
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button
                        type="button"
                        onClick={() => setShowEditModal(false)}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                      >
                        Hủy
                      </button>
                      <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      >
                        Lưu
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border p-2 text-left">Mã phiếu nhập</th>
                    <th className="border p-2 text-left">Ngày nhập</th>
                    <th className="border p-2 text-left">Nhà cung cấp</th>
                    <th className="border p-2 text-left">Số lượng</th>
                    <th className="border p-2 text-left">Ghi chú</th>
                    <th className="border p-2 text-left">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {receipts.map((receipt) => (
                    <tr key={receipt.id} className="hover:bg-gray-100">
                      <td className="border p-2">{receipt.id}</td>
                      <td className="border p-2">{receipt.date}</td>
                      <td className="border p-2">{receipt.supplier}</td>
                      <td className="border p-2">{receipt.quantity}</td>
                      <td className="border p-2">{receipt.note || "Không có ghi chú"}</td>
                      <td className="border p-2 flex space-x-2">
                        <button
                          onClick={() => handleShowDetail(receipt)}
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
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </button>
                        {canEdit && (
                          <button
                            onClick={() => handleShowEdit(receipt)}
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
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>
                        )}
                        {canDelete && (
                          <button
                            onClick={() => handleDeleteReceipt(receipt.id)}
                            className="text-red-500 hover:text-red-700"
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
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4M4 7h16"
                              />
                            </svg>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination (Tạm thời) */}
            <div className="flex justify-between items-center mt-4">
              <p>{receipts.length} kết quả trong 1 trang</p>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
                  {"<"}
                </button>
                <button className="px-3 py-1 bg-blue-500 text-white rounded">
                  1
                </button>
                <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
                  {">"}
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default InventoryReceipt;