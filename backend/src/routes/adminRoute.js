import express from "express";
import {
  getUsuarios,
  updateUsuario,
  deleteUsuario,
  getVehiculos,
  addVehiculo,
  updateVehiculo,
  deleteVehiculo,
} from "../controllers/adminController.js";

const router = express.Router();

// ========== USUARIOS ==========
router.get("/usuarios", getUsuarios);
router.put("/usuarios/:id", updateUsuario);
router.delete("/usuarios/:id", deleteUsuario);

// ========== VEHICULOS ==========
router.get("/vehiculos", getVehiculos);
router.post("/vehiculos", addVehiculo);
router.put("/vehiculos/:id", updateVehiculo);
router.delete("/vehiculos/:id", deleteVehiculo);

export default router;
