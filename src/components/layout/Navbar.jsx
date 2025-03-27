import React, { useState } from "react";
import { FaSearch, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Modal from "../common/Modal";
import Login from "../auth/Login";
import Register from "../auth/Register";

const Navbar = () => {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const openSignUp = () => {
    setIsLogin(false);
    setIsModelOpen(true);
  };
  const openLogin = () => {
    setIsLogin(true);
    setIsModelOpen(true);
  };
  const [isActive, setIsActive] = useState(false);

  return (
    <nav className="bg-red-700 text-white shadow-md">
      <div className="container mx-auto px-4 md:px-16 lg:px-24 py-4 flex justify-between items-center">
        <div className="text-lg font-bold">
          <NavLink to="/" className="hover:text-gray-300">
            Logo
          </NavLink>
        </div>

        <div className="hidden md:flex items-center space-x-10 text-sm ml-[4.5rem] mr-[13.5rem]">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `relative px-3 py-2 rounded-md transition-all duration-300
     ${
       isActive
         ? "text-white font-semibold after:absolute after:left-0 after:bottom-0 after:w-full after:h-[3px] after:bg-yellow-400 after:scale-x-100"
         : "text-gray-200 hover:text-white hover:scale-105 after:scale-x-0 after:transition-transform after:duration-300"
     }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/danh-sach-vat-tu"
            className={({ isActive }) =>
              `relative px-3 py-2 rounded-md transition-all duration-300
     ${
       isActive
         ? "text-white font-semibold after:absolute after:left-0 after:bottom-0 after:w-full after:h-[3px] after:bg-yellow-400 after:scale-x-100"
         : "text-gray-200 hover:text-white hover:scale-105 after:scale-x-0 after:transition-transform after:duration-300"
     }`
            }
          >
            Danh sách vật tư
          </NavLink>
          <NavLink
            to="/yeu-cau"
            className={({ isActive }) =>
              `relative px-3 py-2 rounded-md transition-all duration-300
     ${
       isActive
         ? "text-white font-semibold after:absolute after:left-0 after:bottom-0 after:w-full after:h-[3px] after:bg-yellow-400 after:scale-x-100"
         : "text-gray-200 hover:text-white hover:scale-105 after:scale-x-0 after:transition-transform after:duration-300"
     }`
            }
          >
            Yêu cầu
          </NavLink>
          <NavLink
            to="/bao-cao"
            className={({ isActive }) =>
              `relative px-3 py-2 rounded-md transition-all duration-300
     ${
       isActive
         ? "text-white font-semibold after:absolute after:left-0 after:bottom-0 after:w-full after:h-[3px] after:bg-yellow-400 after:scale-x-100"
         : "text-gray-200 hover:text-white hover:scale-105 after:scale-x-0 after:transition-transform after:duration-300"
     }`
            }
          >
            Báo cáo
          </NavLink>
        </div>

        <div className="relative flex-1 mx-4">
          <form className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full border py-2 px-4 rounded-lg"
            />
            <FaSearch className="absolute top-3 right-3 text-red-500" />
          </form>
        </div>

        <div className="flex items-center space-x-4">
          <button
            className="hidden md:block"
            onClick={() => setIsModelOpen(true)}
          >
            Login
          </button>
          <button className="block md:hidden">
            <FaUser />
          </button>
        </div>

        <div className="md:hidden mx-4">
          {!isActive ? (
            <FaBars className="text-xl" onClick={() => setIsActive(true)} />
          ) : (
            <FaTimes className="text-xl" onClick={() => setIsActive(false)} />
          )}
        </div>
      </div>

      {isActive && (
        <div className="md:hidden flex flex-col space-y-4 mt-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md transition ${
                isActive
                  ? "bg-white text-red-600 font-semibold"
                  : "hover:bg-white hover:text-red-600"
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/danh-sach-vat-tu"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md transition ${
                isActive
                  ? "bg-white text-red-600 font-semibold"
                  : "hover:bg-white hover:text-red-600"
              }`
            }
          >
            Danh sách vật tư
          </NavLink>
          <NavLink
            to="/yeu-cau"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md transition ${
                isActive
                  ? "bg-white text-red-600 font-semibold"
                  : "hover:bg-white hover:text-red-600"
              }`
            }
          >
            Yêu cầu
          </NavLink>
          <NavLink
            to="/bao-cao"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md transition ${
                isActive
                  ? "bg-white text-red-600 font-semibold"
                  : "hover:bg-white hover:text-red-600"
              }`
            }
          >
            Báo cáo
          </NavLink>
        </div>
      )}

      <Modal isModelOpen={isModelOpen} setIsModelOpen={setIsModelOpen}>
        {isLogin ? (
          <Login openSignUp={openSignUp} />
        ) : (
          <Register openLogin={openLogin} />
        )}
      </Modal>
    </nav>
  );
};

export default Navbar;
