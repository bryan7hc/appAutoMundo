import React from "react";

const Login = ({ onSwitchToRegister }) => {
  return (
    <div className="max-w-sm mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Iniciar Sesión
      </h2>
      <form>
        <label className="block mb-2 font-medium" htmlFor="email">
          Correo electrónico
        </label>
        <input
          type="email"
          id="email"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          placeholder="correo@ejemplo.com"
          required
        />

        <label className="block mb-2 font-medium" htmlFor="password">
          Contraseña
        </label>
        <input
          type="password"
          id="password"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          placeholder="********"
          required
        />

        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
        >
          Ingresar
        </button>
      </form>

      <p className="mt-4 text-center text-sm">
        ¿No tienes una cuenta?{" "}
        <button
          className="text-red-600 hover:underline"
          onClick={onSwitchToRegister}
        >
          Crear cuenta
        </button>
      </p>
    </div>
  );
};

export default Login;
