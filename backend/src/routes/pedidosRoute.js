import express from "express";
import {
  obtenerHistorialPedidos,
  obtenerDetallePedido,
  cancelarPedido,
  obtenerPedidosPorUsuario,
} from "../controllers/pedidosController.js";

const router = express.Router();

// Obtener todos los pedidos de un usuario
router.get('/usuario/:usuarioId', obtenerPedidosPorUsuario);

// Obtener historial general (para administrador, por ejemplo)
router.get('/', obtenerHistorialPedidos);

// Obtener detalle de un pedido específico
router.get("/detalle/:pedido_id", obtenerDetallePedido);

// Cancelar un pedido
router.put("/cancelar/:pedido_id", cancelarPedido);

export default router;
