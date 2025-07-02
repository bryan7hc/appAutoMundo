import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const PagoExitoso = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState("Procesando el pago...");

  const estado = searchParams.get("estado");
  const idVehiculo = searchParams.get("vehiculoId");
  const userId = searchParams.get("userId");
  const cantidad = searchParams.get("cantidad");

  useEffect(() => {
    // Validar si todos los parámetros están presentes
    if (!estado || !idVehiculo || !userId || !cantidad) {
      setMensaje("❌ Datos incompletos en la URL de confirmación");
      return;
    }

    // Mostrar mensaje según estado
    if (estado === "confirmado") {
      setMensaje("✅ ¡Gracias por tu compra! El pago fue aprobado y registrado.");
    } else if (estado === "pendiente") {
      setMensaje("⏳ Tu pago está en proceso. Te notificaremos cuando se confirme.");
    } else {
      setMensaje("❌ El pago no fue aprobado o fue cancelado.");
    }
  }, [estado, idVehiculo, userId, cantidad]);

  return (
    <div className="mt-28 text-center">
      <h1 className="text-2xl font-bold mb-4">Resultado del Pago</h1>
      <p className="text-gray-700">{mensaje}</p>

      <button
        onClick={() => navigate("/")}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
      >
        Volver al inicio
      </button>
    </div>
  );
};

export default PagoExitoso;
