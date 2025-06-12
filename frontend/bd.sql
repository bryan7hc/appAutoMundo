CREATE DATABASE automundoDB;
USE automundoDB;

-- Tabla Usuarios (clientes, admins, proveedores en una sola tabla)
CREATE TABLE Usuarios (
    usuario_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
	telefono VARCHAR(20) NOT NULL UNIQUE,
    contraseña VARCHAR(255) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla Proveedores (se mantiene para información específica de empresas)
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

-- Tabla Vehículos
CREATE TABLE Vehiculos (
    vehiculo_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    categoria ENUM('camioneta','deportivo','electrico') NOT NULL DEFAULT 'camioneta',
    stock INT NOT NULL DEFAULT 0,
    marca_id INT NOT NULL,
    descripcion TEXT,
    imagen VARCHAR(255),
    FOREIGN KEY (marca_id) REFERENCES Marcas(marca_id) ON DELETE RESTRICT
);



-- Tabla Pedidos (ventas realizadas)
CREATE TABLE Pedidos (
    pedido_id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL, -- Ahora el pedido se asocia a Usuarios
    fecha_pedido DATETIME DEFAULT CURRENT_TIMESTAMP,
    estado ENUM('pendiente', 'confirmado', 'cancelado', 'entregado') DEFAULT 'pendiente',
    total DECIMAL(12,2) NOT NULL,
    comprobante_url VARCHAR(255),
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id) ON DELETE CASCADE
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

-- Tabla Requerimientos_Reposicion (para gestionar stock)
CREATE TABLE Requerimientos_Reposicion (
    requerimiento_id INT AUTO_INCREMENT PRIMARY KEY,
    vehiculo_id INT NOT NULL,
    cantidad_solicitada INT NOT NULL,
    fecha_requerimiento DATETIME DEFAULT CURRENT_TIMESTAMP,
    estado ENUM('pendiente', 'procesado', 'cancelado') DEFAULT 'pendiente',
    FOREIGN KEY (vehiculo_id) REFERENCES Vehiculos(vehiculo_id) ON DELETE CASCADE
);

-- Tabla Compras_Proveedores (gestión de compras a proveedores)
CREATE TABLE Compras_Proveedores (
    compra_id INT AUTO_INCREMENT PRIMARY KEY,
    proveedor_id INT NOT NULL,
    fecha_compra DATETIME DEFAULT CURRENT_TIMESTAMP,
    total_compra DECIMAL(12,2) NOT NULL,
    FOREIGN KEY (proveedor_id) REFERENCES Proveedores(proveedor_id) ON DELETE CASCADE
);

-- Tabla Detalle_Compras
CREATE TABLE Detalle_Compras (
    detalle_compra_id INT AUTO_INCREMENT PRIMARY KEY,
    compra_id INT NOT NULL,
    vehiculo_id INT NOT NULL,
    cantidad INT NOT NULL DEFAULT 1,
    precio_unitario DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (compra_id) REFERENCES Compras_Proveedores(compra_id) ON DELETE CASCADE,
    FOREIGN KEY (vehiculo_id) REFERENCES Vehiculos(vehiculo_id) ON DELETE RESTRICT
);

-- Tabla Reportes_Ventas (registro de generación de reportes)
CREATE TABLE Reportes_Ventas (
    reporte_id INT AUTO_INCREMENT PRIMARY KEY,
    fecha_generacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    filtro_fecha_inicio DATE,
    filtro_fecha_fin DATE,
    filtro_usuario INT, -- Antes era filtro_cliente
    filtro_marca INT,
    formato_exportacion ENUM('PDF', 'Excel') DEFAULT 'PDF',
    FOREIGN KEY (filtro_usuario) REFERENCES Usuarios(usuario_id),
    FOREIGN KEY (filtro_marca) REFERENCES Marcas(marca_id)
);
INSERT INTO Marcas (nombre)
VALUES('Alfa Romeo');
INSERT INTO Marcas (nombre)
VALUES('Mercedes-Benz');
INSERT INTO Marcas (nombre)
VALUES('Tesla');


-- Insert into vehiculos
INSERT INTO Vehiculos (nombre, precio, categoria, stock, marca_id, descripcion, imagen)
VALUES (
  'Alfa Romeo Stelvio',
  35000.00,
  'camioneta',
  5,
  1, -- Suponiendo que ya existe una marca con marca_id = 1
  'Camioneta todo terreno con excelente rendimiento.',
  'AlfaRomeoStelvio.png'
);
INSERT INTO Vehiculos (nombre, precio, categoria, stock, marca_id, descripcion, imagen)
VALUES (
  'Mercedes-Benz AMG GT 63',
  250000.00,
  'deportivo',
  2,
  2,
  'Vehículo deportivo de alto rendimiento y diseño aerodinámico.',
  'MercedesBenzAmgGt63.png'
);
INSERT INTO Vehiculos (nombre, precio, categoria, stock, marca_id, descripcion, imagen)
VALUES (
  'Tesla Model S',
  95000.00,
  'electrico',
  10,
  3, -- Asegúrate de que exista una marca con ID 3, o ajústalo al que tengas
  'Vehículo eléctrico con gran autonomía y tecnología avanzada.',
  'Cybertruck.png'
);




SELECT * FROM usuarios;
SELECT * FROM vehiculos;

show tables;

SELECT * FROM vehiculos WHERE id = 1;


drop database automundodb;


