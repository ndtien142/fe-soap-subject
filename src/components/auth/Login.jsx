import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import building from "../../assets/building.jpg";
import backgroundImage from "../../assets/background.jpg";
import axiosInstance from "../../common/util/axios";
import { AUTH_LOGIN } from "../../common/constant/apiskey";
import { ROUTER_HOME } from "../../common/constant/router.constant";

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axiosInstance.post(AUTH_LOGIN, {
        username,
        password,
      });

      const { token, role } = response.data.metadata;

      // Lưu token và role vào localStorage
      localStorage.setItem("token", token);

      setIsAuthenticated(true);
      navigate(ROUTER_HOME);
    } catch (err) {
      setError("Tên đăng nhập hoặc mật khẩu không đúng!");
      console.error("Login error:", err);
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="bg-white bg-opacity-90 shadow-2xl rounded-2xl flex flex-col md:flex-row overflow-hidden w-full max-w-[1100px]">
        <div className="w-full md:w-1/2 hidden md:block">
          <img
            src={building}
            alt="Building"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center px-14 py-16">
          <div className="flex flex-col items-center">
            <img src={logo} alt="Logo" className="w-16 mb-4" />
            <h2 className="text-xl font-bold text-center text-red-700 mb-4">
              PHẦN MỀM QUẢN LÝ TÀI SẢN HỖ TRỢ PHÒNG QUẢN TRỊ TRƯỜNG PTIT
            </h2>
          </div>

          {error && (
            <p className="text-red-600 text-sm text-center mb-4">{error}</p>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium text-lg">
                Tên đăng nhập
              </label>
              <input
                type="text"
                className="w-full px-5 py-3 border rounded-lg shadow-md text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Nhập tên đăng nhập"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium text-lg">
                Mật khẩu
              </label>
              <input
                type="password"
                className="w-full px-5 py-3 border rounded-lg shadow-md text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-4 flex items-center justify-between">
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2 text-gray-700">Nhớ mật khẩu</span>
              </label>
              <a href="#" className="text-red-600 hover:underline">
                Quên mật khẩu?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-red-700 text-white py-3 text-lg rounded-lg shadow-lg hover:bg-red-800 transition-transform transform hover:scale-105"
            >
              Đăng nhập
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
