import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const location = useLocation();
  const [isInventoryOpen, setIsInventoryOpen] = useState(false); // State để quản lý dropdown

  // Hàm toggle dropdown
  const toggleInventoryDropdown = () => {
    setIsInventoryOpen((prev) => !prev);
  };

  return (
    <div
      className={`${
        isSidebarOpen ? "w-64" : "w-16"
      } bg-gray-800 text-white transition-all duration-300 flex flex-col`}
    >
      <div className="p-4 flex items-center justify-between">
        {isSidebarOpen && <h1 className="text-xl font-bold">MENU</h1>}
        <button onClick={toggleSidebar} className="text-white">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={
                isSidebarOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </div>
      <nav className="flex-1">
        <ul>
          <li
            className={`p-4 hover:bg-gray-700 ${
              location.pathname === "/home" ? "bg-gray-700" : ""
            }`}
          >
            <Link to="/home" className="flex items-center">
              <svg
                className="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              {isSidebarOpen && <span>Trang chủ</span>}
            </Link>
          </li>
          <li
            className={`p-4 hover:bg-gray-700 ${
              location.pathname === "/asset-list" ? "bg-gray-700" : ""
            }`}
          >
            <Link to="/asset-list" className="flex items-center">
              <svg
                className="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 17v-2c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2v2m-6 0h6m-9-5h12M5 7h14a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2z"
                />
              </svg>
              {isSidebarOpen && <span>Danh sách nhóm tài sản</span>}
            </Link>
          </li>
          {/* Thay "Nhà cung cấp" thành "Quản lý kho" với dropdown */}
          <li
            className={`p-4 hover:bg-gray-700 ${
              isInventoryOpen ? "bg-gray-700" : ""
            }`}
          >
            <div
              onClick={toggleInventoryDropdown}
              className="flex items-center cursor-pointer"
            >
              <svg
                className="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 17v-2c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2v2m-6 0h6m-9-5h12M5 7h14a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2z"
                />
              </svg>
              {isSidebarOpen && <span className="flex-1">Quản lý kho</span>}
              {isSidebarOpen && (
                <svg
                  className={`w-4 h-4 transform transition-transform ${
                    isInventoryOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              )}
            </div>
            {/* Dropdown */}
            {isInventoryOpen && isSidebarOpen && (
              <ul className="pl-8">
                <li
                  className={`p-2 hover:bg-gray-600 ${
                    location.pathname === "/supplier-list" ? "bg-gray-600" : ""
                  }`}
                >
                  <Link to="/supplier-list" className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 17v-2c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2v2m-6 0h6m-9-5h12M5 7h14a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2z"
                      />
                    </svg>
                    <span>Nhà cung cấp</span>
                  </Link>
                </li>
                <li
                  className={`p-2 hover:bg-gray-600 ${
                    location.pathname === "/inventory-receipt"
                      ? "bg-gray-600"
                      : ""
                  }`}
                >
                  <Link to="/inventory-receipt" className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    <span>Phiếu nhập</span>
                  </Link>
                </li>
                <li
                  className={`p-2 hover:bg-gray-600 ${
                    location.pathname === "/inventory-issue"
                      ? "bg-gray-600"
                      : ""
                  }`}
                >
                  <Link to="/inventory-issue" className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 17h5m-5-5h5m-5-5h5M5 7v10a2 2 0 002 2h10a2 2 0 002-2V7"
                      />
                    </svg>
                    <span>Phiếu xuất</span>
                  </Link>
                </li>
                <li
                  className={`p-2 hover:bg-gray-600 ${
                    location.pathname === "/approval-request-list"
                      ? "bg-gray-600"
                      : ""
                  }`}
                >
                  <Link
                    to="/approval-request-list"
                    className="flex items-center"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Yêu cầu duyệt</span>
                  </Link>
                </li>
                <li
                  className={`p-2 hover:bg-gray-600 ${
                    location.pathname === "/inventory-stock"
                      ? "bg-gray-600"
                      : ""
                  }`}
                >
                  <Link to="/inventory-stock" className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                    <span>Tồn kho</span>
                  </Link>
                </li>
                <li
                  className={`p-2 hover:bg-gray-600 ${
                    location.pathname === "/inventory-history"
                      ? "bg-gray-600"
                      : ""
                  }`}
                >
                  <Link to="/inventory-history" className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Lịch sử xuất nhập</span>
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link to="/maintenance" className="flex items-center">
              <svg
                className="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 17v-2c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2v2m-6 0h6m-9-5h12M5 7h14a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2z"
                />
              </svg>
              {isSidebarOpen && <span>Sửa chữa</span>}
            </Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link to="/handover-document" className="flex items-center">
              <svg
                className="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 17v-2c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2v2m-6 0h6m-9-5h12M5 7h14a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2z"
                />
              </svg>
              {isSidebarOpen && <span>Biên bản bàn giao</span>}
            </Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link to="/asset-management" className="flex items-center">
              <svg
                className="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 17v-2c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2v2m-6 0h6m-9-5h12M5 7h14a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2z"
                />
              </svg>
              {isSidebarOpen && <span>Quản lý tài sản</span>}
            </Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link to="/statistics-report" className="flex items-center">
              <svg
                className="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 17v-2c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2v2m-6 0h6m-9-5h12M5 7h14a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2z"
                />
              </svg>
              {isSidebarOpen && <span>Báo cáo thống kê</span>}
            </Link>
          </li>
          <li
            className={`p-4 hover:bg-gray-700 ${
              isInventoryOpen ? "bg-gray-700" : ""
            }`}
          >
            <div
              onClick={toggleInventoryDropdown}
              className="flex items-center cursor-pointer"
            >
              <svg
                className="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 17v-2c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2v2m-6 0h6m-9-5h12M5 7h14a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2z"
                />
              </svg>
              {isSidebarOpen && (
                <span className="flex-1">Quản lý phiếu mượn</span>
              )}
              {isSidebarOpen && (
                <svg
                  className={`w-4 h-4 transform transition-transform ${
                    isInventoryOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              )}
            </div>
            {/* Dropdown */}
            {isInventoryOpen && isSidebarOpen && (
              <ul className="pl-8">
                <li
                  className={`p-2 hover:bg-gray-600 ${
                    location.pathname === "/supplier-list" ? "bg-gray-600" : ""
                  }`}
                >
                  <Link to="/borrow-receipt-list" className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 17v-2c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2v2m-6 0h6m-9-5h12M5 7h14a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2z"
                      />
                    </svg>
                    <span>Danh sách phiếu mượn</span>
                  </Link>
                </li>
                <li
                  className={`p-2 hover:bg-gray-600 ${
                    location.pathname === "/inventory-receipt"
                      ? "bg-gray-600"
                      : ""
                  }`}
                >
                  <Link
                    to="/create-borrow-receipt"
                    className="flex items-center"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    <span>Tạo phiếu mượn</span>
                  </Link>
                </li>
                <li
                  className={`p-2 hover:bg-gray-600 ${
                    location.pathname === "/inventory-issue"
                      ? "bg-gray-600"
                      : ""
                  }`}
                >
                  <Link
                    to="/borrow-receipt-detail"
                    className="flex items-center"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 17h5m-5-5h5m-5-5h5M5 7v10a2 2 0 002 2h10a2 2 0 002-2V7"
                      />
                    </svg>
                    <span>Chi tiết phiếu mượn</span>
                  </Link>
                </li>
              </ul>
            )}
          </li>
          {/* <li className="p-4 hover:bg-gray-700">
            <Link to="#" className="flex items-center">
              <svg
                className="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 17v-2c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2v2m-6 0h6m-9-5h12M5 7h14a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2z"
                />
              </svg>
              {isSidebarOpen && <span>Thanh lý</span>}
            </Link>
          </li> */}
          {/* <li className="p-4 hover:bg-gray-700">
            <Link to="#" className="flex items-center">
              <svg
                className="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 17v-2c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2v2m-6 0h6m-9-5h12M5 7h14a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2z"
                />
              </svg>
              {isSidebarOpen && <span>Khu vực</span>}
            </Link>
          </li> */}
          {/* <li className="p-4 hover:bg-gray-700">
            <Link to="#" className="flex items-center">
              <svg
                className="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 17v-2c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2v2m-6 0h6m-9-5h12M5 7h14a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2z"
                />
              </svg>
              {isSidebarOpen && <span>Hệ thống</span>}
            </Link>
          </li> */}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
