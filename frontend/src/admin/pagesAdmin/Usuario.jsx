import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../componentsAdmin/Sidebar";

export default function Usuario() {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  // Obtener usuarios desde el backend
  const obtenerUsuarios = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/admin/usuarios");
      setUsuarios(res.data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const abrirModal = (usuario) => {
    setUsuarioSeleccionado({ ...usuario });
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setUsuarioSeleccionado(null);
  };

  const guardarCambios = async (e) => {
    e.preventDefault();
    try {
      const { usuario_id, nombre, correo, telefono, contraseña } = usuarioSeleccionado;

      await axios.put(`http://localhost:3000/api/admin/usuarios/${usuario_id}`, {
        nombre,
        correo,
        telefono,
        contraseña,
      });

      obtenerUsuarios();
      cerrarModal();
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
    }
  };

  const eliminarUsuario = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/admin/usuarios/${id}`);
      obtenerUsuarios();
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="ml-60 flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4">Panel de Administración</h1>
        <table className="w-full border border-gray-300 bg-white shadow-md rounded overflow-hidden text-sm">
          <thead className="bg-red-600 text-white">
            <tr>
              <th className="py-2 px-2 border">ID</th>
              <th className="py-2 px-2 border">Nombre</th>
              <th className="py-2 px-2 border">Correo</th>
              <th className="py-2 px-2 border">Teléfono</th>
              <th className="py-2 px-2 border">Contraseña</th>
              <th className="py-2 px-2 border">Fecha de Registro</th>
              <th className="py-2 px-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.usuario_id} className="hover:bg-gray-100 text-center">
                <td className="py-2 px-2 border">{usuario.usuario_id}</td>
                <td className="py-2 px-2 border">{usuario.nombre}</td>
                <td className="py-2 px-2 border">{usuario.correo}</td>
                <td className="py-2 px-2 border">{usuario.telefono}</td>
                <td className="py-2 px-2 border">{usuario.contraseña}</td>
                <td className="py-2 px-2 border">
                  {new Date(usuario.fecha_registro).toLocaleDateString()}
                </td>
                <td className="py-2 px-2 border flex justify-center gap-2">
                  <button
                    onClick={() => abrirModal(usuario)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  >
                    Modificar
                  </button>
                  <button
                    onClick={() => eliminarUsuario(usuario.usuario_id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {mostrarModal && usuarioSeleccionado && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Editar Usuario</h2>
            <form onSubmit={guardarCambios}>
              <div className="mb-3">
                <label className="block text-sm mb-1">Nombre</label>
                <input
                  type="text"
                  value={usuarioSeleccionado.nombre}
                  onChange={(e) => setUsuarioSeleccionado({ ...usuarioSeleccionado, nombre: e.target.value })}
                  className="w-full border border-gray-300 px-3 py-2 rounded"
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm mb-1">Correo</label>
                <input
                  type="email"
                  value={usuarioSeleccionado.correo}
                  onChange={(e) => setUsuarioSeleccionado({ ...usuarioSeleccionado, correo: e.target.value })}
                  className="w-full border border-gray-300 px-3 py-2 rounded"
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm mb-1">Teléfono</label>
                <input
                  type="text"
                  value={usuarioSeleccionado.telefono}
                  onChange={(e) => setUsuarioSeleccionado({ ...usuarioSeleccionado, telefono: e.target.value })}
                  className="w-full border border-gray-300 px-3 py-2 rounded"
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm mb-1">Contraseña</label>
                <input
                  type="password"
                  value={usuarioSeleccionado.contraseña}
                  onChange={(e) => setUsuarioSeleccionado({ ...usuarioSeleccionado, contraseña: e.target.value })}
                  className="w-full border border-gray-300 px-3 py-2 rounded"
                />
              </div>
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
