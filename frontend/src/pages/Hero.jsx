import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Volvo from "../assets/Volvo.png";
import Slider from "react-slick";
import Auto1 from "../assets/slider/Auto1.png";
import Auto2 from "../assets/slider/Auto2.png";
import Auto3 from "../assets/slider/Auto3.png";
import Auto4 from "../assets/slider/Auto4.png";
import Electrificacion from "../assets/Electrificacion.png";
import Seguridad from "../assets/Seguridad.png";
import Sustentabilidad from "../assets/Sustentabilidad.png";
import Footer from "../components/Footer/Footer";

// Aquí un array ejemplo con autos destacados (puedes cambiarlo)
const autosDestacados = [
  { id: 1, nombre: "Chevrolet Equinox EV", imagen: Auto1 },
  { id: 2, nombre: "Toyota Tacoma Híbrida 2025", imagen: Auto2 },
  { id: 3, nombre: "Chevrolet Camaro", imagen: Auto3 },
  { id: 4, nombre: "Mercedes-Benz AMG SL 55", imagen: Auto4 },
  // más autos...
];

const Hero = () => {
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
    <div className="mt-22">
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

      {/* Carrusel de autos */}
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
                onClick={() => {
                  // Aquí luego irá la lógica para abrir detalles del auto
                }}
              >
                EXPLORAR
              </button>
            </div>
          </div>
        ))}
      </Slider>

      {/*Contenedor que promueve la empresa*/}
      <div className="mt-30 max-w-screen-xl mx-auto px-4">
        {/* Frase centrada */}
        <p className="text-center text-3xl font-semibold mb-10 px-2">
          Nos dedicamos a brindarte La libertad de moverse de forma personal,
          sostenible y segura.
        </p>

        {/* Contenedor de las 3 columnas */}
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

export default Hero;
