import express from "express";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import vehiculosRoutes from "./routes/vehiculosRoutes.js";
import pedidosRoutes from "./routes/pedidosRoutes.js";
import adminRoutes from "./routes/adminRoute.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;
// Necesario para usar __dirname con ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//MIDDLEWARE
app.use(cors());
app.use(express.json());

//RUTAS
app.use("/api/auth", authRoute);

// Ruta base
app.use("/api/usuarios", userRoute);

//CATEGORIAS DE VEHICULOS
app.use("/api/vehiculos", vehiculosRoutes);

//Admin
app.use("/api/admin", adminRoutes); //

// Pedido 
app.use("/api/pedidos", pedidosRoutes);

//Comprobantes
app.use(
  "/comprobantes",
  express.static(path.join(__dirname, "src/public/comprobantes"))
);

//Accesible la carpeta desde el naveador
app.use(express.static(path.join(__dirname, "public")));

//INICIAR SERVIDOR
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
