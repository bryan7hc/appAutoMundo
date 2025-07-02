// src/components/DetailVehicle/DetailVehicle.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaCarSide,
  FaCogs,
  FaGasPump,
  FaPalette,
  FaMapMarkerAlt,
  FaDoorOpen,
  FaChair,
  FaRoad,
  FaCheckCircle,
  FaShieldAlt,
  FaWarehouse,
} from "react-icons/fa";
import Reseñas from "../Reseñas/Reseñas";

const DetailVehicle = () => {
  const { slug } = useParams();
  const [vehiculo, setVehiculo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/vehiculos/slug/${slug}`)
      .then((res) => {
        setVehiculo(res.data);
      })
      .catch((err) => {
        console.error("Error al obtener el vehículo:", err);
      });
  }, [slug]);

  const handleCompra = () => {
    navigate("/compra", { state: { vehiculo } });
  };

  if (!vehiculo)
    return <p className="text-center mt-8">Cargando vehículo...</p>;

  return (
    <div className="max-w-6xl mx-auto mt-28 p-8 bg-white shadow-lg rounded-xl">
      {/* Header con imagen y nombre */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex justify-center items-center bg-gray-100 rounded-lg p-4">
          <img
            src={`http://localhost:3000/imagenes/${vehiculo.imagen}`}
            alt={vehiculo.nombre}
            className="w-full h-80 object-contain rounded"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-800">
              {vehiculo.nombre}
            </h1>
            {vehiculo.destacado && (
              <span className="bg-yellow-400 text-black px-3 py-1 text-xs font-semibold rounded-full">
                🚘 Destacado
              </span>
            )}
          </div>

          <p className="text-xl text-red-600 font-bold">${vehiculo.precio}</p>

          <p className="text-gray-700 text-sm leading-relaxed">
            {vehiculo.descripcion}
          </p>

          <button
            className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-md transition"
            onClick={handleCompra}
          >
            Comprar ahora
          </button>
        </div>
      </div>

      {/* Especificaciones técnicas */}
      <div className="mt-10 border-t pt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Especificaciones Técnicas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-700">
          <InfoItem icon={<FaCarSide />} label="Marca" value={vehiculo.marca} />
          <InfoItem icon={<FaCogs />} label="Motor" value={vehiculo.motor} />
          <InfoItem
            icon={<FaGasPump />}
            label="Combustible"
            value={vehiculo.combustible}
          />
          <InfoItem icon={<FaPalette />} label="Color" value={vehiculo.color} />
          <InfoItem
            icon={<FaMapMarkerAlt />}
            label="Ubicación"
            value={vehiculo.ubicacion}
          />
          <InfoItem
            icon={<FaDoorOpen />}
            label="Puertas"
            value={vehiculo.puertas}
          />
          <InfoItem
            icon={<FaChair />}
            label="Asientos"
            value={vehiculo.asientos}
          />
          <InfoItem
            icon={<FaRoad />}
            label="Kilometraje"
            value={`${vehiculo.kilometraje} km`}
          />
          <InfoItem
            icon={<FaCheckCircle />}
            label="Condición"
            value={vehiculo.condicion}
          />
          <InfoItem
            icon={<FaShieldAlt />}
            label="Garantía"
            value={vehiculo.garantia || "No especificada"}
          />
          <InfoItem
            icon={<FaWarehouse />}
            label="Stock"
            value={vehiculo.stock}
          />
          <InfoItem label="Modelo" value={vehiculo.modelo} />
          <InfoItem label="Transmisión" value={vehiculo.transmision} />
        </div>
      </div>

      {/* Sección de reseñas */}
      <div className="mt-12 border-t pt-6">
        <Reseñas vehiculoId={vehiculo.vehiculo_id} />
      </div>
    </div>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center bg-gray-50 rounded-md p-3 shadow-sm">
    {icon && <span className="text-red-600 mr-3 text-lg">{icon}</span>}
    <div>
      <p className="font-semibold">{label}</p>
      <p className="text-gray-600">{value}</p>
    </div>
  </div>
);

export default DetailVehicle;
