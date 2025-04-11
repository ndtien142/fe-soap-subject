import React, { useState, useCallback } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header"; 
import useRole from "../components/auth/useRole";

const InventoryIssue = ({ setIsAuthenticated }) => {
  const role = useRole(); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [issues, setIssues] = useState([]); 
  const [newIssue, setNewIssue] = useState({
    id: "",
    date: "",
    recipient: "",
    quantity: "",
    note: "",
  });

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const handleAddIssue = useCallback(
    (e) => {
      e.preventDefault();
      setIssues((prevData) => [...prevData, newIssue]);
      setNewIssue({
        id: "",
        date: "",
        recipient: "",
        quantity: "",
        note: "",
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
      setIssues((prevData) =>
        prevData.map((issue) =>
          issue.id === selectedIssue.id ? selectedIssue : issue
        )
      );
      setShowEditModal(false);
      setSelectedIssue(null);
    },
    [selectedIssue]
  );

  const handleDeleteIssue = useCallback((id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa phiếu xuất này?")) {
      setIssues((prevData) => prevData.filter((issue) => issue.id !== id));
    }
  }, []);

  // Kiểm tra quyền
  const canAdd = role === "admin" || role === "manager"; // Admin và Quản lý có quyền thêm
  const canEdit = role === "admin" || role === "manager"; // Admin và Quản lý có quyền sửa
  const canDelete = role === "admin"; // Chỉ Admin có quyền xóa
  const canExport = role === "admin" || role === "manager"; // Admin và Quản lý có quyền xuất Excel

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
              <h2 className="text-lg font-semibold">Phiếu xuất</h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowAddForm(true)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Thêm mới
                </button>
              </div>
            </div>

            {/* Form Thêm mới (Modal) */}
            {showAddForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                  <h3 className="text-lg font-semibold mb-4">Thêm phiếu xuất mới</h3>
                  <form onSubmit={handleAddIssue}>
                    <div className="mb-4">
                      <label className="block text-gray-700">Mã phiếu xuất</label>
                      <input
                        type="text"
                        value={newIssue.id}
                        onChange={(e) =>
                          setNewIssue({ ...newIssue, id: e.target.value })
                        }
                        className="w-full border rounded-lg px-3 py-1"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Ngày xuất</label>
                      <input
                        type="date"
                        value={newIssue.date}
                        onChange={(e) =>
                          setNewIssue({ ...newIssue, date: e.target.value })
                        }
                        className="w-full border rounded-lg px-3 py-1"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Đơn vị nhận</label>
                      <input
                        type="text"
                        value={newIssue.recipient}
                        onChange={(e) =>
                          setNewIssue({ ...newIssue, recipient: e.target.value })
                        }
                        className="w-full border rounded-lg px-3 py-1"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Số lượng</label>
                      <input
                        type="number"
                        value={newIssue.quantity}
                        onChange={(e) =>
                          setNewIssue({ ...newIssue, quantity: e.target.value })
                        }
                        className="w-full border rounded-lg px-3 py-1"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Ghi chú</label>
                      <textarea
                        value={newIssue.note}
                        onChange={(e) =>
                          setNewIssue({ ...newIssue, note: e.target.value })
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

            {/* Modal Chi tiết phiếu xuất */}
            {showDetailModal && selectedIssue && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                  <h3 className="text-lg font-semibold mb-4">Chi tiết phiếu xuất</h3>
                  <div className="space-y-2">
                    <p>
                      <strong>Mã phiếu xuất:</strong> {selectedIssue.id}
                    </p>
                    <p>
                      <strong>Ngày xuất:</strong> {selectedIssue.date}
                    </p>
                    <p>
                      <strong>Đơn vị nhận:</strong> {selectedIssue.recipient}
                    </p>
                    <p>
                      <strong>Số lượng:</strong> {selectedIssue.quantity}
                    </p>
                    <p>
                      <strong>Ghi chú:</strong>{" "}
                      {selectedIssue.note || "Không có ghi chú"}
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

            {/* Modal Chỉnh sửa phiếu xuất */}
            {showEditModal && selectedIssue && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                  <h3 className="text-lg font-semibold mb-4">Chỉnh sửa phiếu xuất</h3>
                  <form onSubmit={handleEditIssue}>
                    <div className="mb-4">
                      <label className="block text-gray-700">Mã phiếu xuất</label>
                      <input
                        type="text"
                        value={selectedIssue.id}
                        onChange={(e) =>
                          setSelectedIssue({ ...selectedIssue, id: e.target.value })
                        }
                        className="w-full border rounded-lg px-3 py-1"
                        disabled
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Ngày xuất</label>
                      <input
                        type="date"
                        value={selectedIssue.date}
                        onChange={(e) =>
                          setSelectedIssue({ ...selectedIssue, date: e.target.value })
                        }
                        className="w-full border rounded-lg px-3 py-1"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Đơn vị nhận</label>
                      <input
                        type="text"
                        value={selectedIssue.recipient}
                        onChange={(e) =>
                          setSelectedIssue({ ...selectedIssue, recipient: e.target.value })
                        }
                        className="w-full border rounded-lg px-3 py-1"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Số lượng</label>
                      <input
                        type="number"
                        value={selectedIssue.quantity}
                        onChange={(e) =>
                          setSelectedIssue({ ...selectedIssue, quantity: e.target.value })
                        }
                        className="w-full border rounded-lg px-3 py-1"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Ghi chú</label>
                      <textarea
                        value={selectedIssue.note}
                        onChange={(e) =>
                          setSelectedIssue({ ...selectedIssue, note: e.target.value })
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
                    <th className="border p-2 text-left">Mã phiếu xuất</th>
                    <th className="border p-2 text-left">Ngày xuất</th>
                    <th className="border p-2 text-left">Đơn vị nhận</th>
                    <th className="border p-2 text-left">Số lượng</th>
                    <th className="border p-2 text-left">Ghi chú</th>
                    <th className="border p-2 text-left">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {issues.map((issue) => (
                    <tr key={issue.id} className="hover:bg-gray-100">
                      <td className="border p-2">{issue.id}</td>
                      <td className="border p-2">{issue.date}</td>
                      <td className="border p-2">{issue.recipient}</td>
                      <td className="border p-2">{issue.quantity}</td>
                      <td className="border p-2">{issue.note || "Không có ghi chú"}</td>
                      <td className="border p-2 flex space-x-2">
                        <button
                          onClick={() => handleShowDetail(issue)}
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
                        <button
                          onClick={() => handleShowEdit(issue)}
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
                        <button
                          onClick={() => handleDeleteIssue(issue.id)}
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination (Tạm thời) */}
            <div className="flex justify-between items-center mt-4">
              <p>{issues.length} kết quả trong 1 trang</p>
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

export default InventoryIssue;