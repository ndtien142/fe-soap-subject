import { motion } from "framer-motion";

const AlertItem = ({ type, message }) => {
  // Chọn icon và màu sắc dựa trên loại cảnh báo
  const alertTypes = {
    expired: { icon: "⏳", bgColor: "bg-red-100", textColor: "text-red-700", border: "border-red-400" },
    lowStock: { icon: "⚠️", bgColor: "bg-yellow-100", textColor: "text-yellow-700", border: "border-yellow-400" },
    pendingApproval: { icon: "🔄", bgColor: "bg-blue-100", textColor: "text-blue-700", border: "border-blue-400" },
    maintenance: { icon: "🔧", bgColor: "bg-green-100", textColor: "text-green-700", border: "border-green-400" },
    liquidation: { icon: "🗑", bgColor: "bg-gray-100", textColor: "text-gray-700", border: "border-gray-400" },
  };

  const { icon, bgColor, textColor, border } = alertTypes[type] || alertTypes.lowStock; // Mặc định nếu không có loại phù hợp

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`p-3 rounded-lg shadow-md flex items-center border-l-4 ${bgColor} ${textColor} ${border} hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer`}
    >
      <span className="text-xl mr-3">{icon}</span>
      <span className="font-medium">{message}</span>
    </motion.div>
  );
};

export default AlertItem;

  