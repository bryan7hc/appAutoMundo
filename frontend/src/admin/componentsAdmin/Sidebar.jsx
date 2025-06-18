import React from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaCar, FaChartBar, FaSignOutAlt } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-60 bg-red-600 text-white flex flex-col justify-between p-4 fixed h-full">
      <div>
        <div className="text-center font-bold text-2xl mb-6">AutoMundo</div>
        <SidebarButton
          icon={<FaUsers />}
          label="Usuarios"
          to="/admin/usuarios"
        />
        <SidebarButton
          icon={<FaCar />}
          label="Vehículos"
          to="/admin/vehiculos"
        />
        <SidebarButton
          icon={<FaChartBar />}
          label="Reportes"
          to="/admin/reportes"
        />
      </div>
      <button className="flex items-center gap-2 px-4 py-2 mt-8 bg-red-700 hover:bg-red-800 rounded text-sm">
        <FaSignOutAlt />
        Cerrar Sesión
      </button>
    </div>
  );
};

const SidebarButton = ({ icon, label, to }) => (
  <Link
    to={to}
    className="flex items-center space-x-3 px-4 py-2 mb-2 bg-red-500 hover:bg-red-700 rounded w-full text-left"
  >
    <span className="text-lg">{icon}</span>
    <span>{label}</span>
  </Link>
);

export default Sidebar;
