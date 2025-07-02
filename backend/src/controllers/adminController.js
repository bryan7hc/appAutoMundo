import db from "../config/db.js";
import slugify from "../utils/slugify.js";


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
      `UPDATE Usuarios SET nombre = ?, correo = ?, telefono = ?, contraseña = ? WHERE usuario_id = ?`,
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
// Mostrar todos los vehículos con nombre de marca
export const getVehiculos = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        v.vehiculo_id, v.nombre, v.precio, v.categoria, v.stock, 
        v.descripcion, v.imagen, v.marca_id, m.nombre AS nombre_marca
      FROM Vehiculos v
      JOIN Marcas m ON v.marca_id = m.marca_id
    `);
    res.json(rows);
  } catch (error) {
    console.error("Error en mostrar vehículos:", error);
    res.status(500).json({ error: "Error al obtener los vehículos" });
  }
};

// Agregar un nuevo vehículo
export const addVehiculo = async (req, res) => {
  const {
    nombre,
    precio,
    categoria,
    stock,
    marca_id,
    descripcion,
    imagen,
    modelo,
    color,
    motor,
    transmision,
    kilometraje,
    combustible,
    puertas,
    asientos,
    condicion,
    garantia,
    ubicacion,
    destacado,
  } = req.body;

  const slug = slugify(nombre);

  try {
    await db.query(
      `INSERT INTO Vehiculos 
       (nombre, precio, categoria, stock, marca_id, descripcion,
        imagen, modelo, color, motor, transmision,
        kilometraje, combustible, puertas, asientos,
        condicion, garantia, ubicacion, destacado, slug)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        nombre,
        precio,
        categoria,
        stock,
        marca_id,
        descripcion,
        imagen,
        modelo,
        color,
        motor,
        transmision,
        kilometraje,
        combustible,
        puertas,
        asientos,
        condicion,
        garantia,
        ubicacion,
        destacado ? 1 : 0,
        slug,
      ]
    );
    res.status(201).json({ message: "Vehículo agregado correctamente" });
  } catch (error) {
    console.error("Error agregando vehículo:", error);
    res.status(500).json({ error: "Error al agregar vehículo" });
  }
};

// Modificar un vehículo
export const updateVehiculo = async (req, res) => {
  const { id } = req.params;
  const {
    nombre,
    precio,
    categoria,
    stock,
    marca_id,
    descripcion,
    imagen,
    modelo,
    color,
    motor,
    transmision,
    kilometraje,
    combustible,
    puertas,
    asientos,
    condicion,
    garantia,
    ubicacion,
    destacado,
  } = req.body;

  try {
    await db.query(
      `UPDATE Vehiculos SET 
        nombre = ?, 
        precio = ?, 
        categoria = ?, 
        stock = ?, 
        marca_id = ?, 
        descripcion = ?, 
        imagen = ?, 
        modelo = ?, 
        color = ?, 
        motor = ?, 
        transmision = ?, 
        kilometraje = ?, 
        combustible = ?, 
        puertas = ?, 
        asientos = ?, 
        condicion = ?, 
        garantia = ?, 
        ubicacion = ?, 
        destacado = ?
      WHERE vehiculo_id = ?`,
      [
        nombre,
        precio,
        categoria,
        stock,
        marca_id,
        descripcion,
        imagen,
        modelo,
        color,
        motor,
        transmision,
        kilometraje,
        combustible,
        puertas,
        asientos,
        condicion,
        garantia,
        ubicacion,
        destacado || false,
        id,
      ]
    );

    res.json({ message: "Vehículo actualizado correctamente" });
  } catch (error) {
    console.error("Error en actualizar vehículo:", error);
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

// ==================== RESEÑAS ====================

// Obtener todas las reseñas
export const getResenas = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT r.reseña_id, r.comentario, r.calificacion, r.fecha,
             u.nombre AS nombre_usuario, v.nombre AS nombre_vehiculo
      FROM Reseñas r
      JOIN Usuarios u ON r.usuario_id = u.usuario_id
      JOIN Vehiculos v ON r.vehiculo_id = v.vehiculo_id
      ORDER BY r.fecha DESC
    `);
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener reseñas:", error);
    res.status(500).json({ error: "Error al obtener las reseñas" });
  }
};

// Eliminar una reseña
export const deleteResena = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query("DELETE FROM Reseñas WHERE reseña_id = ?", [
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Reseña no encontrada" });
    }

    res.json({ message: "Reseña eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar reseña:", error);
    res.status(500).json({ error: "Error al eliminar la reseña" });
  }
};
