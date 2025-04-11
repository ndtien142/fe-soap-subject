import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const location = useLocation();

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
              d={isSidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
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
              {isSidebarOpen && <span>Danh mục tài sản</span>}
            </Link>
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
              {isSidebarOpen && <span>Chi tiết tài sản</span>}
            </Link>
          </li> */}
          <li className="p-4 hover:bg-gray-700">
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
              {isSidebarOpen && <span>Sửa chữa</span>}
            </Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link to="/phieubangiao" className="flex items-center">
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
              {isSidebarOpen && <span>Phiếu bàn giao</span>}
            </Link>
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
              {isSidebarOpen && <span>Đồng bộ</span>}
            </Link>
          </li> */}
          <li className="p-4 hover:bg-gray-700">
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
              {isSidebarOpen && <span>Văn phòng</span>}
            </Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
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
              {isSidebarOpen && <span>Nhà cung cấp</span>}
            </Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
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
          </li>
          <li className="p-4 hover:bg-gray-700">
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
          </li>
          <li className="p-4 hover:bg-gray-700">
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
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;