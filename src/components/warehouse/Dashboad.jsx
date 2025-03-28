import WarehouseOverview from "./WarehouseOverview";
import WarehouseTable from "./WarehouseTable";
import Filter from "./Filter";
import RequestManagement from "../requests/RequestManagement";
import AlertsList from "../alerts/AlertList";
import UserManagement from "../usermanagement/UserManagement";

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Tiêu đề */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Quản lý kho hàng
      </h1>

      {/* Bố cục Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Tổng quan kho hàng */}
        <div className="md:col-span-1 bg-white p-4 shadow-lg rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Tổng quan kho hàng
          </h2>
          <WarehouseOverview />
        </div>

        {/* Danh sách vật tư + Bộ lọc */}
        <div className="md:col-span-2 bg-white p-4 shadow-lg rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Danh sách vật tư
          </h2>
          <Filter />
          <WarehouseTable />
        </div>

        {/* Yêu cầu cấp phát */}
        <div className="md:col-span-2 bg-white p-4 shadow-lg rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Quản lý yêu cầu cấp phát
          </h2>
          <RequestManagement />
        </div>

        {/* Cảnh báo */}
        <div className="md:col-span-1 bg-white p-4 shadow-lg rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Cảnh báo
          </h2>
          <AlertsList />
        </div>

        {/* Quản lý người dùng */}
        <div className="md:col-span-3 bg-white p-4 shadow-lg rounded-lg overflow-y-auto">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Quản lý người dùng
          </h2>
          <UserManagement />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;

