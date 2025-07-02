// src/pages/CatalogoPorCategoria.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import slugify from "../utils/slugify";

const CatalogoPorCategoria = () => {
  const { categoria } = useParams();
  const [vehiculos, setVehiculos] = useState([]);

  useEffect(() => {
    const fetchVehiculos = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/vehiculos/categoria/${categoria}`
        );
        const filtrados = res.data.filter(
          (v) => v.categoria.toLowerCase() === categoria.toLowerCase()
        );
        setVehiculos(filtrados);
      } catch (error) {
        console.error("Error al obtener vehículos:", error);
      }
    };

    fetchVehiculos();
  }, [categoria]);

  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-128px)] px-4 pt-10 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 capitalize text-center">
          Vehículos {categoria}s
        </h1>

        {vehiculos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehiculos.map((vehiculo) => (
              <Link
                to={`/categories/${categoria}/${slugify(vehiculo.nombre)}`}
                key={vehiculo.vehiculo_id}
                className="bg-white shadow rounded-lg p-4 hover:shadow-lg
                transition"
              >
                <img
                  src={`http://localhost:3000/imagenes/${vehiculo.imagen}`}
                  alt={vehiculo.nombre}
                  className="h-48 w-full object-contain mb-4"
                />
                <h3 className="font-semibold text-lg text-center">
                  {vehiculo.nombre}
                </h3>
                <p className="text-center text-gray-500">${vehiculo.precio}</p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No hay vehículos de la categoría {categoria}.
          </p>
        )}
      </main>
      <Footer />
    </>
  );
};

export default CatalogoPorCategoria;
