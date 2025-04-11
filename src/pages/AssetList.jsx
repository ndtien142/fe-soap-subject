import React, { useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as XLSX from "xlsx";
import Filter from "../components/Filter";
import Sidebar from "../components/Sidebar"; 

// Dữ liệu giả lập ban đầu
const initialAssetData = [
  {
    id: "PC0002",
    name: "Máy tính để bàn",
    category: "CNTT",
    status: "Tốt",
    purchaseDate: "2016-09-19",
    warrantyDate: "2016-09-19",
    warrantyStatus: "Empty",
  },
  {
    id: "PC0001",
    name: "Máy tính xách tay",
    category: "CNTT",
    status: "Hỏng",
    purchaseDate: "2016-09-19",
    warrantyDate: "2016-09-19",
    warrantyStatus: "Empty",
  },
];

const AssetList = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [assetData, setAssetData] = useState(initialAssetData);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAsset, setNewAsset] = useState({
    id: "",
    name: "",
    category: "",
    status: "",
    purchaseDate: "",
    warrantyDate: "",
    warrantyStatus: "",
  });

  // State cho bộ lọc
  const [filter, setFilter] = useState({
    category: "",
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
    setIsDropdownOpen(false);
  };

  // Tìm kiếm
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Xử lý thay đổi bộ lọc từ Filter component
  const handleFilterChange = useCallback(({ name, value }) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  }, []);

  // Lọc dữ liệu
  const filteredData = assetData.filter((asset) => {
    const matchesSearch =
      asset.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = filter.category
      ? asset.category === filter.category
      : true;

    return matchesSearch && matchesCategory;
  });

  // Thêm mới
  const handleAddAsset = (e) => {
    e.preventDefault();
    setAssetData([...assetData, newAsset]);
    setNewAsset({
      id: "",
      name: "",
      category: "",
      status: "",
      purchaseDate: "",
      warrantyDate: "",
      warrantyStatus: "",
    });
    setShowAddForm(false);
  };

  // Xóa
  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa tài sản này?")) {
      setAssetData(assetData.filter((asset) => asset.id !== id));
    }
  };

  // Xuất Excel
  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Danh sách tài sản");
    XLSX.writeFile(workbook, "DanhSachTaiSan.xlsx");
  };

  // Lấy danh sách các giá trị duy nhất cho bộ lọc
  const categories = [...new Set(assetData.map((asset) => asset.category))];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sử dụng Sidebar component */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-red-800 text-white p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">PTIT</h1>
          <div className="relative">
            <button onClick={toggleDropdown} className="focus:outline-none">
              {avatar ? (
                <img
                  src={avatar}
                  alt="Admin Avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <svg
                  className="w-10 h-10 rounded-full bg-gray-200 p-1 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5.121 17.804A7.978 7.978 0 0112 14a7.978 7.978 0 016.879 3.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 2a10 10 0 100 20 10 10 0 000-20z"
                  />
                </svg>
              )}
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg z-10">
                <div className="py-2">
                  <label className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Đổi hình ảnh
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                  </label>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Đăng xuất
                  </button>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Content */}
        <main className="p-6 flex-1">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Danh mục tài sản</h2>
              <div className="flex items-center space-x-2">
                {/* Thanh tìm kiếm */}
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
                {/* Các nút */}
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
                <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                  Nhập dữ liệu
                </button>
                <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
                  Tùy chọn
                </button>
                <button className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600">
                  Quản lý
                </button>
                <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                  Báo cáo
                </button>
              </div>
            </div>

            {/* Tích hợp Filter */}
            <Filter onFilterChange={handleFilterChange} categories={categories} />

            {/* Form Thêm mới (Modal) */}
            {showAddForm && (
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
                      <label className="block text-gray-700">Phân loại</label>
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
                      <label className="block text-gray-700">Trạng thái</label>
                      <input
                        type="text"
                        value={newAsset.status}
                        onChange={(e) =>
                          setNewAsset({ ...newAsset, status: e.target.value })
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
                      <label className="block text-gray-700">Ngày hết bảo hành</label>
                      <input
                        type="date"
                        value={newAsset.warrantyDate}
                        onChange={(e) =>
                          setNewAsset({ ...newAsset, warrantyDate: e.target.value })
                        }
                        className="w-full border rounded-lg px-3 py-1"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Ngày bảo hành tiếp theo</label>
                      <input
                        type="text"
                        value={newAsset.warrantyStatus}
                        onChange={(e) =>
                          setNewAsset({ ...newAsset, warrantyStatus: e.target.value })
                        }
                        className="w-full border rounded-lg px-3 py-1"
                        required
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

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border p-2 text-left">Mã tài sản</th>
                    <th className="border p-2 text-left">Tên tài sản</th>
                    <th className="border p-2 text-left">Phân loại</th>
                    <th className="border p-2 text-left">Trạng thái</th>
                    <th className="border p-2 text-left">Ngày mua</th>
                    <th className="border p-2 text-left">Ngày hết bảo hành</th>
                    <th className="border p-2 text-left">Ngày bảo hành tiếp theo</th>
                    <th className="border p-2 text-left">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((asset) => (
                    <tr key={asset.id} className="hover:bg-gray-100">
                      <td className="border p-2">{asset.id}</td>
                      <td className="border p-2">{asset.name}</td>
                      <td className="border p-2">{asset.category}</td>
                      <td className="border p-2">{asset.status}</td>
                      <td className="border p-2">{asset.purchaseDate}</td>
                      <td className="border p-2">{asset.warrantyDate}</td>
                      <td className="border p-2 text-red-500">{asset.warrantyStatus}</td>
                      <td className="border p-2 flex space-x-2">
                        {/* Biểu tượng xem chi tiết (mắt) */}
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
                        {/* Biểu tượng chỉnh sửa (bút) */}
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
                        <button
                          onClick={() => handleDelete(asset.id)}
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
                              d="M6 18L18 6M6 6l12 12"
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

export default AssetList;