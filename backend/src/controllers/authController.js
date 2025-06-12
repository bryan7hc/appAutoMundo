import db from "../config/db.js";
import bcrypt from "bcrypt";

export const loginUsuario = (req, res) => {
  const { correo, contraseña } = req.body;
  console.log("Recibido login:", correo, contraseña);

  const query = "SELECT * FROM Usuarios WHERE correo = ?";
  db.query(query, [correo], (err, results) => {
    console.log("Entró al callback de db.query");

    if (err) {
      console.error("Error en consulta:", err);
      return res.status(500).json({ error: "Error del servidor" });
    }

    if (results.length === 0) {
      console.log("Usuario no encontrado");
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const usuario = results[0];
    const hash = usuario["contraseña"]; // ← Acceso correcto

    console.log("Comparando hash con contraseña...");

    bcrypt.compare(contraseña, hash, (err, isMatch) => {
      if (err) {
        console.error("Error al comparar contraseñas:", err);
        return res.status(500).json({ error: "Error del servidor" });
      }

      if (!isMatch) {
        console.log("Contraseña incorrecta");
        return res.status(401).json({ error: "Contraseña incorrecta" });
      }

      console.log("Login exitoso");
      res.json({
        mensaje: "Inicio de sesión exitoso",
        usuario: {
          usuario_id: usuario.usuario_id,
          nombre: usuario.nombre,
          correo: usuario.correo,
        },
      });
    });
  });
};
