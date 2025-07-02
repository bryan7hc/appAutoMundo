import React, { useEffect, useState } from "react";
import axios from "axios";

const HistorialPedidos = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const fetchPedidos = async () => {
      const usuario = JSON.parse(localStorage.getItem("usuario"));

      console.log("📦 Usuario recuperado del localStorage:", usuario); // <== AQUI

      if (!usuario) return;

      try {
        const res = await axios.get(`http://localhost:3000/api/pedidos/usuario/${usuario.usuario_id}`);

        
        setPedidos(res.data);
      } catch (error) {
        console.error("❌ Error al obtener historial:", error);
      }
    };

    fetchPedidos();
  }, []);

  return (
    <div className="p-6 mt-24 max-w-4xl mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Historial de Pedidos</h2>
      {pedidos.length === 0 ? (
        <p>No hay pedidos registrados.</p>
      ) : (
        <ul className="space-y-4">
          {pedidos.map((pedido) => (
            <li key={pedido.pedido_id} className="border p-4 rounded">
              <p>
                <strong>Vehículo:</strong> {pedido.vehiculo}
              </p>
              <p>
                <strong>Fecha:</strong>{" "}
                {new Date(pedido.fecha_pedido).toLocaleString()}
              </p>
              <p>
                <strong>Total:</strong> S/. {pedido.total}
              </p>
              <p>
                <strong>Estado:</strong> {pedido.estado}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HistorialPedidos;
