import axios from "axios";
import React, { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    contraseña: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (
      !formData.nombre ||
      !formData.correo ||
      !formData.telefono ||
      !formData.contraseña
    ) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/usuarios/registro",
        formData
      );
      setSuccess(response.data.message || "Usuario registrado correctamente");
      setFormData({ nombre: "", correo: "", telefono: "", contraseña: "" });
    } catch (error) {
      console.error("Error al registrar:", error);
      setError(
        error.response?.data?.error || "Hubo un error al registrar el usuario"
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold text-center text-red-600 mb-4">
          Registro
        </h2>

        <div className="flex flex-col gap-3">
          <input
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Nombre"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            name="correo"
            type="email"
            value={formData.correo}
            onChange={handleChange}
            placeholder="Correo"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            placeholder="Teléfono"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            name="contraseña"
            type="password"
            value={formData.contraseña}
            onChange={handleChange}
            placeholder="Contraseña"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <button
          type="submit"
          className="bg-red-600 text-white font-semibold w-full py-2 mt-4 rounded-md hover:bg-red-700 transition"
        >
          Registrar
        </button>

        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        {success && <p className="text-green-600 text-sm mt-2">{success}</p>}
      </form>
    </div>
  );
};

export default Register;
