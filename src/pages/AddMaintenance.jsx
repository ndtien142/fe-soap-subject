// src/pages/AddMaintenance.jsx
import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import FormInput from "../components/common/FormInput";

const AddMaintenance = ({ setIsAuthenticated }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [newMaintenance, setNewMaintenance] = useState({
    id: "",
    assetId: "",
    assetName: "",
    repairDate: "",
    cost: "",
    description: "",
    status: "Chờ xử lý",
  });
  const navigate = useNavigate();

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !newMaintenance.id ||
      !newMaintenance.assetId ||
      !newMaintenance.assetName ||
      !newMaintenance.repairDate ||
      !newMaintenance.cost ||
      !newMaintenance.description
    ) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    const updatedMaintenanceData = {
      ...newMaintenance,
      cost: parseFloat(newMaintenance.cost),
    };

    // Chuyển dữ liệu mới về Maintenance.jsx qua navigation state
    navigate("/maintenance", { state: { newMaintenance: updatedMaintenanceData } });
  };

  const fields = [
    { name: "id", label: "Mã sửa chữa", type: "text", required: true },
    { name: "assetId", label: "Mã tài sản", type: "text", required: true },
    { name: "assetName", label: "Tên tài sản", type: "text", required: true },
    { name: "repairDate", label: "Ngày sửa chữa", type: "date", required: true },
    { name: "cost", label: "Chi phí (VNĐ)", type: "number", required: true },
    {
      name: "status",
      label: "Trạng thái",
      type: "select",
      required: true,
      options: [
        { value: "Chờ xử lý", label: "Chờ xử lý" },
        { value: "Đang xử lý", label: "Đang xử lý" },
        { value: "Đã hoàn thành", label: "Đã hoàn thành" },
      ],
    },
    { name: "description", label: "Mô tả công việc", type: "textarea", required: true },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col">
        <Header setIsAuthenticated={setIsAuthenticated} />
        <main className="p-6 flex-1">
          <h2 className="text-2xl font-semibold mb-6">Thêm sửa chữa mới</h2>
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
            <div className="grid grid-cols-2 gap-4">
              {fields.map((field) => (
                <div key={field.name} className={field.type === "textarea" ? "col-span-2" : ""}>
                  <FormInput
                    label={field.label}
                    type={field.type}
                    name={field.name}
                    value={newMaintenance[field.name]}
                    onChange={(e) =>
                      setNewMaintenance({ ...newMaintenance, [field.name]: e.target.value })
                    }
                    required={field.required}
                    options={field.options}
                  />
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => navigate("/maintenance")}
                className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Thêm
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default AddMaintenance;