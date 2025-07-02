import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const CompraVehiculo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const vehiculo = location.state?.vehiculo;

  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  if (!vehiculo) {
    return (
      <div className="mt-28 text-center text-red-600 font-bold">
        No se encontró información del vehículo. Intenta nuevamente desde el
        catálogo.
      </div>
    );
  }

  const handlePagar = async () => {
    if (!usuario) {
      alert("Debes iniciar sesión para realizar la compra.");
      navigate("/login");
      return;
    }

    const idVehiculo = vehiculo.vehiculo_id || vehiculo.id; // Asegura compatibilidad
    const userId = usuario.usuario_id || usuario.id;

    if (!idVehiculo || !userId) {
      console.error("❌ ID de usuario o vehículo no definido.");
      return;
    }

    try {
      const payload = {
        nombre: vehiculo.nombre,
        descripcion: vehiculo.descripcion || "Compra desde Automundo",
        precio: vehiculo.precio,
        cantidad: 1,
        idVehiculo: vehiculo.vehiculo_id,
        userId: usuario.usuario_id,  
      };

      console.log("📤 Enviando datos al backend:", payload);

      const response = await axios.post(
        "http://localhost:3000/api/pago/crear-preferencia",
        payload
      );

      const { id } = response.data;
      console.log("✅ Preferencia creada con ID:", id);

      // Redirige al checkout de Mercado Pago
      window.location.href = `https://www.mercadopago.com.pe/checkout/v1/redirect?pref_id=${id}`;
    } catch (error) {
      console.error(
        "❌ Error al crear preferencia:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-28 p-8 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Resumen de Compra
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <img
          src={`http://localhost:3000/imagenes/${vehiculo.imagen}`}
          alt={vehiculo.nombre}
          className="w-full h-64 object-contain rounded"
        />
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-800">
            {vehiculo.nombre}
          </h2>
          <p className="text-red-600 font-bold text-lg">
            S/. {vehiculo.precio}
          </p>
          <p className="text-sm text-gray-600">{vehiculo.descripcion}</p>
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={handlePagar}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded text-lg font-semibold transition"
        >
          Pagar con Mercado Pago
        </button>
      </div>
    </div>
  );
};

export default CompraVehiculo;
