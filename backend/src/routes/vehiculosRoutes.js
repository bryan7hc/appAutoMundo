// vehiculosRoutes.js
import express from "express";
import { getVehiculos } from "../controllers/vehiculosController.js";

const router = express.Router();

// Definir ruta GET para obtener todos los vehículos
router.get("/", getVehiculos);

export default router;
