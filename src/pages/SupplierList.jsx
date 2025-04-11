import React, { useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as XLSX from "xlsx";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import useRole from "../components/auth/useRole";

const Filter = ({ onFilterChange, statuses }) => {
  return (
    <div className="mb-4">
      <label className="mr-2">Lọc theo trạng thái:</label>
      <select
        name="status"
        onChange={(e) => onFilterChange({ name: "status", value: e.target.value })}
        className="border rounded-lg px-3 py-1"
      >
        <option value="">Tất cả</option>
        {statuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );
};

// Dữ liệu giả lập cho nhà cung cấp
const initialSupplierData = [
  {
    id: "NCC001",
    name: "Công ty TNHH ABC",
    address: "123 Đường Láng, Hà Nội",
    phone: "0123 456 789",
    email: "abc@company.com",
    status: "Hoạt động",
  },
  {
    id: "NCC002",
    name: "Công ty CP XYZ",
    address: "456 Nguyễn Trãi, TP.HCM",
    phone: "0987 654 321",
    email: "xyz@company.com",
    status: "Không hoạt động",
  },
];

const SupplierList = ({ setIsAuthenticated }) => {
  const role = useRole(); 
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [supplierData, setSupplierData] = useState(initialSupplierData);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSupplier, setNewSupplier] = useState({
    id: "",
    name: "",
    address: "",
    phone: "",
    email: "",
    status: "",
  });
  const [filter, setFilter] = useState({ status: "" });
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
  }, [setIsAuthenticated, navigate]);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen((prev) => !prev);
  }, []);

  const handleAvatarChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
    setIsDropdownOpen(false);
  }, []);

  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleFilterChange = useCallback(({ name, value }) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  }, []);

  const filteredData = supplierData.filter((supplier) => {
    const matchesSearch =
      supplier.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filter.status
      ? supplier.status === filter.status
      : true;

    return matchesSearch && matchesStatus;
  });

  const handleAddSupplier = useCallback(
    (e) => {
      e.preventDefault();
      setSupplierData((prevData) => [...prevData, newSupplier]);
      setNewSupplier({
        id: "",
        name: "",
        address: "",
        phone: "",
        email: "",
        status: "",
      });
      setShowAddForm(false);
    },
    [newSupplier]
  );

  const handleEditSupplier = useCallback(
    (e) => {
      e.preventDefault();
      setSupplierData((prevData) =>
        prevData.map((supplier) =>
          supplier.id === selectedSupplier.id ? selectedSupplier : supplier
        )
      );
      setShowEditModal(false);
      setSelectedSupplier(null);
    },
    [selectedSupplier]
  );

  const handleDelete = useCallback((id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa nhà cung cấp này?")) {
      setSupplierData((prevData) =>
        prevData.filter((supplier) => supplier.id !== id)
      );
    }
  }, []);

  const handleExportExcel = useCallback(() => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Danh sách nhà cung cấp");
    XLSX.writeFile(workbook, "DanhSachNhaCungCap.xlsx");
  }, [filteredData]);

  const handleShowDetail = useCallback((supplier) => {
    setSelectedSupplier(supplier);
    setShowDetailModal(true);
  }, []);

  const handleShowEdit = useCallback((supplier) => {
    setSelectedSupplier({ ...supplier });
    setShowEditModal(true);
  }, []);

  const statuses = supplierData
    ? [...new Set(supplierData.map((supplier) => supplier.status))]
    : [];

  if (!supplierData || !filteredData) {
    return <div>Đang tải dữ liệu...</div>;
  }

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
              <h2 className="text-lg font-semibold">Nhà cung cấp</h2>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="border rounded-lg px-3 py-1 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <svg
                    className="w-5 h-5 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Thêm mới
                </button>
                <button
                  onClick={handleExportExcel}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Xuất EXCEL
                </button>
              </div>
            </div>

            {/* Bộ lọc */}
            <Filter onFilterChange={handleFilterChange} statuses={statuses} />

            {/* Modal Chi tiết nhà cung cấp */}
            {showDetailModal && selectedSupplier && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                  <h3 className="text-lg font-semibold mb-4">Chi tiết nhà cung cấp</h3>
                  <div className="space-y-2">
                    <p>
                      <strong>Mã nhà cung cấp:</strong> {selectedSupplier.id}
                    </p>
                    <p>
                      <strong>Tên nhà cung cấp:</strong> {selectedSupplier.name}
                    </p>
                    <p>
                      <strong>Địa chỉ:</strong> {selectedSupplier.address}
                    </p>
                    <p>
                      <strong>Số điện thoại:</strong> {selectedSupplier.phone}
                    </p>
                    <p>
                      <strong>Email:</strong> {selectedSupplier.email}
                    </p>
                    <p>
                      <strong>Trạng thái:</strong> {selectedSupplier.status}
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

            {/* Modal Chỉnh sửa nhà cung cấp */}
            {showEditModal && selectedSupplier && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                  <h3 className="text-lg font-semibold mb-4">Chỉnh sửa nhà cung cấp</h3>
                  <form onSubmit={handleEditSupplier}>
                    <div className="mb-4">
                      <label className="block text-gray-700">Mã nhà cung cấp</label>
                      <input
                        type="text"
                        value={selectedSupplier.id}
                        onChange={(e) =>
                          setSelectedSupplier({ ...selectedSupplier, id: e.target.value })
                        }
                        className="w-full border rounded-lg px-3 py-1"
                        disabled
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Tên nhà cung cấp</label>
                      <input
                        type="text"
                        value={selectedSupplier.name}
                        onChange={(e) =>
                          setSelectedSupplier({ ...selectedSupplier, name: e.target.value })
                        }
                        className="w-full border rounded-lg px-3 py-1"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Địa chỉ</label>
                      <input
                        type="text"
                        value={selectedSupplier.address}
                        onChange={(e) =>
                          setSelectedSupplier({ ...selectedSupplier, address: e.target.value })
                        }
                        className="w-full border rounded-lg px-3 py-1"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Số điện thoại</label>
                      <input
                        type="text"
                        value={selectedSupplier.phone}
                        onChange={(e) =>
                          setSelectedSupplier({ ...selectedSupplier, phone: e.target.value })
                        }
                        className="w-full border rounded-lg px-3 py-1"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Email</label>
                      <input
                        type="email"
                        value={selectedSupplier.email}
                        onChange={(e) =>
                          setSelectedSupplier({ ...selectedSupplier, email: e.target.value })
                        }
                        className="w-full border rounded-lg px-3 py-1"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Trạng thái</label>
                      <select
                        value={selectedSupplier.status}
                        onChange={(e) =>
                          setSelectedSupplier({ ...selectedSupplier, status: e.target.value })
                        }
                        className="w-full border rounded-lg px-3 py-1"
                        required
                      >
                        <option value="Hoạt động">Hoạt động</option>
                        <option value="Không hoạt động">Không hoạt động</option>
                      </select>
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

            {/* Form Thêm mới (Modal) */}
            {showAddForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                  <h3 className="text-lg font-semibold mb-4">Thêm nhà cung cấp mới</h3>
                  <form onSubmit={handleAddSupplier}>
                    <div className="mb-4">
                      <label className="block text-gray-700">Mã nhà cung cấp</label>
                      <input
                        type="text"
                        value={newSupplier.id}
                        onChange={(e) =>
                          setNewSupplier({ ...newSupplier, id: e.target.value })
                        }
                        className="w-full border rounded-lg px-3 py-1"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Tên nhà cung cấp</label>
                      <input
                        type="text"
                        value={newSupplier.name}
                        onChange={(e) =>
                          setNewSupplier({ ...newSupplier, name: e.target.value })
                        }
                        className="w-full border rounded-lg px-3 py-1"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Địa chỉ</label>
                      <input
                        type="text"
                        value={newSupplier.address}
                        onChange={(e) =>
                          setNewSupplier({ ...newSupplier, address: e.target.value })
                        }
                        className="w-full border rounded-lg px-3 py-1"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Số điện thoại</label>
                      <input
                        type="text"
                        value={newSupplier.phone}
                        onChange={(e) =>
                          setNewSupplier({ ...newSupplier, phone: e.target.value })
                        }
                        className="w-full border rounded-lg px-3 py-1"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Email</label>
                      <input
                        type="email"
                        value={newSupplier.email}
                        onChange={(e) =>
                          setNewSupplier({ ...newSupplier, email: e.target.value })
                        }
                        className="w-full border rounded-lg px-3 py-1"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Trạng thái</label>
                      <select
                        value={newSupplier.status}
                        onChange={(e) =>
                          setNewSupplier({ ...newSupplier, status: e.target.value })
                        }
                        className="w-full border rounded-lg px-3 py-1"
                        required
                      >
                        <option value="">Chọn trạng thái</option>
                        <option value="Hoạt động">Hoạt động</option>
                        <option value="Không hoạt động">Không hoạt động</option>
                      </select>
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

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border p-2 text-left">Mã nhà cung cấp</th>
                    <th className="border p-2 text-left">Tên nhà cung cấp</th>
                    <th className="border p-2 text-left">Địa chỉ</th>
                    <th className="border p-2 text-left">Số điện thoại</th>
                    <th className="border p-2 text-left">Email</th>
                    <th className="border p-2 text-left">Trạng thái</th>
                    <th className="border p-2 text-left">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((supplier) => (
                    <tr key={supplier.id} className="hover:bg-gray-100">
                      <td className="border p-2">{supplier.id}</td>
                      <td className="border p-2">{supplier.name}</td>
                      <td className="border p-2">{supplier.address}</td>
                      <td className="border p-2">{supplier.phone}</td>
                      <td className="border p-2">{supplier.email}</td>
                      <td className="border p-2">{supplier.status}</td>
                      <td className="border p-2 flex space-x-2">
                        <button
                          onClick={() => handleShowDetail(supplier)}
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
                          onClick={() => handleShowEdit(supplier)}
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
                          onClick={() => handleDelete(supplier.id)}
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

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
              <p>{filteredData.length} kết quả trong 1 trang</p>
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

export default SupplierList;