import AlertItem from "./AlertItem";

const AlertsList = () => {
  // Danh sách cảnh báo mẫu
  const alerts = [
    { type: "expired", message: "📦 Vật tư XYZ sắp hết hạn sử dụng!" },
    { type: "lowStock", message: "📉 Mực in giảm còn 5 hộp - Cần nhập thêm!" },
    { type: "pendingApproval", message: "⏳ Yêu cầu cấp phát đang chờ duyệt quá lâu!" },
    { type: "maintenance", message: "🔧 Máy in phòng 304 cần bảo trì!" },
    { type: "liquidation", message: "🗑 Một số vật tư cần thanh lý!" },
  ];

  return (
    <div className="bg-white p-4 shadow-lg rounded-lg  overflow-y-auto">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">
        🔔 Cảnh báo quan trọng
      </h2>
      <div className="space-y-3">
        {alerts.length > 0 ? (
          alerts.map((alert, index) => (
            <AlertItem key={index} type={alert.type} message={alert.message} />
          ))
        ) : (
          <p className="text-gray-500 text-sm text-center">Không có cảnh báo nào.</p>
        )}
      </div>
    </div>
  );
};

export default AlertsList;

