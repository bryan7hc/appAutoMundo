// controllers/vehiculosController.js
import db from "../config/db.js";

export const getVehiculos = async (req, res) => {
  try {
    const [vehiculos] = await db.query("SELECT * FROM vehiculos");
    res.json(vehiculos);
  } catch (error) {
    console.error("Error al obtener vehículos:", error);
    res.status(500).json({ mensaje: "Error del servidor" });
  }
};
