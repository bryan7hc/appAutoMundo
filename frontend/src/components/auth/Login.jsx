// src/components/auth/Login.jsx
import React, { useState } from "react";
import axios from "axios";

const Login = ({ onLoginSuccess, onSwitchToRegister, onClose }) => {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        { correo, contraseña }
      );

      alert(response.data.mensaje);
      localStorage.setItem("usuario", JSON.stringify(response.data.usuario));
      onLoginSuccess(response.data.usuario); // notifica al padre
      onClose(); // cierra el modal
    } catch (error) {
      alert(error.response?.data?.error || "Error al iniciar sesión");
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <h2 className="text-xl font-semibold mb-4 text-center">Iniciar Sesión</h2>
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
          onClick={onSwitchToRegister}
          className="text-red-600 cursor-pointer hover:underline"
        >
          Regístrate
        </span>
      </p>
    </form>
  );
};

export default Login;
