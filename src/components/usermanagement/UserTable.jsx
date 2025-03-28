const users = [
    { id: 1, name: "Nguyễn Văn A", role: "Quản trị viên", email: "admin@example.com" },
    { id: 2, name: "Trần Thị B", role: "Nhân viên kho", email: "staff@example.com" },
    { id: 3, name: "Lê Văn C", role: "Khoa phòng", email: "department@example.com" },
  ];
  
  const UserTable = () => {
    return (
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">👤 Tên</th>
            <th className="border p-2">📧 Email</th>
            <th className="border p-2">🔖 Vai trò</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-100">
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default UserTable;
  