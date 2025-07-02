// src/controllers/userController.js
import db from "../config/db.js";
import bcrypt from "bcrypt";

export const registrarUsuario = async (req, res) => {
  const { nombre, correo, telefono, contraseña } = req.body;

  if (!nombre || !correo || !telefono || !contraseña) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    // Verificar si el correo ya está registrado
    const [result] = await db.query("SELECT * FROM Usuarios WHERE correo = ?", [
      correo,
    ]);
    if (result.length > 0) {
      return res.status(409).json({ error: "El correo ya está registrado" });
    }

    // Encriptar contraseña
    const hash = await bcrypt.hash(contraseña, 10);

    // Insertar nuevo usuario
    await db.query(
      "INSERT INTO Usuarios (nombre, correo, telefono, contraseña, rol, fecha_registro) VALUES (?, ?, ?, ?, ?, NOW())",
      [nombre, correo, telefono, hash, "cliente"]
    );

    return res
      .status(201)
      .json({ message: "Usuario registrado correctamente" });
  } catch (err) {
    console.error("Error al registrar:", err);
    return res.status(500).json({ error: "Error del servidor" });
  }
};
