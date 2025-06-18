import React from "react";

const Perfil = () => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  return (
    <div className="min-h-screen pt-28 px-4 bg-gray-100">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-xl p-8">
        <div className="flex items-center space-x-4 mb-6">
          <div className="bg-red-600 text-white rounded-full h-16 w-16 flex items-center justify-center text-2xl font-bold">
            {usuario?.nombre?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              {usuario?.nombre}
            </h1>
            <p className="text-sm text-gray-500">Usuario registrado</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="border-t pt-4">
            <h2 className="text-lg font-medium text-gray-700">
              Datos personales
            </h2>
            <div className="mt-2 space-y-2">
              <p className="text-base text-gray-600">
                <strong className="text-gray-800">Nombre:</strong>{" "}
                {usuario?.nombre}
              </p>
              <p className="text-base text-gray-600">
                <strong className="text-gray-800">Correo:</strong>{" "}
                {usuario?.correo}
              </p>
              <p className="text-base text-gray-600">
                <strong className="text-gray-800">Teléfono:</strong>{" "}
                {usuario?.telefono || "No registrado"}
              </p>
              <p className="text-base text-gray-600">
                <strong className="text-gray-800">Rol:</strong> {usuario?.rol}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
