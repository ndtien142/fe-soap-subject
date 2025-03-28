const activities = [
    { id: 1, user: "Nguyễn Văn A", action: "Nhập vật tư", time: "10 phút trước" },
    { id: 2, user: "Trần Thị B", action: "Xuất vật tư", time: "1 giờ trước" },
    { id: 3, user: "Lê Văn C", action: "Duyệt yêu cầu", time: "Hôm qua" },
  ];
  
  const UserActivityLog = () => {
    return (
      <ul className="divide-y divide-gray-300">
        {activities.map((activity) => (
          <li key={activity.id} className="p-3 hover:bg-gray-100">
            <strong>{activity.user}</strong> {activity.action} - <span className="text-gray-500">{activity.time}</span>
          </li>
        ))}
      </ul>
    );
  };
  
  export default UserActivityLog;
  