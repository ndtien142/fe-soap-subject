import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/auth/Login";
import Home from "./pages/Home";
import AssetList from "./pages/AssetList";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Kiểm tra trạng thái đăng nhập từ localStorage khi ứng dụng khởi động
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true); // Nếu có token, coi như đã đăng nhập
    } else {
      setIsAuthenticated(false); // Nếu không có token, chưa đăng nhập
    }
  }, []);

  // Component bảo vệ route
  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/" />;
  };

  return (
    <Router>
      <Routes>
        {/* Route cho trang đăng nhập */}
        <Route
          path="/"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />

        {/* Route cho trang Home (bảo vệ) */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home setIsAuthenticated={setIsAuthenticated} />
            </ProtectedRoute>
          }
        />

        {/* Route cho trang AssetList (bảo vệ) */}
        <Route
          path="/asset-list"
          element={
            <ProtectedRoute>
              <AssetList setIsAuthenticated={setIsAuthenticated} />
            </ProtectedRoute>
          }
        />

        {/* Redirect các route không tồn tại về trang đăng nhập */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;