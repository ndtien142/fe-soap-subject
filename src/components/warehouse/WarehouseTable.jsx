const WarehouseTable = () => {
  // Dữ liệu demo
  const items = [
    { id: 1, name: "Máy tính", category: "Linh kiện điện tử", stock: 50 },
    { id: 2, name: "Bàn", category: "Thiết bị", stock: 30 },
    { id: 3, name: "Ghế", category: "Thiết bị", stock: 100 },
  ];

  return (
    <table className="w-full border-collapse border border-gray-300 mt-4">
      <thead>
        <tr className="bg-gray-200">
          <th className="border border-gray-300 px-4 py-2">Tên vật tư</th>
          <th className="border border-gray-300 px-4 py-2">Danh mục</th>
          <th className="border border-gray-300 px-4 py-2">Tồn kho</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id} className="hover:bg-gray-100">
            <td className="border border-gray-300 px-4 py-2">{item.name}</td>
            <td className="border border-gray-300 px-4 py-2">
              {item.category}
            </td>
            <td className="border border-gray-300 px-4 py-2">{item.stock}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WarehouseTable;
