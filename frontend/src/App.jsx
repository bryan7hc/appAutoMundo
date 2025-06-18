import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

import Hero from "./pages/Hero";
import Categories from "./pages/Categories";
import QuienesSomos from "./pages/QuienesSomos"; // ajusta la ruta si es distinta
import DetailVehicle from "./components/DetailVehicle/DetailVehicle";
import Compra from "./pages/Compra";
import HistorialPedido from "./components/Historial/HistorialPedidos"; // Asegúrate de que la ruta sea correcta
import Usuario from "./admin/pagesAdmin/Usuario";
import Vehiculo from "./admin/pagesAdmin/Vehiculo";
import Perfil from "./pages/Perfil";


function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas para usuario */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<Hero />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/vehiculo/:id" element={<DetailVehicle />} />
          <Route path="/quienes-somos" element={<QuienesSomos />} />
          <Route path="/compra" element={<Compra />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/historial" element={<HistorialPedido />} />
        </Route>

        {/* Rutas para administrador */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="usuarios" element={<Usuario />} />
          <Route path="vehiculos" element={<Vehiculo />} />
          

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
