import express from "express";
import {
  obtenerHistorialPedidos,
  obtenerDetallePedido,
  cancelarPedido,
} from "../controllers/pedidosController.js";

const router = express.Router();

// Obtener historial de pedidos de un usuario
router.get("/:usuario_id", obtenerHistorialPedidos);

// Obtener detalle de un pedido
router.get("/detalle/:pedido_id", obtenerDetallePedido);

// Cancelar pedido
router.put("/cancelar/:pedido_id", cancelarPedido);

export default router;
