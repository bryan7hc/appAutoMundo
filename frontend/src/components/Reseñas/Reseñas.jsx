import React, { useEffect, useState } from "react";
import axios from "axios";

const Reseñas = ({ vehiculoId }) => {
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState("");
  const [calificacion, setCalificacion] = useState(0);
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const obtenerReseñas = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/vehiculos/${vehiculoId}/resenas`
      );
      setComentarios(res.data);
    } catch (error) {
      console.error("Error al obtener reseñas:", error);
    }
  };

  const enviarReseña = async () => {
    if (!nuevoComentario.trim() || calificacion === 0) return;

    try {
      await axios.post(
        `http://localhost:3000/api/vehiculos/${vehiculoId}/resenas`,
        {
          usuario_id: usuario.usuario_id,
          comentario: nuevoComentario,
          calificacion: calificacion,
        }
      );

      setNuevoComentario("");
      setCalificacion(0);
      obtenerReseñas();
    } catch (error) {
      console.error("Error al enviar reseña:", error);
    }
  };

  const renderEstrellas = (cantidad) => {
    return (
      <div className="flex space-x-1">
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            className={`text-lg ${
              index < cantidad ? "text-yellow-400" : "text-gray-300"
            }`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const renderEstrellasSeleccionables = () => {
    return (
      <div className="flex gap-1 mb-2">
        {[1, 2, 3, 4, 5].map((estrella) => (
          <button
            key={estrella}
            type="button"
            onClick={() => setCalificacion(estrella)}
            className={`text-xl ${
              calificacion >= estrella ? "text-yellow-400" : "text-gray-300"
            } focus:outline-none`}
          >
            ★
          </button>
        ))}
      </div>
    );
  };

  useEffect(() => {
    obtenerReseñas();
  }, []);

  return (
    <div className="mt-10">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Reseñas de otros usuarios
      </h3>

      {comentarios.length === 0 ? (
        <p className="text-gray-600">Aún no hay reseñas para este vehículo.</p>
      ) : (
        <div className="space-y-4">
          {comentarios.map((comentario) => (
            <div
              key={comentario.reseña_id}
              className="bg-gray-50 p-4 rounded-md shadow"
            >
              <div className="flex justify-between items-center">
                <p className="font-semibold text-gray-800">
                  {comentario.nombre}
                </p>
                {renderEstrellas(comentario.calificacion)}
              </div>
              <p className="text-gray-700 text-sm mt-1">
                {comentario.comentario}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(comentario.fecha).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}

      {usuario ? (
        <div className="mt-6">
          <h4 className="text-lg font-medium text-gray-800 mb-2">
            Deja tu reseña
          </h4>
          {renderEstrellasSeleccionables()}
          <textarea
            value={nuevoComentario}
            onChange={(e) => setNuevoComentario(e.target.value)}
            rows={3}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Escribe tu comentario..."
          />
          <button
            onClick={enviarReseña}
            className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Enviar Reseña
          </button>
        </div>
      ) : (
        <p className="mt-4 text-sm text-gray-500">
          Inicia sesión para dejar una reseña.
        </p>
      )}
    </div>
  );
};

export default Reseñas;
