import React from "react";
import { useLocation } from "react-router-dom";

const Compra = () => {
  const location = useLocation();
  const vehiculo = location.state?.vehiculo;

  if (!vehiculo) {
    return (
      <div className="text-center mt-20 text-red-500 text-xl">
        No se han recibido datos del vehículo.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-30 p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Confirmar Compra
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Imagen del vehículo */}
        <img
  src={`http://localhost:3000/imagenes/${vehiculo.imagen}`}
  alt={vehiculo.nombre}
  className="h-52 w-auto mb-2 object-contain"
/>


        {/* Información del vehículo */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">{vehiculo.nombre}</h2>
          <p className="text-gray-600 mb-1">
            <strong>Marca:</strong> {vehiculo.marca}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Categoría:</strong> {vehiculo.categoria}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Stock disponible:</strong> {vehiculo.stock}
          </p>
          <p className="text-gray-600 mb-4">
            <strong>Descripción:</strong> {vehiculo.descripcion}
          </p>

          <div className="border-t pt-4 mt-4">
            <p className="text-xl font-bold text-green-600">
              Precio: ${vehiculo.precio}
            </p>
            <button
              className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
              onClick={() => alert("Compra simulada. Integración pendiente.")}
            >
              Confirmar pago
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compra;
