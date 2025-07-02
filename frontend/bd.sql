-- Crear la base de datos
CREATE DATABASE automundoDB;
USE automundoDB;

-- Tabla Usuarios
CREATE TABLE Usuarios (
    usuario_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    telefono VARCHAR(20) NOT NULL UNIQUE,
    contraseña VARCHAR(255) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    rol ENUM('cliente', 'admin') DEFAULT 'cliente'
);

-- Tabla Proveedores
CREATE TABLE Proveedores (
    proveedor_id INT AUTO_INCREMENT PRIMARY KEY,
    razon_social VARCHAR(150) NOT NULL,
    ruc VARCHAR(20) NOT NULL UNIQUE,
    correo VARCHAR(100) NOT NULL UNIQUE,
    telefono VARCHAR(20)
);

-- Tabla Marcas
CREATE TABLE Marcas (
    marca_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE
);

-- Tabla Vehículos (con todos los campos integrados directamente)
CREATE TABLE Vehiculos (
    vehiculo_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    categoria ENUM('camioneta','deportivo','electrico') NOT NULL DEFAULT 'camioneta',
    stock INT NOT NULL DEFAULT 0,
    marca_id INT NOT NULL,
    descripcion TEXT,
    imagen VARCHAR(255),
    modelo VARCHAR(50),
    color VARCHAR(30),
    motor VARCHAR(50),
    transmision VARCHAR(20),
    kilometraje INT,
    combustible VARCHAR(20),
    puertas INT,
    asientos INT,
    condicion VARCHAR(30),
    garantia VARCHAR(100),
    ubicacion VARCHAR(100),
    destacado BOOLEAN DEFAULT FALSE,
    slug VARCHAR(255) UNIQUE,
    FOREIGN KEY (marca_id) REFERENCES Marcas(marca_id) ON DELETE RESTRICT
);

-- Tabla Pedidos
CREATE TABLE Pedidos (
    pedido_id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    vehiculo_id INT NOT NULL,
    fecha_pedido DATETIME DEFAULT CURRENT_TIMESTAMP,
    estado ENUM('pendiente', 'confirmado', 'cancelado', 'entregado') DEFAULT 'pendiente',
    total DECIMAL(12,2) NOT NULL,
    comprobante_url VARCHAR(255),
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id) ON DELETE CASCADE,
    FOREIGN KEY (vehiculo_id) REFERENCES Vehiculos(vehiculo_id) ON DELETE RESTRICT
);

-- Tabla Detalle_Pedidos
CREATE TABLE Detalle_Pedidos (
    detalle_id INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT NOT NULL,
    vehiculo_id INT NOT NULL,
    cantidad INT NOT NULL DEFAULT 1,
    precio_unitario DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (pedido_id) REFERENCES Pedidos(pedido_id) ON DELETE CASCADE,
    FOREIGN KEY (vehiculo_id) REFERENCES Vehiculos(vehiculo_id) ON DELETE RESTRICT
);

-- Tabla Requerimientos_Reposicion
CREATE TABLE Requerimientos_Reposicion (
    requerimiento_id INT AUTO_INCREMENT PRIMARY KEY,
    vehiculo_id INT NOT NULL,
    cantidad_solicitada INT NOT NULL,
    fecha_requerimiento DATETIME DEFAULT CURRENT_TIMESTAMP,
    estado ENUM('pendiente', 'procesado', 'cancelado') DEFAULT 'pendiente',
    FOREIGN KEY (vehiculo_id) REFERENCES Vehiculos(vehiculo_id) ON DELETE CASCADE
);

-- Tabla Compras_Proveedores
CREATE TABLE Compras_Proveedores (
    compra_id INT AUTO_INCREMENT PRIMARY KEY,
    proveedor_id INT NOT NULL,
    fecha_compra DATETIME DEFAULT CURRENT_TIMESTAMP,
    total_compra DECIMAL(12,2) NOT NULL,
    FOREIGN KEY (proveedor_id) REFERENCES Proveedores(proveedor_id) ON DELETE CASCADE
);

-- Tabla Detalle_Compras

-- Tabla Reportes_Ventas
CREATE TABLE Reportes_Ventas (
    reporte_id INT AUTO_INCREMENT PRIMARY KEY,
    fecha_generacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    filtro_fecha_inicio DATE,
    filtro_fecha_fin DATE,
    filtro_usuario INT,
    filtro_marca INT,
    formato_exportacion ENUM('PDF', 'Excel') DEFAULT 'PDF',
    FOREIGN KEY (filtro_usuario) REFERENCES Usuarios(usuario_id),
    FOREIGN KEY (filtro_marca) REFERENCES Marcas(marca_id)
);

-- Tabla Reseñas
CREATE TABLE Reseñas (
    reseña_id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    vehiculo_id INT NOT NULL,
    comentario TEXT NOT NULL,
    calificacion INT CHECK (calificacion BETWEEN 1 AND 5),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id),
    FOREIGN KEY (vehiculo_id) REFERENCES Vehiculos(vehiculo_id)
);



-- Insert into marcas
INSERT INTO Marcas (nombre)
VALUES('Mercedes-Benz');
INSERT INTO Marcas (nombre)
VALUES('Tesla');
INSERT INTO Marcas (nombre)
VALUES('BMW');
INSERT INTO Marcas (nombre)
VALUES('Toyota');

SHOW TABLES FROM automundoDB;


INSERT INTO Usuarios (nombre, correo, contraseña, telefono, rol, fecha_registro)
VALUES (
  'Admin General',
  'admin@mail.com',
  '$2b$10$pjwrKRdaywItULnKrQ1deeQWHiHJ2kMOGRp0VdZHZbaD.SGgef0QS',
  '999999999',
  'admin',
  NOW()
);

SELECT contraseña FROM Usuarios WHERE correo = 'admin@mail.com';

SELECT LENGTH(contraseña) FROM Usuarios WHERE correo = 'admin@mail.com';

SELECT HEX(contraseña) FROM Usuarios WHERE correo = 'admin@mail.com';



DELETE  FROM vehiculos WHERE vehiculo_id = 4;

SELECT slug FROM Vehiculos WHERE nombre = 'Cybertruck';

SELECT v.*, m.nombre AS nombre_marca
FROM Vehiculos v
JOIN Marcas m ON v.marca_id = m.marca_id
WHERE v.slug = 'toyota';

SELECT slug FROM Vehiculos;

SELECT * FROM usuarios;
SELECT * FROM vehiculos;
SELECT * FROM marcas;
SELECT * FROM proveedores;
SELECT * FROM reseñas;

show tables;



SELECT * FROM vehiculos WHERE id = 1;


drop database automundodb;

SELECT * FROM Pedidos ORDER BY fecha_pedido DESC;

SELECT p.pedido_id, p.fecha_pedido, p.estado, p.total, v.nombre AS vehiculo
FROM Pedidos p
JOIN Vehiculos v ON v.vehiculo_id = p.vehiculo_id
WHERE p.usuario_id = 10
ORDER BY p.fecha_pedido DESC;