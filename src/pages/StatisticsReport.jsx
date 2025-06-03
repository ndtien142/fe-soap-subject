// src/pages/StatisticsReport.jsx
import React, { useState, useCallback } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import { jsPDF } from "jspdf";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  BarElement
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  BarElement
);

const StatisticsReport = ({ setIsAuthenticated }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [startDate, setStartDate] = useState("2025-01-01");
  const [endDate, setEndDate] = useState("2025-12-31");
  const [stats] = useState({
    totalAssets: 50,
    assetStatus: { "Đang sử dụng": 30, "Đang sửa chữa": 15, "Thanh lý": 5 },
    totalHandovers: 20,
    totalMaintenances: 10,
    totalMaintenanceCost: 15000000,
    handoversByMonth: {
      "Jan 2025": 3,
      "Feb 2025": 4,
      "Mar 2025": 5,
      "Apr 2025": 4,
      "May 2025": 4
    }
  });

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
    doc.text("BÁO CÁO THỐNG KÊ", 105, 15, { align: "center" });
    doc.setFontSize(12);
    doc.text(`Từ ngày: ${startDate} - Đến ngày: ${endDate}`, 105, 25, { align: "center" });

    doc.setFontSize(14);
    doc.text("Tổng quan", 20, 40);
    doc.setFontSize(12);
    doc.text(`Tổng số tài sản: ${stats.totalAssets}`, 20, 50);
    doc.text(`Số phiếu bàn giao: ${stats.totalHandovers}`, 20, 60);
    doc.text(`Số yêu cầu sửa chữa: ${stats.totalMaintenances}`, 20, 70);
    doc.text(
      `Tổng chi phí sửa chữa: ${stats.totalMaintenanceCost.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND"
      })}`,
      20,
      80
    );

    doc.setFontSize(14);
    doc.text("Trạng thái tài sản", 20, 100);
    doc.setFontSize(12);
    Object.entries(stats.assetStatus).forEach(([status, count], index) => {
      doc.text(`${status}: ${count}`, 20, 110 + index * 10);
    });

    doc.setFontSize(14);
    doc.text("Số phiếu bàn giao theo tháng", 20, 140);
    doc.setFontSize(12);
    Object.entries(stats.handoversByMonth).forEach(([month, count], index) => {
      doc.text(`${month}: ${count}`, 20, 150 + index * 10);
    });

    doc.save(`BaoCaoThongKe_${startDate}_den_${endDate}.pdf`);
  };

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const pieChartData = {
    labels: Object.keys(stats.assetStatus),
    datasets: [
      {
        label: "Tỷ lệ trạng thái tài sản",
        data: Object.values(stats.assetStatus),
        backgroundColor: ["#4CAF50", "#FF9800", "#F44336"],
        borderColor: ["#ffffff", "#ffffff", "#ffffff"],
        borderWidth: 1
      }
    ]
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Tỷ lệ trạng thái tài sản" }
    }
  };

  const barChartData = {
    labels: Object.keys(stats.handoversByMonth),
    datasets: [
      {
        label: "Số phiếu bàn giao",
        data: Object.values(stats.handoversByMonth),
        backgroundColor: "#2196F3",
        borderColor: "#1976D2",
        borderWidth: 1
      }
    ]
  };

  const barChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "Số phiếu bàn giao" }
      },
      x: {
        title: { display: true, text: "Tháng" }
      }
    },
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Số phiếu bàn giao theo tháng" }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col">
        <Header setIsAuthenticated={setIsAuthenticated} />
        <main className="p-6 flex-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Báo cáo thống kê</h2>
            <button
              onClick={exportToPDF}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              Xuất PDF
            </button>
          </div>

          <div className="mb-6 flex space-x-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Từ ngày</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Đến ngày</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500">Tổng số nhóm tài sản</h3>
              <p className="text-2xl font-bold">{stats.totalAssets}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500">Số phiếu bàn giao</h3>
              <p className="text-2xl font-bold">{stats.totalHandovers}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500">Số yêu cầu sửa chữa</h3>
              <p className="text-2xl font-bold">{stats.totalMaintenances}</p>
              <p className="text-sm text-gray-500">
                Tổng chi phí: {stats.totalMaintenanceCost.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND"
                })}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow h-96">
              <h3 className="text-lg font-semibold mb-4">Tỷ lệ trạng thái tài sản</h3>
              {Object.values(stats.assetStatus).every((value) => value === 0) ? (
                <p className="text-gray-500 text-center">Không có dữ liệu để hiển thị</p>
              ) : (
                <Pie data={pieChartData} options={pieChartOptions} />
              )}
            </div>
            <div className="bg-white p-4 rounded-lg shadow h-96">
              <h3 className="text-lg font-semibold mb-4">Số phiếu bàn giao theo tháng</h3>
              <Bar data={barChartData} options={barChartOptions} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StatisticsReport;