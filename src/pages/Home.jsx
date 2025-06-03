import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import { Bar, Pie } from "react-chartjs-2"; 
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js"; 

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
        {/* Header */}
        <Header setIsAuthenticated={setIsAuthenticated} />

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
              <div 
                className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-md transition cursor-pointer"
                onClick={() => navigate("/")}
              >
                <h3 className="text-lg font-medium text-blue-500">
                  Theo dõi Tình trạng
                </h3>
                <p className="text-gray-600">
                  Kiểm tra trạng thái sử dụng, bảo trì của tài sản.
                </p>
              </div>
              <div 
                className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-md transition cursor-pointer"
                onClick={() => navigate("/statistics-report")}
              >
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