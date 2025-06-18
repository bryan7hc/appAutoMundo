// src/components/DetailVehicle/DetailVehicle.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DetailVehicle = () => {
  const { id } = useParams(); // id de la URL
  const [vehiculo, setVehiculo] = useState(null);

  const navigate = useNavigate();

  const handleCompra = () => {
    navigate("/compra", { state: { vehiculo } });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/vehiculos/${id}`)
      .then((res) => {
        console.log("Datos del vehículo:", res.data); // 🔍 Verifica qué llega
        setVehiculo(res.data);
      })
      .catch((err) => {
        console.error("Error al cargar datos del vehículo:", err);
      });
  }, [id]);

  if (!vehiculo)
    return <p className="text-center mt-8">Cargando vehículo...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-30 p-6 bg-white shadow-md rounded">
      <img
        src={`http://localhost:3000/imagenes/${vehiculo.imagen}`}
        alt={vehiculo.nombre}
        className="h-52 w-auto mb-2 object-contain"
      />

      <h1 className="text-3xl font-bold mb-2">{vehiculo.nombre}</h1>
      <p className="text-lg text-gray-700 mb-2">Marca: {vehiculo.marca}</p>
      <p className="text-lg text-gray-700 mb-2">Precio: ${vehiculo.precio}</p>
      <p className="text-lg text-gray-700 mb-2">Stock: {vehiculo.stock}</p>
      <p className="text-base text-gray-600 mb-4">{vehiculo.descripcion}</p>
      <button
        className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
        onClick={handleCompra}
      >
        Comprar
      </button>
    </div>
  );
};

export default DetailVehicle;
