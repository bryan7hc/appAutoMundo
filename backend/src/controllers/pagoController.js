import dotenv from "dotenv";
dotenv.config();

import mercadopago from "../config/mercadopago.js";
import db from "../config/db.js";

// Cambia esta URL base según tu entorno:
// - LOCAL (con ngrok): ej. https://abc123.ngrok.io
// - PRODUCCIÓN (Azure): ej. https://automundo-backend.azurewebsites.net
const BASE_URL = process.env.BASE_URL || "https://abc123.ngrok.io";

export const crearPreferencia = async (req, res) => {
  try {
    const { nombre, descripcion, precio, cantidad, idVehiculo, userId } =
      req.body;

    // Validación de campos obligatorios
    if (!nombre || !precio || !cantidad || !idVehiculo || !userId) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    // 🧪 Tu dominio público de Ngrok o Azure
    const BASE_URL = "https://8f81-38-25-53-76.ngrok-free.app"; // CAMBIA esto si usas otro túnel o ya estás en Azure

    const preference = {
      items: [
        {
          title: nombre,
          description: descripcion || "Compra desde Automundo",
          unit_price: parseFloat(precio),
          quantity: parseInt(cantidad),
          currency_id: "PEN",
        },
      ],
      back_urls: {
        success: `${BASE_URL}/api/pago/pago-exitoso?userId=${userId}&idVehiculo=${idVehiculo}&cantidad=${cantidad}`,
        failure: "http://localhost:5173/pago-fallido",
        pending: "http://localhost:5173/pago-pendiente",
      },
      auto_return: "approved", // <- ✅ Esto asegura la redirección automática
      metadata: {
        userId,
        idVehiculo,
        cantidad,
      },
    };

    const response = await mercadopago.preferences.create(preference);
    console.log("✅ Preferencia creada:", response.body.id);
    res.status(200).json({ id: response.body.id });
  } catch (error) {
    console.error("❌ Error al crear preferencia:", error);
    res.status(500).json({ error: "Error interno al crear la preferencia" });
  }
};

export const registrarVentaExitosa = async (req, res) => {
  try {
    const { userId, idVehiculo, cantidad } = req.query;

    console.log("📥 Datos recibidos en /pago-exitoso:", {
      userId,
      idVehiculo,
      cantidad,
    });

    if (!userId || !idVehiculo || !cantidad) {
      return res.status(400).json({ error: "Faltan datos en la URL" });
    }

    const [vehiculoRows] = await db.query(
      "SELECT precio, stock FROM vehiculos WHERE vehiculo_id = ?",
      [idVehiculo]
    );

    if (vehiculoRows.length === 0) {
      return res.status(404).json({ error: "Vehículo no encontrado" });
    }

    const vehiculo = vehiculoRows[0];

    if (vehiculo.stock < cantidad) {
      return res.status(400).json({ error: "Stock insuficiente" });
    }

    const total = vehiculo.precio * cantidad;

    await db.query(
      `INSERT INTO Pedidos (usuario_id, total, estado, fecha_pedido, vehiculo_id) 
       VALUES (?, ?, 'confirmado', NOW(), ?)`,
      [userId, total, idVehiculo]
    );

    await db.query(
      "UPDATE vehiculos SET stock = stock - ? WHERE vehiculo_id = ?",
      [cantidad, idVehiculo]
    );

    console.log("✅ Venta registrada y stock actualizado");

    // Redirigir al frontend
    return res.redirect(
      `http://localhost:5173/pago-exitoso?estado=confirmado&vehiculoId=${idVehiculo}&userId=${userId}&cantidad=${cantidad}`
    );
  } catch (error) {
    console.error("❌ Error al registrar la venta:", error);
    return res
      .status(500)
      .json({ error: "Error interno al registrar la venta" });
  }
};
