import React, { useState, useCallback } from "react";
import * as XLSX from "xlsx";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import useRole from "../components/auth/useRole"; 


const Filter = ({ onFilterChange, categories }) => {
  return (
    <div className="mb-4">
      <label className="mr-2">Lọc theo danh mục:</label>
      <select
        name="category"
        onChange={(e) => onFilterChange({ name: "category", value: e.target.value })}
        className="border rounded-lg px-3 py-1"
      >
        <option value="">Tất cả</option>
        {categories && categories.length > 0 ? (
          categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))
        ) : (
          <option value="" disabled>
            Không có danh mục
          </option>
        )}
      </select>
    </div>
  );
};

// Dữ liệu giả lập cho tài sản
const initialAssetData = [
  {
    id: "TS001",
    name: "Máy tính xách tay",
    category: "Điện tử",
    purchaseDate: "2023-01-15",
    price: 15000000,
    status: "Đang sử dụng",
  },
  {
    id: "TS002",
    name: "Bàn làm việc",
    category: "Nội thất",
    purchaseDate: "2022-06-20",
    price: 2000000,
    status: "Đang sử dụng",
  },
];

const AssetList = ({ setIsAuthenticated }) => {
  const role = useRole(); // Lấy vai trò người dùng
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [assetData, setAssetData] = useState(initialAssetData);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [newAsset, setNewAsset] = useState({
    id: "",
    name: "",
    category: "",
    purchaseDate: "",
    price: "",
    status: "",
  });
  const [filter, setFilter] = useState({ category: "" });

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
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

  const filteredData = assetData.filter((asset) => {
    const matchesSearch =
      asset.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = filter.category
      ? asset.category === filter.category
      : true;

    return matchesSearch && matchesCategory;
  });

  const handleAddAsset = useCallback(
    (e) => {
      e.preventDefault();
      setAssetData((prevData) => [...prevData, newAsset]);
      setNewAsset({
        id: "",
        name: "",
        category: "",
        purchaseDate: "",
        price: "",
        status: "",
      });
      setShowAddForm(false);
    },
    [newAsset]
  );

  const handleShowDetail = useCallback((asset) => {
    setSelectedAsset(asset);
    setShowDetailModal(true);
  }, []);

  const handleShowEdit = useCallback((asset) => {
    setSelectedAsset({ ...asset });
    setShowEditModal(true);
  }, []);

  const handleEditAsset = useCallback(
    (e) => {
      e.preventDefault();
      setAssetData((prevData) =>
        prevData.map((asset) =>
          asset.id === selectedAsset.id ? selectedAsset : asset
        )
      );
      setShowEditModal(false);
      setSelectedAsset(null);
    },
    [selectedAsset]
  );

  const handleDeleteAsset = useCallback((id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa tài sản này?")) {
      setAssetData((prevData) => prevData.filter((asset) => asset.id !== id));
    }
  }, []);

  const handleExportExcel = useCallback(() => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Danh sách tài sản");
    XLSX.writeFile(workbook, "DanhSachTaiSan.xlsx");
  }, [filteredData]);

  const categories = assetData
    ? [...new Set(assetData.map((asset) => asset.category))]
    : [];

  if (!assetData || !filteredData) {
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
              <h2 className="text-lg font-semibold">Danh sách tài sản</h2>
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
                {canAdd && (
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Thêm mới
                  </button>
                )}
                {canExport && (
                  <button
                    onClick={handleExportExcel}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Xuất EXCEL
                  </button>
                )}
              </div>
            </div>

            {/* Bộ lọc */}
            <Filter onFilterChange={handleFilterChange} categories={categories} />

            {/* Form Thêm mới (Modal) */}
            {showAddForm && canAdd && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                  <h3 className="text-lg font-semibold mb-4">Thêm tài sản mới</h3>
                  <form onSubmit={handleAddAsset}>
                    <div className="mb-4">
                      <label className="block text-gray-700">Mã tài sản</label>
                      <input
                        type="text"
                        value={newAsset.id}
                        onChange={(e) =>
                          setNewAsset({ ...newAsset, id: e.target.value })
                        }
                        className="w-full border rounded-lg px-3 py-1"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Tên tài sản</label>
                      <input
                        type="text"
                        value={newAsset.name}
                        onChange={(e) =>
                          setNewAsset({ ...newAsset, name: e.target.value })
                        }
                        className="w-full border rounded-lg px-3 py-1"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Danh mục</label>
                      <input
                        type="text"
                        value={newAsset.category}
                        onChange={(e) =>
                          setNewAsset({ ...newAsset, category: e.target.value })
                        }
                        className="w-full border rounded-lg px-3 py-1"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Ngày mua</label>
                      <input
                        type="date"
                        value={newAsset.purchaseDate}
                        onChange={(e) =>
                          setNewAsset({ ...newAsset, purchaseDate: e.target.value })
                        }
                        className="w-full border rounded-lg px-3 py-1"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Giá trị</label>
                      <input
                        type="number"
                        value={newAsset.price}
                        onChange={(e) =>
                          setNewAsset({ ...newAsset, price: e.target.value })
                        }
                        className="w-full border rounded-lg px-3 py-1"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Trạng thái</label>
                      <select
                        value={newAsset.status}
                        onChange={(e) =>
                          setNewAsset({ ...newAsset, status: e.target.value })
                        }
                        className="w-full border rounded-lg px-3 py-1"
                        required
                      >
                        <option value="">Chọn trạng thái</option>
                        <option value="Đang sử dụng">Đang sử dụng</option>
                        <option value="Hỏng">Hỏng</option>
                        <option value="Thanh lý">Thanh lý</option>
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

            {/* Modal Chi tiết tài sản */}
            {showDetailModal && selectedAsset && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                  <h3 className="text-lg font-semibold mb-4">Chi tiết tài sản</h3>
                  <div className="space-y-2">
                    <p>
                      <strong>Mã tài sản:</strong> {selectedAsset.id}
                    </p>
                    <p>
                      <strong>Tên tài sản:</strong> {selectedAsset.name}
                    </p>
                    <p>
                      <strong>Danh mục:</strong> {selectedAsset.category}
                    </p>
                    <p>
                      <strong>Ngày mua:</strong> {selectedAsset.purchaseDate}
                    </p>
                    <p>
                      <strong>Giá trị:</strong> {selectedAsset.price.toLocaleString()} VNĐ
                    </p>
                    <p>
                      <strong>Trạng thái:</strong> {selectedAsset.status}
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

            {/* Modal Chỉnh sửa tài sản */}
            {showEditModal && selectedAsset && canEdit && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                  <h3 className="text-lg font-semibold mb-4">Chỉnh sửa tài sản</h3>
                  <form onSubmit={handleEditAsset}>
                    <div className="mb-4">
                      <label className="block text-gray-700">Mã tài sản</label>
                      <input
                        type="text"
                        value={selectedAsset.id}
                        onChange={(e) =>
                          setSelectedAsset({ ...selectedAsset, id: e.target.value })
                        }
                        className="w-full border rounded-lg px-3 py-1"
                        disabled
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Tên tài sản</label>
                      <input
                        type="text"
                        value={selectedAsset.name}
                        onChange={(e) =>
                          setSelectedAsset({ ...selectedAsset, name: e.target.value })
                        }
                        className="w-full border rounded-lg px-3 py-1"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Danh mục</label>
                      <input
                        type="text"
                        value={selectedAsset.category}
                        onChange={(e) =>
                          setSelectedAsset({ ...selectedAsset, category: e.target.value })
                        }
                        className="w-full border rounded-lg px-3 py-1"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Ngày mua</label>
                      <input
                        type="date"
                        value={selectedAsset.purchaseDate}
                        onChange={(e) =>
                          setSelectedAsset({ ...selectedAsset, purchaseDate: e.target.value })
                        }
                        className="w-full border rounded-lg px-3 py-1"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Giá trị</label>
                      <input
                        type="number"
                        value={selectedAsset.price}
                        onChange={(e) =>
                          setSelectedAsset({ ...selectedAsset, price: e.target.value })
                        }
                        className="w-full border rounded-lg px-3 py-1"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Trạng thái</label>
                      <select
                        value={selectedAsset.status}
                        onChange={(e) =>
                          setSelectedAsset({ ...selectedAsset, status: e.target.value })
                        }
                        className="w-full border rounded-lg px-3 py-1"
                        required
                      >
                        <option value="Đang sử dụng">Đang sử dụng</option>
                        <option value="Hỏng">Hỏng</option>
                        <option value="Thanh lý">Thanh lý</option>
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

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border p-2 text-left">Mã tài sản</th>
                    <th className="border p-2 text-left">Tên tài sản</th>
                    <th className="border p-2 text-left">Danh mục</th>
                    <th className="border p-2 text-left">Ngày mua</th>
                    <th className="border p-2 text-left">Giá trị</th>
                    <th className="border p-2 text-left">Trạng thái</th>
                    <th className="border p-2 text-left">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((asset) => (
                    <tr key={asset.id} className="hover:bg-gray-100">
                      <td className="border p-2">{asset.id}</td>
                      <td className="border p-2">{asset.name}</td>
                      <td className="border p-2">{asset.category}</td>
                      <td className="border p-2">{asset.purchaseDate}</td>
                      <td className="border p-2">{asset.price.toLocaleString()} VNĐ</td>
                      <td className="border p-2">{asset.status}</td>
                      <td className="border p-2 flex space-x-2">
                        <button
                          onClick={() => handleShowDetail(asset)}
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
                            onClick={() => handleShowEdit(asset)}
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
                            onClick={() => handleDeleteAsset(asset.id)}
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

export default AssetList;