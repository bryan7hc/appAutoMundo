import db from "../config/db.js";

// ==================== USUARIOS ====================

// Mostrar todos los usuarios
export const getUsuarios = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM Usuarios");
    res.json(rows);
  } catch (error) {
    console.error("Error en getUsuarios:", error);
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

// Modificar un usuario
export const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, correo, telefono, contraseña } = req.body;

    const [result] = await db.query(
      `UPDATE Usuarios SET nombre = ?, correo = ?, telefono = ?, contraseña = ?, WHERE usuario_id = ?`,
      [nombre, correo, telefono, contraseña, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    res.status(200).json({ mensaje: "Usuario actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ mensaje: "Error al actualizar usuario" });
  }
};

// Eliminar un usuario
export const deleteUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM Usuarios WHERE usuario_id = ?", [id]);
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error("Error en elminar:", error);
    res.status(500).json({ error: "Error al eliminar el usuario" });
  }
};

// ==================== VEHICULOS ====================

// Mostrar todos los vehículos
export const getVehiculos = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM Vehiculos");
    res.json(rows);
  } catch (error) {
    console.error("Error en mostrar:", error);
    res.status(500).json({ error: "Error al obtener los vehículos" });
  }
};

// Agregar un nuevo vehículo
export const addVehiculo = async (req, res) => {
  const { nombre, precio, categoria, stock, marca_id, descripcion, imagen } =
    req.body;

  try {
    await db.query(
      "INSERT INTO Vehiculos (nombre, precio, categoria, stock, marca_id, descripcion, imagen) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [nombre, precio, categoria, stock, marca_id, descripcion, imagen]
    );
    res.status(201).json({ message: "Vehículo agregado correctamente" });
  } catch (error) {
    console.error("Error en agregar:", error);
    res.status(500).json({ error: "Error al agregar el vehículo" });
  }
};

// Modificar un vehículo
export const updateVehiculo = async (req, res) => {
  const { id } = req.params;
  const { nombre, precio, categoria, stock, marca_id, descripcion, imagen } =
    req.body;

  try {
    await db.query(
      "UPDATE Vehiculos SET nombre=?, precio=?, categoria=?, stock=?, marca_id=?, descripcion=?, imagen=? WHERE vehiculo_id=?",
      [nombre, precio, categoria, stock, marca_id, descripcion, imagen, id]
    );
    res.json({ message: "Vehículo actualizado correctamente" });
  } catch (error) {
    console.error("Error en actualizar:", error);
    res.status(500).json({ error: "Error al actualizar el vehículo" });
  }
};

// Eliminar un vehículo
export const deleteVehiculo = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM Vehiculos WHERE vehiculo_id = ?", [id]);
    res.json({ message: "Vehículo eliminado correctamente" });
  } catch (error) {
    console.error("Error en eliminar:", error);
    res.status(500).json({ error: "Error al eliminar el vehículo" });
  }
};
