import { useState, useEffect } from "react";

const Filter = ({ onFilterChange, categories }) => {
  const [category, setCategory] = useState("");

  // Gọi onFilterChange mỗi khi category thay đổi
  useEffect(() => {
    onFilterChange({ name: "category", value: category });
  }, [category, onFilterChange]);

  return (
    <div className="mb-4">
      <label className="text-gray-700">Lọc theo danh mục:</label>
      <select
        className="ml-2 p-2 border rounded-md"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Tất cả</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;