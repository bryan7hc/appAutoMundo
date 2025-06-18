import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

// Iconos de categorías (solo para mostrar la opción visual)
import CatCamioneta from "../assets/categories/camioneta/ccamioneta.png";
import CatDeportivo from "../assets/categories/camioneta/cdeportivo.png";
import CatElectrico from "../assets/categories/camioneta/celectrico.png";

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [vehiculos, setVehiculos] = useState([]);

  const categories = [
    { id: 1, name: "camioneta", image: CatCamioneta },
    { id: 2, name: "deportivo", image: CatDeportivo },
    { id: 3, name: "electrico", image: CatElectrico },
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  useEffect(() => {
    const obtenerVehiculos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/vehiculos");
        setVehiculos(response.data);
      } catch (error) {
        console.error("Error al obtener los vehículos:", error);
      }
    };

    obtenerVehiculos();
  }, []);

  // Filtrar los vehículos por la categoría seleccionada
  const vehiculosFiltrados = selectedCategory
    ? vehiculos.filter((v) => v.categoria === selectedCategory)
    : [];

  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-128px)] flex flex-col items-center px-4 pt-10">
        <h1 className="text-3xl font-semibold mb-18 mt-22">
          Busca por categorías
        </h1>

        <div className="flex justify-center gap-16">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => handleCategoryClick(category.name)}
            >
              <img
                src={category.image}
                alt={category.name}
                className="h-24 w-auto mb-2"
              />
              <span className="text-sm font-medium capitalize">
                {category.name}
              </span>
            </div>
          ))}
        </div>

        {selectedCategory && (
          <div className="mt-10 w-full max-w-6xl">
            <h2 className="text-2xl font-semibold mb-6 mt-10 text-center capitalize">
              Vehículos {selectedCategory}s
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {vehiculosFiltrados.map((vehiculo) => (
                <Link
                  to={`/vehiculo/${vehiculo.vehiculo_id}`}
                  key={vehiculo.vehiculo_id}
                  className="flex flex-col items-center cursor-pointer"
                >
                  <img
                    src={`http://localhost:3000/imagenes/${vehiculo.imagen}`}
                    alt={vehiculo.nombre}
                    className="h-52 w-auto mb-2 object-contain"
                  />

                  <span className="text-sm font-medium text-center">
                    {vehiculo.nombre}
                  </span>
                  <span className="text-sm text-gray-600">
                    S/. {vehiculo.precio}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default Categories;
