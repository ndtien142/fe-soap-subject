import { useState } from "react";

const initialRequests = [
  { id: 1, department: "Khoa CNTT", item: "Máy tính xách tay", status: "pending" },
  { id: 2, department: "Phòng Thí nghiệm", item: "Hóa chất A", status: "approved" },
  { id: 3, department: "Khoa Cơ khí", item: "Dụng cụ hàn", status: "rejected" },
];

export default function RequestManagement() {
  const [requests, setRequests] = useState(initialRequests);
  const [filterStatus, setFilterStatus] = useState("all");

  // Cập nhật trạng thái yêu cầu
  const updateStatus = (id, newStatus) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: newStatus } : req))
    );
  };

  // Lọc danh sách
  const filteredRequests =
    filterStatus === "all"
      ? requests
      : requests.filter((req) => req.status === filterStatus);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">📋 Quản lý Yêu cầu Cấp phát</h2>

      {/* Bộ lọc */}
      <div className="mb-4">
        <label className="mr-2 font-semibold">Lọc theo trạng thái:</label>
        <select
          className="border p-2 rounded"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">Tất cả</option>
          <option value="pending">Chờ duyệt</option>
          <option value="approved">Đã duyệt</option>
          <option value="rejected">Từ chối</option>
        </select>
      </div>

      {/* Danh sách yêu cầu */}
      <div className="grid gap-4">
        {filteredRequests.map((req) => (
          <div key={req.id} className="p-4 bg-white shadow-md rounded-lg flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">{req.item}</h3>
              <p className="text-gray-600">{req.department}</p>
            </div>

            <div className="flex items-center space-x-4">
              {/* Badge trạng thái */}
              <span
                className={`px-3 py-1 rounded-full text-white ${
                  req.status === "pending"
                    ? "bg-yellow-400"
                    : req.status === "approved"
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
              >
                {req.status === "pending"
                  ? "⏳ Chờ duyệt"
                  : req.status === "approved"
                  ? "✅ Đã duyệt"
                  : "❌ Từ chối"}
              </span>

              {/* Nút duyệt / từ chối */}
              {req.status === "pending" && (
                <div className="flex space-x-2">
                  <button onClick={() => updateStatus(req.id, "approved")} className="bg-green-500 text-white px-4 py-2 rounded">
                    ✅ Duyệt
                  </button>
                  <button onClick={() => updateStatus(req.id, "rejected")} className="bg-red-500 text-white px-4 py-2 rounded">
                    ❌ Từ chối
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
