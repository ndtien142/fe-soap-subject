import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Bar, Pie } from "react-chartjs-2"; // Import Bar và Pie từ react-chartjs-2
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js"; // Import các thành phần cần thiết từ Chart.js

// Đăng ký các thành phần Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Home = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [avatar, setAvatar] = useState(null);

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

  // Dữ liệu mẫu cho biểu đồ (có thể thay bằng dữ liệu thực tế)
  const assetData = [
    { category: "CNTT", status: "Tốt" },
    { category: "CNTT", status: "Hỏng" },
    { category: "Văn phòng", status: "Tốt" },
    { category: "CNTT", status: "Đang sửa chữa" },
    { category: "Văn phòng", status: "Hỏng" },
    { category: "CNTT", status: "Tốt" },
  ];

  // Tính toán dữ liệu cho biểu đồ cột (theo trạng thái)
  const statusCounts = assetData.reduce((acc, asset) => {
    acc[asset.status] = (acc[asset.status] || 0) + 1;
    return acc;
  }, {});

  const barData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        label: "Số lượng tài sản",
        data: Object.values(statusCounts),
        backgroundColor: ["#4CAF50", "#F44336", "#FF9800", "#2196F3"],
        borderColor: ["#388E3C", "#D32F2F", "#F57C00", "#1976D2"],
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Thống kê tài sản theo trạng thái" },
    },
  };

  // Tính toán dữ liệu cho biểu đồ tròn (theo danh mục)
  const categoryCounts = assetData.reduce((acc, asset) => {
    acc[asset.category] = (acc[asset.category] || 0) + 1;
    return acc;
  }, {});

  const pieData = {
    labels: Object.keys(categoryCounts),
    datasets: [
      {
        label: "Số lượng tài sản",
        data: Object.values(categoryCounts),
        backgroundColor: ["#4CAF50", "#FF9800", "#2196F3"],
        borderColor: ["#388E3C", "#F57C00", "#1976D2"],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Thống kê tài sản theo danh mục" },
    },
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 flex flex-col">
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

        <main className="p-6 flex-1">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">
              Chào mừng đến với Hệ thống Quản lý Tài sản - Trường PTIT
            </h2>
            <p className="text-gray-600 mb-6">
              Hệ thống hỗ trợ phòng quản trị trường PTIT trong việc quản lý tài sản. Dưới đây là thống kê tổng quan:
            </p>

            {/* Biểu đồ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Biểu đồ cột */}
              <div className="bg-gray-50 p-4 rounded-lg shadow">
                <Bar data={barData} options={barOptions} />
              </div>

              {/* Biểu đồ tròn */}
              <div className="bg-gray-50 p-4 rounded-lg shadow">
                <Pie data={pieData} options={pieOptions} />
              </div>
            </div>

            {/* Các ô điều hướng */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div
                className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-md transition cursor-pointer"
                onClick={() => navigate("/asset-list")}
              >
                <h3 className="text-lg font-medium text-blue-500">
                  Danh sách Tài sản
                </h3>
                <p className="text-gray-600">
                  Xem và quản lý danh sách tài sản của trường.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-md transition">
                <h3 className="text-lg font-medium text-blue-500">
                  Theo dõi Tình trạng
                </h3>
                <p className="text-gray-600">
                  Kiểm tra trạng thái sử dụng, bảo trì của tài sản.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-md transition">
                <h3 className="text-lg font-medium text-blue-500">
                  Báo cáo Thống kê
                </h3>
                <p className="text-gray-600">
                  Tạo báo cáo tổng quan về tài sản theo thời gian.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;