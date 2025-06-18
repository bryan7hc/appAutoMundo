import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const HistorialPedido = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario) {
      window.location.href = "/login"; // Redirige si no está logueado
      return;
    }

    const fetchPedidos = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/pedidos/${usuario.id}`
        );
        setPedidos(response.data);
        if (response.data.length === 0) {
          setMensaje("No tienes pedidos registrados.");
        }
      } catch (error) {
        console.error("Error al obtener pedidos:", error);
        setMensaje("Error al cargar el historial de pedidos.");
      } finally {
        setLoading(false);
      }
    };

    fetchPedidos();
  }, []);

  return (
    <main className="pt-24 px-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        Historial de Pedidos
      </h1>

      {loading ? (
        <p className="text-center">Cargando pedidos...</p>
      ) : mensaje ? (
        <p className="text-center text-gray-600">{mensaje}</p>
      ) : (
        <div className="space-y-6">
          {pedidos.map((pedido) => (
            <div
              key={pedido.id}
              className="border border-gray-300 p-4 rounded-lg shadow-md"
            >
              <p className="text-lg font-semibold">Pedido #{pedido.id}</p>
              <p>Fecha: {new Date(pedido.fecha).toLocaleDateString()}</p>
              <p>Estado: {pedido.estado}</p>
              <Link
                to={`/pedido/${pedido.id}`}
                className="text-blue-600 hover:underline"
              >
                Ver detalles
              </Link>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default HistorialPedido;
