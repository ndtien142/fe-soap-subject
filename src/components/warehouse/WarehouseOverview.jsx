const WarehouseOverview = () => {
  // Dữ liệu demo
  const categories = [
    { name: "Linh kiện điện tử", quantity: 120 },
    { name: "Thiết bị", quantity: 85 },
    { name: "Vật liệu xây dựng", quantity: 150 },
  ];

  return (
    <div>
      {categories.map((item, index) => (
        <div key={index} className="flex justify-between p-2 border-b">
          <span className="text-gray-600">{item.name}</span>
          <span className="font-semibold">{item.quantity}</span>
        </div>
      ))}
    </div>
  );
};

export default WarehouseOverview;
