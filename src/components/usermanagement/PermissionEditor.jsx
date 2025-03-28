import { useState } from "react";

const PermissionEditor = () => {
  const [role, setRole] = useState("Nhân viên kho");

  return (
    <div>
      <p className="mb-2">Chọn vai trò để thay đổi quyền:</p>
      <select
        className="w-full p-2 border rounded-md"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option>Quản trị viên</option>
        <option>Nhân viên kho</option>
        <option>Khoa phòng</option>
      </select>
      <button className="mt-3 bg-blue-500 text-white p-2 rounded-md w-full">
        Cập nhật quyền
      </button>
    </div>
  );
};

export default PermissionEditor;