// src/layouts/AdminLayout.jsx
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      {/* Aquí puedes poner tu propio sidebar o topbar de admin */}
      <Outlet />
    </div>
  );
};

export default AdminLayout;
