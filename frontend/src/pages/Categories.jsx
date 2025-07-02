// src/pages/Categories.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

// Iconos de categorías
import CatCamioneta from "../assets/categories/camioneta/ccamioneta.png";
import CatDeportivo from "../assets/categories/camioneta/cdeportivo.png";
import CatElectrico from "../assets/categories/camioneta/celectrico.png";

const Categories = () => {
  const navigate = useNavigate();

  const categories = [
    { id: 1, name: "camioneta", image: CatCamioneta },
    { id: 2, name: "deportivo", image: CatDeportivo },
    { id: 3, name: "electrico", image: CatElectrico },
  ];

  const handleCategoryClick = (category) => {
    navigate(`/categories/${category}`);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-128px)] flex flex-col items-center px-4 pt-10">
        <h1 className="text-3xl font-semibold mb-16">Busca por categorías</h1>

        <div className="flex justify-center flex-wrap gap-10">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex flex-col items-center cursor-pointer transition-transform hover:scale-105 bg-white shadow-md p-4 rounded-lg w-36"
              onClick={() => handleCategoryClick(category.name)}
            >
              <img
                src={category.image}
                alt={category.name}
                className="h-24 w-auto mb-2"
              />
              <span className="text-sm font-semibold capitalize text-center text-gray-700">
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Categories;
