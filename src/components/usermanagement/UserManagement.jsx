import UserTable from "./UserTable";
import PermissionEditor from "./PermissionEditor";
import UserActivityLog from "./UserActivityLog";

const UserManagement = () => {
    return (
      <div className="p-6 bg-gray-100">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">👥 Quản lý người dùng</h1>
  
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
         
          <div className="md:col-span-2 bg-white p-4 shadow-lg rounded-lg">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">📋 Danh sách tài khoản</h2>
            <UserTable />
          </div>
  
         
          <div className="md:col-span-1 bg-white p-4 shadow-lg rounded-lg">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">🔐 Phân quyền</h2>
            <PermissionEditor />
          </div>
  
        
          <div className="md:col-span-3 bg-white p-4 shadow-lg rounded-lg max-h-[400px] overflow-y-auto">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">📜 Lịch sử hoạt động</h2>
            <UserActivityLog />
          </div>
        </div>
      </div>
    );
};
  
export default UserManagement;
  

