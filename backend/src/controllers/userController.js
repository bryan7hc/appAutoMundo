import db from "../config/db.js";


export const registrarUsuario = (req, res) => {
  const { nombre, correo, telefono, contraseña } = req.body;

  if (!nombre || !correo || !telefono || !contraseña) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const query = `
    INSERT INTO Usuarios (nombre, correo, telefono, contraseña)
    VALUES (?, ?, ?, ?)
  `;

  db.query(query, [nombre, correo, telefono, contraseña], (err, ) => {
    if (err) {
      console.error("Error al registrar usuario:", err);
      return res.status(500).json({ error: "Error del servidor" });
    }
    return res
      .status(201)
      .json({ message: "Usuario registrado correctamente" });
  });
};
