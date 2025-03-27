import { useState } from "react";

const Filter = () => {
  const [category, setCategory] = useState("");

  return (
    <div className="mb-4">
      <label className="text-gray-700">Lọc theo danh mục:</label>
      <select
        className="ml-2 p-2 border rounded-md"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Tất cả</option>
        <option value="Linh kiện điện tử">Linh kiện điện tử</option>
        <option value="Thiết bị y tế">Thiết bị y tế</option>
        <option value="Vật liệu xây dựng">Vật liệu xây dựng</option>
      </select>
    </div>
  );
};

export default Filter;
