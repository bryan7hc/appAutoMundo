import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

import Hero from "./pages/Hero";
import Categories from "./pages/Categories";
import DetailVehicle from "./components/DetailVehicle/DetailVehicle";

//import AdminDashboard from "./pages/admin/AdminDashboard"; // ejemplo
//import AdminVehiculos from "./pages/admin/Vehiculos"; // ejemplo

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas para usuario */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<Hero />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/vehiculo/:id" element={<DetailVehicle />} />
        </Route>

        {/* Rutas para administrador */}
        
      </Routes>
    </Router>
  );
}

export default App;
