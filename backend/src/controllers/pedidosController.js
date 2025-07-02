// backend/src/controllers/pedidoController.js
import db from "../config/db.js";

// Obtener pedidos de un usuario
export const obtenerPedidosPorUsuario = async (req, res) => {
  try {
    const { usuarioId } = req.params;

    const [rows] = await db.query(
      `SELECT p.pedido_id, p.fecha_pedido, p.estado, p.total, v.nombre AS vehiculo
       FROM Pedidos p
       JOIN Vehiculos v ON v.vehiculo_id = p.vehiculo_id
       WHERE p.usuario_id = ?
       ORDER BY p.fecha_pedido DESC`,
      [usuarioId]
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error("❌ Error al obtener pedidos por usuario:", error);
    res.status(500).json({ error: "Error al obtener pedidos" });
  }
};

export const cancelarPedido = async (req, res) => {
  try {
    const { pedido_id } = req.params;

    if (!pedido_id) {
      return res.status(400).json({ error: "ID del pedido requerido" });
    }

    // Actualiza el estado a "cancelado"
    await db.query(
      "UPDATE pedidos SET estado = 'cancelado' WHERE pedido_id = ?",
      [pedido_id]
    );

    res.status(200).json({ mensaje: "Pedido cancelado exitosamente" });
  } catch (error) {
    console.error("Error al cancelar el pedido:", error);
    res.status(500).json({ error: "Error al cancelar el pedido" });
  }
};

export const obtenerDetallePedido = async (req, res) => {
  try {
    const { pedido_id } = req.params;

    if (!pedido_id) {
      return res.status(400).json({ error: "ID del pedido requerido" });
    }

    const [detalle] = await db.query(
      `
      SELECT p.*, v.nombre AS vehiculo_nombre, u.nombre AS usuario_nombre
      FROM pedidos p
      JOIN vehiculos v ON p.vehiculo_id = v.vehiculo_id
      JOIN usuarios u ON p.usuario_id = u.usuario_id
      WHERE p.pedido_id = ?
    `,
      [pedido_id]
    );

    if (detalle.length === 0) {
      return res.status(404).json({ error: "Pedido no encontrado" });
    }

    res.status(200).json(detalle[0]);
  } catch (error) {
    console.error("Error al obtener detalle del pedido:", error);
    res.status(500).json({ error: "Error al obtener detalle del pedido" });
  }
};

export const obtenerHistorialPedidos = async (req, res) => {
  try {
    const { usuario_id } = req.params;

    if (!usuario_id) {
      return res.status(400).json({ error: "ID de usuario requerido" });
    }

    const [pedidos] = await db.query(
      `
      SELECT p.*, v.nombre AS vehiculo_nombre, v.imagen, v.precio
      FROM pedidos p
      JOIN vehiculos v ON p.vehiculo_id = v.vehiculo_id
      WHERE p.usuario_id = ?
      ORDER BY p.fecha_pedido DESC
    `,
      [usuario_id]
    );

    res.status(200).json(pedidos);
  } catch (error) {
    console.error("Error al obtener historial de pedidos:", error);
    res.status(500).json({ error: "Error al obtener historial de pedidos" });
  }
};
