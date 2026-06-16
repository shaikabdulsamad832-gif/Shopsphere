import { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import UserNavbar from "./components/UserNavbar";
import AdminNavbar from "./components/AdminNavbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Wishlist from "./pages/Wishlist";
import Profile from "./pages/Profile";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AdminOrders from "./pages/AdminOrders";

import "./App.css";

function Layout({ darkMode, setDarkMode }) {
  const location = useLocation();

  const isAdminPage =
    location.pathname.startsWith("/admin") &&
    location.pathname !== "/admin-login";

  const isAdminLogin = location.pathname === "/admin-login";

  return (
    <div className={darkMode ? "app dark" : "app"}>
      {!isAdminLogin &&
        (isAdminPage ? (
          <AdminNavbar darkMode={darkMode} setDarkMode={setDarkMode} />
        ) : (
          <UserNavbar darkMode={darkMode} setDarkMode={setDarkMode} />
        ))}

      <Routes>
        {/* PUBLIC USER ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* PROTECTED USER ROUTES */}
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

        {/* HIDDEN ADMIN LOGIN */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* PROTECTED ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <AdminProducts />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <AdminOrders />
            </AdminRoute>
          }
        />
      </Routes>

      {!isAdminLogin && <Footer />}
    </div>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <BrowserRouter>
      <Layout darkMode={darkMode} setDarkMode={setDarkMode} />
    </BrowserRouter>
  );
}

export default App;