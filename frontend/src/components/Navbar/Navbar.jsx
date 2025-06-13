import React, { useState, useEffect } from "react";
import axios from "axios";
import Logo from "../../assets/Logo2.png";
import Register from "../Register/Register";

const navbarlinks = [
  { id: 1, title: "Inicio", link: "http://localhost:5173/#" },
  { id: 2, title: "Nuestros vehículos", link: "/categories" },
  { id: 3, title: "Quiénes somos", link: "#" },
];

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [usuario, setUsuario] = useState(null); // Usuario autenticado

  // Leer usuario del localStorage al cargar
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

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        { correo, contraseña }
      );

      alert(response.data.mensaje);
      setUsuario(response.data.usuario);
      localStorage.setItem("usuario", JSON.stringify(response.data.usuario));
      closeForms();
    } catch (error) {
      alert(error.response?.data?.error || "Error al iniciar sesión");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    setUsuario(null);
  };

  return (
    <>
      <nav className="fixed top-0 left-1 bg-red-0 w-full bg-opacity-30 backdrop-blur-md z-90">
        <div className="flex justify-between items-center sm:px-12 sm:py-4 px-4 py-3">
          <div>
            <img src={Logo} alt="Logo del sitio" className="w-[100px]" />
          </div>

          <div>
            <ul className="flex sm:space-x-28 space-x-4">
              {navbarlinks.map((link) => (
                <li key={link.id}>
                  <a
                    className="sm:text-lg text-sm hover:text-red-600 transition-transform hover:scale-110 transform inline-block duration-300"
                    href={link.link}
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
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
                    {usuario.nombre}{" "}
                    {/* Asegúrate que 'nombre' existe en el JSON */}
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
              <form onSubmit={handleLogin} className="space-y-4">
                <h2 className="text-xl font-semibold mb-4 text-center">
                  Iniciar Sesión
                </h2>
                <input
                  type="email"
                  name="correo"
                  placeholder="Correo"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
                <input
                  type="password"
                  name="contraseña"
                  placeholder="Contraseña"
                  value={contraseña}
                  onChange={(e) => setContraseña(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
                >
                  Iniciar sesión
                </button>
                <p className="text-sm text-center">
                  ¿No tienes una cuenta?{" "}
                  <span
                    onClick={openRegister}
                    className="text-red-600 cursor-pointer hover:underline"
                  >
                    Regístrate
                  </span>
                </p>
              </form>
            )}

            {showRegister && <Register onSwitchToLogin={openLogin} />}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
