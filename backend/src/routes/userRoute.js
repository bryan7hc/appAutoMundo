import express from "express";
import bcrypt from "bcrypt";
import db from "../config/db.js";

const router = express.Router();

router.post("/registro", async (req, res) => {
  const { nombre, correo, telefono, contraseña } = req.body;

  if (!nombre || !correo || !telefono || !contraseña) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    const sql = `INSERT INTO Usuarios (nombre, correo, telefono, contraseña) VALUES (?, ?, ?, ?)`;
    db.query(sql, [nombre, correo, telefono, hashedPassword], (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error al registrar el usuario" });
      }

      return res
        .status(201)
        .json({ mensaje: "Usuario registrado correctamente" });
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error en el servidor", error: error.message });
  }
});

export default router;
