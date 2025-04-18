import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/auth/Login";
import Home from "./pages/Home";
import AssetList from "./pages/AssetList";
import SupplierList from "./pages/SupplierList";
import InventoryReceipt from "./pages/InventoryReceipt"; // Thêm import
import InventoryIssue from "./pages/InventoryIssue"; // Thêm import
import ApprovalRequestList from "./pages/ApprovalRequestList";
import InventoryStock from "./pages/InventoryStock";
import InventoryHistory from "./pages/InventoryHistory";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSetIsAuthenticated = useCallback((value) => {
    setIsAuthenticated(value);
    if (value) {
      localStorage.setItem("token", "your-token-here");
    } else {
      localStorage.removeItem("token");
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/" />;
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Login setIsAuthenticated={handleSetIsAuthenticated} />}
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home setIsAuthenticated={handleSetIsAuthenticated} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/asset-list"
          element={
            <ProtectedRoute>
              <AssetList setIsAuthenticated={handleSetIsAuthenticated} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/supplier-list"
          element={
            <ProtectedRoute>
              <SupplierList setIsAuthenticated={handleSetIsAuthenticated} />
            </ProtectedRoute>
          }
        />
        {/* Route cho Phiếu nhập */}
        <Route
          path="/inventory-receipt"
          element={
            <ProtectedRoute>
              <InventoryReceipt setIsAuthenticated={handleSetIsAuthenticated} />
            </ProtectedRoute>
          }
        />
        {/* Route cho Phiếu xuất */}
        <Route
          path="/inventory-issue"
          element={
            <ProtectedRoute>
              <InventoryIssue setIsAuthenticated={handleSetIsAuthenticated} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/approval-request-list"
          element={
            <ProtectedRoute>
            <ApprovalRequestList setIsAuthenticated={handleSetIsAuthenticated} />
          </ProtectedRoute>
          }
        />
        <Route
          path="/inventory-stock"
          element={
            <ProtectedRoute>
            <InventoryStock setIsAuthenticated={handleSetIsAuthenticated} />
          </ProtectedRoute>
          }
        />
        <Route
          path="/inventory-history"
          element={
            <ProtectedRoute>
            <InventoryHistory setIsAuthenticated={handleSetIsAuthenticated} />
          </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;