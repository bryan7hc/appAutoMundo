import db from "../config/db.js";

// Obtener historial de pedidos de un usuario
export const obtenerHistorialPedidos = async (req, res) => {
  const { usuario_id } = req.params;
  try {
    const [result] = await db.query(
      `SELECT * FROM Pedidos WHERE usuario_id = ? ORDER BY fecha_pedido DESC`,
      [usuario_id]
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener historial de pedidos" });
  }
};

// Obtener detalles de un pedido específico
export const obtenerDetallePedido = async (req, res) => {
  const { pedido_id } = req.params;
  try {
    const [detalle] = await db.query(
      `SELECT dp.*, v.nombre, v.imagen FROM Detalle_Pedidos dp
       JOIN Vehiculos v ON dp.vehiculo_id = v.vehiculo_id
       WHERE dp.pedido_id = ?`,
      [pedido_id]
    );
    res.json(detalle);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener detalles del pedido" });
  }
};

// Cancelar un pedido
export const cancelarPedido = async (req, res) => {
  const { pedido_id } = req.params;
  try {
    const [pedido] = await db.query(
      `SELECT estado FROM Pedidos WHERE pedido_id = ?`,
      [pedido_id]
    );

    if (!pedido.length) {
      return res.status(404).json({ error: "Pedido no encontrado" });
    }

    if (pedido[0].estado !== "pendiente") {
      return res.status(400).json({
        error: "El pedido no puede ser cancelado en su estado actual",
      });
    }

    await db.query(
      `UPDATE Pedidos SET estado = 'cancelado' WHERE pedido_id = ?`,
      [pedido_id]
    );

    res.json({ mensaje: "Pedido cancelado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al cancelar el pedido" });
  }
};
