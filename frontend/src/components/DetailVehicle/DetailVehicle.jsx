import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

import img1 from "../../assets/DetailVehicle/1.png";
import img2 from "../../assets/DetailVehicle/2.png";
import img3 from "../../assets/DetailVehicle/3.png";

const vehicles = [
  {
    id: 1,
    modelo: "Honda Ridgeline",
    descripcion:
      "La Honda Ridgeline es una camioneta pickup de tamaño mediano que combina la robustez de un vehículo para trabajo con la comodidad y tecnología de un SUV moderno. " +
      "Destaca por su construcción unibody que mejora la estabilidad y manejo, además de contar con un motor V6 de 3.5 litros que entrega potencia suficiente para cualquier terreno. " +
      "Esta camioneta ofrece múltiples características de seguridad avanzada, como control de estabilidad, frenos ABS y múltiples airbags, ideales para proteger a los pasajeros en cualquier situación. " +
      "Su interior espacioso incluye asientos cómodos, sistema de infoentretenimiento con pantalla táctil, conectividad Bluetooth y múltiples puertos USB, pensado para viajes largos o el día a día en la ciudad.",
    caracteristicas: {
      motor: "3.5L V6",
      potencia: "280 HP",
      transmision: "Automática de 6 velocidades",
      traccion: "4x4 con modo de tracción variable",
      capacidad_carga: "710 kg",
      capacidad_tanque: "71 litros",
      consumo: "11 km/l en carretera",
    },
    fotos: [img1, img2, img3],
  },
];

const DetailVehicle = () => {
  const { id } = useParams();
  const vehiculo = vehicles.find((v) => v.id === Number(id));

  if (!vehiculo) {
    return (
      <>
        <Navbar />
        <main className="min-h-[calc(100vh-128px)] flex flex-col items-center justify-center px-4 pt-10">
          <h2 className="text-2xl font-semibold">Vehículo no encontrado</h2>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-128px)] max-w-5xl mx-auto px-4 pt-10">
        <h1 className="text-3xl font-bold mb-6">{vehiculo.modelo}</h1>
        <p className="mb-8 leading-relaxed text-justify">{vehiculo.descripcion}</p>

        <table className="table-auto border-collapse border border-gray-300 mb-10 w-full max-w-md mx-auto">
          <tbody>
            {Object.entries(vehiculo.caracteristicas).map(([key, value]) => (
              <tr key={key} className="border border-gray-300">
                <td className="border border-gray-300 px-4 py-2 font-semibold capitalize">
                  {key.replace(/_/g, " ")}
                </td>
                <td className="border border-gray-300 px-6 py-2">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex overflow-x-auto gap-6">
          {vehiculo.fotos.map((foto, index) => (
            <img
              key={index}
              src={foto}
              alt={`${vehiculo.modelo} foto ${index + 1}`}
              className="h-48 w-auto rounded shadow-md flex-shrink-0"
            />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default DetailVehicle;
