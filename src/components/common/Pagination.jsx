// src/components/common/Pagination.jsx
import React from "react";

const Pagination = ({ totalItems }) => {
  return (
    <div className="flex justify-between items-center mt-4">
      <p>{totalItems} kết quả trong 1 trang</p>
      <div className="flex space-x-2">
        <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">{"<"}</button>
        <button className="px-3 py-1 bg-blue-500 text-white rounded">1</button>
        <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">{">"}</button>
      </div>
    </div>
  );
};

export default Pagination;