// vehiculosRoutes.js
import express from "express";
import db from "../config/db.js";
import { getVehiculos } from "../controllers/vehiculosController.js";

const router = express.Router();

// backend/src/routes/vehiculos.js
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query(
      `SELECT v.*, m.nombre AS marca
       FROM Vehiculos v
       JOIN Marcas m ON v.marca_id = m.marca_id
       WHERE v.vehiculo_id = ?`,
      [id]
    );

    if (result.length === 0)
      return res.status(404).json({ error: "Vehículo no encontrado" });

    res.json(result[0]);
  } catch (error) {
    console.error("Error en mostrar marca:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// Definir ruta GET para obtener todos los vehículos
router.get("/", getVehiculos);

export default router;
