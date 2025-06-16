import React, { useState, useEffect } from "react";
import Logo from "../../assets/Logo2.png";
import Register from "../Register/Register";
import Login from "../auth/Login";

const navbarlinks = [
  { id: 1, title: "Inicio", link: "http://localhost:5173/#" },
  { id: 2, title: "Nuestros vehículos", link: "/categories" },
  { id: 3, title: "Quiénes somos", link: "#" },
];

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    if (storedUser) {
      setUsuario(JSON.parse(storedUser));
    }
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
          <ul className="flex space-x-4">
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
              <>
                <li className="flex items-center gap-2 text-sm sm:text-base text-black">
                  <i className="bi bi-person-check sm:text-2xl text-lg"></i>
                  {usuario.nombre}
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-sm sm:text-base text-red-600 hover:underline"
                  >
                    Cerrar sesión
                  </button>
                </li>
              </>
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
