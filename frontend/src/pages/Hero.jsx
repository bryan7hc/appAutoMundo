// Componente Hero.jsx
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Volvo from "../assets/Volvo.png";
import Slider from "react-slick";
import Electrificacion from "../assets/Electrificacion.png";
import Seguridad from "../assets/Seguridad.png";
import Sustentabilidad from "../assets/Sustentabilidad.png";
import Footer from "../components/Footer/Footer";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  // URL base para imágenes desde el backend
  const backendUrl = "http://localhost:3000/imagenes";

  // Lista de autos destacados con URLs completas para las imágenes
  const autosDestacados = [
    { id: 1, nombre: "Tesla Model Y", imagen: `${backendUrl}/TeslaModelY.png` },
    {
      id: 2,
      nombre: "Ford Mustang Mach-E",
      imagen: `${backendUrl}/FordMustangMachE.png`,
    },
    { id: 3, nombre: "BMW i5", imagen: `${backendUrl}/BMWi5.png` },
    { id: 4, nombre: "Tesla Model 3", imagen: `${backendUrl}/TeslaModel3.png` },
    {
      id: 5,
      nombre: "Subaru Solterra",
      imagen: `${backendUrl}/SubaruSolterra.png`,
    },
  ];

  return (
    <div className="mt-22">
      {/* Imagen principal */}
      <div className="flex justify-center">
        <img
          src={Volvo}
          alt="Imagen principal"
          className="w-full max-w-screen-xl h-118 object-cover"
        />
      </div>

      {/* Texto "Modelos destacados" */}
      <h2 className="mt-25 mb-6 text-2xl font-semibold text-left px-1 max-w-screen-xl mx-auto">
        Modelos destacados
      </h2>

      {/* Carrusel de autos destacados */}
      <CarruselAutos autosDestacados={autosDestacados} />

      {/* Sección promocional */}
      <div className="mt-30 max-w-screen-xl mx-auto px-4">
        <p className="text-center text-3xl font-semibold mb-10 px-2">
          Nos dedicamos a brindarte la libertad de moverte de forma personal,
          sostenible y segura.
        </p>

        <div className="flex flex-col sm:flex-row justify-between gap-8">
          {/* Electrificación */}
          <div className="flex flex-col items-center text-center px-4">
            <img
              src={Electrificacion}
              alt="Electrificación"
              className="h-50 w-auto mb-4"
            />
            <h3 className="font-semibold mb-2">Electrificación</h3>
            <p className="text-sm text-gray-600">
              Promovemos vehículos eléctricos que reducen la contaminación y
              mejoran la eficiencia energética.
            </p>
          </div>

          {/* Seguridad */}
          <div className="flex flex-col items-center text-center px-4">
            <img src={Seguridad} alt="Seguridad" className="h-50 w-auto mb-4" />
            <h3 className="font-semibold mb-2">Seguridad</h3>
            <p className="text-sm text-gray-600">
              Equipamos nuestros vehículos con tecnología avanzada para
              protegerte a ti y a tu familia.
            </p>
          </div>

          {/* Sustentabilidad */}
          <div className="flex flex-col items-center text-center px-4">
            <img
              src={Sustentabilidad}
              alt="Sustentabilidad"
              className="h-50 w-auto mb-4"
            />
            <h3 className="font-semibold mb-2">Sustentabilidad</h3>
            <p className="text-sm text-gray-600">
              Nuestro compromiso es con el cuidado del planeta, fomentando
              prácticas responsables y verdes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente interno CarruselAutos
const CarruselAutos = ({ autosDestacados }) => {
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings} className="max-w-screen-xl mx-auto mt-6">
      {autosDestacados.map((auto) => (
        <div key={auto.id} className="px-2">
          <img
            src={auto.imagen}
            alt={auto.nombre}
            className="max-w-md w-full max-h160 object-contain rounded-md mx-auto"
          />
          <div className="mt-2 flex items-center justify-center gap-4">
            <p className="font-medium text-center">{auto.nombre}</p>
            <button
              className="px-4 py-1 bg-red-800 text-white rounded hover:bg-red-400 transition"
              onClick={() => navigate(`/vehiculo/${auto.id}`)}
            >
              EXPLORAR
            </button>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default Hero;
