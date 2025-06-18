import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo2.png";
import Register from "../Register/Register";
import Login from "../auth/Login";

const navbarlinks = [
  { id: 1, title: "Inicio", link: "http://localhost:5173/#" },
  { id: 2, title: "Nuestros vehículos", link: "/categories" },
  { id: 3, title: "Quiénes somos", link: "/quienes-somos" },
];

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    if (storedUser) {
      setUsuario(JSON.parse(storedUser));
    }
  }, []);

  // Cerrar dropdown si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const openLogin = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  const openRegister = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  const closeForms = () => {
    setShowLogin(false);
    setShowRegister(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    setUsuario(null);
    navigate("/");
  };

  return (
    <>
      <nav className="fixed top-0 left-1 w-full bg-opacity-30 backdrop-blur-md z-90">
        <div className="flex justify-between items-center sm:px-12 sm:py-4 px-4 py-3">
          <img src={Logo} alt="Logo del sitio" className="w-[100px]" />
          <ul className="flex sm:space-x-28 space-x-4">
            {navbarlinks.map((link) => (
              <li key={link.id}>
                <a
                  className="sm:text-lg text-sm hover:text-red-600 transition-transform hover:scale-110 transform duration-300"
                  href={link.link}
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
          <ul className="flex space-x-4 relative">
            {!usuario ? (
              <li>
                <button
                  onClick={openLogin}
                  className="flex items-center gap-2 text-sm sm:text-base text-black hover:text-red-600 transition-all duration-300"
                >
                  <i className="bi bi-person-circle sm:text-2xl text-lg"></i>
                  Iniciar sesión
                </button>
              </li>
            ) : (
              <li className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 text-sm sm:text-base text-black hover:text-red-600"
                >
                  <i className="bi bi-person-check sm:text-2xl text-lg"></i>
                  {usuario.nombre}
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
                    <Link
                      to="/perfil"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Perfil
                    </Link>
                    <Link
                      to="/historial"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Historial de Pedidos
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </li>
            )}
          </ul>
        </div>
      </nav>

      {(showLogin || showRegister) && (
        <div
          className="fixed inset-0 bg-transparent backdrop-blur-md flex items-center justify-center z-60"
          onClick={closeForms}
        >
          <div
            className="bg-white rounded p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {showLogin && (
              <Login
                onLoginSuccess={(user) => setUsuario(user)}
                onSwitchToRegister={openRegister}
                onClose={closeForms}
              />
            )}
            {showRegister && <Register onSwitchToLogin={openLogin} />}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
