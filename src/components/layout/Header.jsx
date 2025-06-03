import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [avatar, setAvatar] = useState(() => {
    return localStorage.getItem("avatar") || null;
  });

  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen((prev) => !prev);
  }, []);

  const handleAvatarChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result);
        localStorage.setItem("avatar", reader.result);
      };
      reader.readAsDataURL(file);
    }
    setIsDropdownOpen(false);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("role"); 
    localStorage.removeItem("avatar"); 
    setIsAuthenticated(false);
    navigate("/");
  }, [setIsAuthenticated, navigate]);

  return (
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
  );
};

export default Header;