import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const BienBanPage = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [soBienBan, setSoBienBan] = useState("");
  const [nguoiNhan, setNguoiNhan] = useState("");
  const [nguoiGui, setNguoiGui] = useState(""); // Người gửi
  const [ngay, setNgay] = useState("");
  const [ghiChu, setGhiChu] = useState("");
  const [loaiBienBan, setLoaiBienBan] = useState(""); // Loại biên bản
  const [dsBienBan, setDsBienBan] = useState([]);
  const [avatar, setAvatar] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Thêm trạng thái lỗi
  const [errors, setErrors] = useState({
    soBienBan: "",
    nguoiNhan: "",
    nguoiGui: "",
    ngay: "",
    loaiBienBan: "",
  });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = { ...errors };

    // Kiểm tra Số biên bản
    if (!soBienBan) {
      newErrors.soBienBan = "Số biên bản là bắt buộc!";
      valid = false;
    } else {
      newErrors.soBienBan = "";
    }

    // Kiểm tra Người nhận
    if (!nguoiNhan) {
      newErrors.nguoiNhan = "Người nhận là bắt buộc!";
      valid = false;
    } else {
      newErrors.nguoiNhan = "";
    }

    // Kiểm tra Người gửi
    if (loaiBienBan === "Gửi" && !nguoiGui) {
      newErrors.nguoiGui = "Người gửi là bắt buộc đối với biên bản gửi!";
      valid = false;
    } else if (loaiBienBan === "Nhận" && nguoiGui) {
      newErrors.nguoiGui = "Không cần nhập người gửi đối với biên bản nhận!";
      valid = false;
    } else {
      newErrors.nguoiGui = "";
    }

    // Kiểm tra Ngày
    if (!ngay) {
      newErrors.ngay = "Ngày là bắt buộc!";
      valid = false;
    } else {
      newErrors.ngay = "";
    }

    // Kiểm tra Loại biên bản
    if (!loaiBienBan) {
      newErrors.loaiBienBan = "Bạn phải chọn loại biên bản!";
      valid = false;
    } else {
      newErrors.loaiBienBan = "";
    }

    setErrors(newErrors); // Cập nhật trạng thái lỗi
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra dữ liệu trước khi submit
    if (!validateForm()) {
      return; // Dừng lại nếu form không hợp lệ
    }

    const newRecord = {
      soBienBan,
      nguoiGui,
      nguoiNhan,
      ngay,
      ghiChu,
      loaiBienBan,
    };

    // Cập nhật danh sách biên bản
    setDsBienBan((prevState) => [...prevState, newRecord]);

    // Reset form
    setSoBienBan("");
    setNguoiNhan("");
    setNguoiGui(""); // Reset người gửi
    setNgay("");
    setGhiChu("");
    setLoaiBienBan(""); // Reset loại biên bản
  };

  // Dữ liệu mẫu cho bảng danh sách biên bản
  useEffect(() => {
    const sampleData = [
      {
        soBienBan: "BB001",
        nguoiGui: "Nguyễn Văn A",
        nguoiNhan: "Trần Thị B",
        ngay: "2025-04-01",
        ghiChu: "Thiết bị mới, chưa qua sử dụng",
        loaiBienBan: "Gửi",
      },
      {
        soBienBan: "BB002",
        nguoiGui: "Lê Minh C",
        nguoiNhan: "Nguyễn Thị D",
        ngay: "2025-04-02",
        ghiChu: "Đã kiểm tra, hoạt động tốt",
        loaiBienBan: "Nhận",
      },
    ];

    setDsBienBan(sampleData); // Thiết lập dữ liệu mẫu khi component được mount
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-red-800 text-white p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">PTIT</h1>
          <div className="relative">
            <button onClick={toggleDropdown} className="focus:outline-none">
              {avatar ? (
                <img
                  src={avatar}
                  alt="Admin Avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <svg
                  className="w-10 h-10 rounded-full bg-gray-200 p-1 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5.121 17.804A7.978 7.978 0 0112 14a7.978 7.978 0 016.879 3.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 2a10 10 0 100 20 10 10 0 000-20z"
                  />
                </svg>
              )}
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg z-10">
                <div className="py-2">
                  <label className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Đổi hình ảnh
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                  </label>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Đăng xuất
                  </button>
                </div>
              </div>
            )}
          </div>
        </header>

        <main className="p-6 flex-1">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Quản lý phiếu bàn giao</h1>

          {/* Form tạo phiếu bàn giao */}
          <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-lg mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-gray-700">Số biên bản</label>
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  value={soBienBan}
                  onChange={(e) => setSoBienBan(e.target.value)}
                  required
                />
                {errors.soBienBan && (
                  <span className="text-red-500 text-sm">{errors.soBienBan}</span>
                )}
              </div>
              <div>
                <label className="block font-medium text-gray-700">Người nhận</label>
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  value={nguoiNhan}
                  onChange={(e) => setNguoiNhan(e.target.value)}
                  required
                />
                {errors.nguoiNhan && (
                  <span className="text-red-500 text-sm">{errors.nguoiNhan}</span>
                )}
              </div>
              <div>
                <label className="block font-medium text-gray-700">Người gửi</label>
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  value={nguoiGui}
                  onChange={(e) => setNguoiGui(e.target.value)}
                  disabled={loaiBienBan === "Nhận"}
                  required={loaiBienBan === "Gửi"}
                />
                {errors.nguoiGui && (
                  <span className="text-red-500 text-sm">{errors.nguoiGui}</span>
                )}
              </div>
              <div>
                <label className="block font-medium text-gray-700">Ngày</label>
                <input
                  type="date"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={ngay}
                  onChange={(e) => setNgay(e.target.value)}
                  required
                />
                {errors.ngay && (
                  <span className="text-red-500 text-sm">{errors.ngay}</span>
                )}
              </div>
              <div className="md:col-span-2">
                <label className="block font-medium text-gray-700">Ghi chú</label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded"
                  value={ghiChu}
                  onChange={(e) => setGhiChu(e.target.value)}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block font-medium text-gray-700">Loại biên bản</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded"
                  value={loaiBienBan}
                  onChange={(e) => setLoaiBienBan(e.target.value)}
                  required
                >
                  <option value="">Chọn loại biên bản</option>
                  <option value="Gửi">Biên bản gửi</option>
                  <option value="Nhận">Biên bản nhận</option>
                </select>
                {errors.loaiBienBan && (
                  <span className="text-red-500 text-sm">{errors.loaiBienBan}</span>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Thêm biên bản
            </button>
          </form>

          {/* Danh sách biên bản */}
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Danh sách biên bản</h2>
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-3 py-2 text-left">Số biên bản</th>
                  <th className="border px-3 py-2 text-left">Người gửi</th>
                  <th className="border px-3 py-2 text-left">Người nhận</th>
                  <th className="border px-3 py-2 text-left">Ngày</th>
                  <th className="border px-3 py-2 text-left">Ghi chú</th>
                </tr>
              </thead>
              <tbody>
                {dsBienBan.map((item, index) => (
                  <tr key={index}>
                    <td className="border px-3 py-2">{item.soBienBan}</td>
                    <td className="border px-3 py-2">{item.nguoiGui}</td>
                    <td className="border px-3 py-2">{item.nguoiNhan}</td>
                    <td className="border px-3 py-2">{item.ngay}</td>
                    <td className="border px-3 py-2">{item.ghiChu}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BienBanPage;
