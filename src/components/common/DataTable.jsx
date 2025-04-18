// src/components/common/DataTable.jsx
import React from "react";

const DataTable = ({
  columns,
  data,
  searchTerm,
  onSearch,
  onShowDetail,
  onShowEdit,
  onDelete,
  title,
  renderActions,
  filterComponent, // Thêm prop filterComponent
}) => {
  // Lọc dữ liệu dựa trên searchTerm
  const filteredData = Array.isArray(data)
    ? data.filter((item) => {
        if (!item) return false;
        return columns.some((col) =>
          (item[col.key] || "").toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
    : [];

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <div className="flex items-center space-x-4">
          {filterComponent}
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              value={searchTerm}
              onChange={onSearch}
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
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              {columns.map((col) => (
                <th key={col.key} className="border p-2 text-left">
                  {col.label}
                </th>
              ))}
              <th className="border p-2 text-left">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-100">
                {columns.map((column) => (
                  <td key={column.key} className="border p-2">
                    {column.key === "status" ? (
                      <span
                        className={`${
                          item[column.key] === "Chờ duyệt"
                            ? "text-yellow-600"
                            : item[column.key] === "Đã duyệt"
                            ? "text-green-600"
                            : item[column.key] === "Từ chối"
                            ? "text-red-600"
                            : ""
                        }`}
                      >
                        {item[column.key] || "N/A"}
                      </span>
                    ) : column.key === "type" ? (
                      <span
                        className={`${
                          item[column.key] === "Nhập"
                            ? "text-green-600"
                            : item[column.key] === "Xuất"
                            ? "text-red-600"
                            : ""
                        }`}
                      >
                        {item[column.key] || "N/A"}
                      </span>
                    ) : (
                      item[column.key] || "N/A"
                    )}
                  </td>
                ))}
                <td className="border p-2 flex space-x-2">
                  {renderActions ? (
                    renderActions(item)
                  ) : (
                    <>
                      <button
                        onClick={() => onShowDetail(item)}
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
                        onClick={() => onShowEdit(item)}
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
                        onClick={() => onDelete(item.id)}
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
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;