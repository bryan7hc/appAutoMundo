import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../componentsAdmin/Sidebar";

export default function Vehiculo() {
  const [vehiculos, setVehiculos] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState(null);

  const obtenerVehiculos = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/admin/vehiculos");
      setVehiculos(res.data);
    } catch (error) {
      console.error("Error al obtener vehículos:", error);
    }
  };

  useEffect(() => {
    obtenerVehiculos();
  }, []);

  const abrirModal = (vehiculo = null) => {
    setVehiculoSeleccionado(
      vehiculo || {
        nombre: "",
        precio: "",
        categoria: "",
        stock: "",
        marca_id: "",
        descripcion: "",
        imagen: "",
      }
    );
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setVehiculoSeleccionado(null);
  };

  const guardarCambios = async (e) => {
    e.preventDefault();
    try {
      if (vehiculoSeleccionado.vehiculo_id) {
        // Editar
        await axios.put(
          `http://localhost:3000/api/admin/vehiculos/${vehiculoSeleccionado.vehiculo_id}`,
          vehiculoSeleccionado
        );
      } else {
        // Crear nuevo
        await axios.post(
          "http://localhost:3000/api/admin/vehiculos",
          vehiculoSeleccionado
        );
      }
      obtenerVehiculos();
      cerrarModal();
    } catch (error) {
      console.error("Error al guardar vehículo:", error);
    }
  };

  const eliminarVehiculo = async (id) => {
    if (confirm("¿Estás seguro de que quieres eliminar este vehículo?")) {
      try {
        await axios.delete(`http://localhost:3000/api/admin/vehiculos/${id}`);
        obtenerVehiculos();
      } catch (error) {
        console.error("Error al eliminar vehículo:", error);
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="ml-60 flex-1 p-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Gestión de Vehículos</h1>
          <button
            onClick={() => abrirModal()}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            + Agregar Vehículo
          </button>
        </div>

        <table className="w-full border border-gray-300 bg-white shadow-md rounded overflow-hidden text-sm">
          <thead className="bg-red-600 text-white">
            <tr>
              <th className="py-2 px-2 border">ID</th>
              <th className="py-2 px-2 border">Nombre</th>
              <th className="py-2 px-2 border">Precio</th>
              <th className="py-2 px-2 border">Categoría</th>
              <th className="py-2 px-2 border">Stock</th>
              <th className="py-2 px-2 border">Marca ID</th>
              <th className="py-2 px-2 border">Descripción</th>
              <th className="py-2 px-2 border">Imagen</th>
              <th className="py-2 px-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {vehiculos.map((vehiculo) => (
              <tr
                key={vehiculo.vehiculo_id}
                className="hover:bg-gray-100 text-center"
              >
                <td className="py-2 px-2 border">{vehiculo.vehiculo_id}</td>
                <td className="py-2 px-2 border">{vehiculo.nombre}</td>
                <td className="py-2 px-2 border">${vehiculo.precio}</td>
                <td className="py-2 px-2 border">{vehiculo.categoria}</td>
                <td className="py-2 px-2 border">{vehiculo.stock}</td>
                <td className="py-2 px-2 border">{vehiculo.marca_id}</td>
                <td className="py-2 px-2 border">{vehiculo.descripcion}</td>
                <td className="py-2 px-2 border">
                  <img
                    src={vehiculo.imagen}
                    alt="vehiculo"
                    className="w-16 h-16 object-cover mx-auto"
                  />
                </td>
                <td className="py-2 px-2 border">
                  <button
                    onClick={() => abrirModal(vehiculo)}
                    className="text-blue-600 hover:underline mr-2"
                  >
                    Modificar
                  </button>
                  <button
                    onClick={() => eliminarVehiculo(vehiculo.vehiculo_id)}
                    className="text-red-600 hover:underline"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {mostrarModal && vehiculoSeleccionado && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-[500px] max-w-full shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              {vehiculoSeleccionado.vehiculo_id
                ? "Editar Vehículo"
                : "Nuevo Vehículo"}
            </h2>
            <form onSubmit={guardarCambios} className="space-y-3">
              <input
                type="text"
                placeholder="Nombre"
                value={vehiculoSeleccionado.nombre}
                onChange={(e) =>
                  setVehiculoSeleccionado({
                    ...vehiculoSeleccionado,
                    nombre: e.target.value,
                  })
                }
                className="w-full border border-gray-300 px-3 py-2 rounded"
                required
              />
              <input
                type="number"
                placeholder="Precio"
                value={vehiculoSeleccionado.precio}
                onChange={(e) =>
                  setVehiculoSeleccionado({
                    ...vehiculoSeleccionado,
                    precio: e.target.value,
                  })
                }
                className="w-full border border-gray-300 px-3 py-2 rounded"
                required
              />
              <input
                type="text"
                placeholder="Categoría"
                value={vehiculoSeleccionado.categoria}
                onChange={(e) =>
                  setVehiculoSeleccionado({
                    ...vehiculoSeleccionado,
                    categoria: e.target.value,
                  })
                }
                className="w-full border border-gray-300 px-3 py-2 rounded"
              />
              <input
                type="number"
                placeholder="Stock"
                value={vehiculoSeleccionado.stock}
                onChange={(e) =>
                  setVehiculoSeleccionado({
                    ...vehiculoSeleccionado,
                    stock: e.target.value,
                  })
                }
                className="w-full border border-gray-300 px-3 py-2 rounded"
              />
              <input
                type="text"
                placeholder="Marca ID"
                value={vehiculoSeleccionado.marca_id}
                onChange={(e) =>
                  setVehiculoSeleccionado({
                    ...vehiculoSeleccionado,
                    marca_id: e.target.value,
                  })
                }
                className="w-full border border-gray-300 px-3 py-2 rounded"
              />
              <input
                type="text"
                placeholder="Descripción"
                value={vehiculoSeleccionado.descripcion}
                onChange={(e) =>
                  setVehiculoSeleccionado({
                    ...vehiculoSeleccionado,
                    descripcion: e.target.value,
                  })
                }
                className="w-full border border-gray-300 px-3 py-2 rounded"
              />
              <input
                type="text"
                placeholder="URL Imagen"
                value={vehiculoSeleccionado.imagen}
                onChange={(e) =>
                  setVehiculoSeleccionado({
                    ...vehiculoSeleccionado,
                    imagen: e.target.value,
                  })
                }
                className="w-full border border-gray-300 px-3 py-2 rounded"
              />
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={cerrarModal}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
