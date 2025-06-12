import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./pages/Hero";
import Categories from "./pages/Categories"; // Importa tu componente Categorias
import Footer from "./components/Footer/Footer";
import DetailVehicle from "./components/DetailVehicle/DetailVehicle";
// import Login from "./components/Login/Login";
// import VehiculoDetalle from "./components/VehiculoDetalle";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Ruta principal */}
        <Route path="/" element={<Hero />} />
        {/* Ruta para las categorías */}
        <Route path="/categories" element={<Categories />} />
        <Route path="/vehiculo/:id" element={<DetailVehicle />} />
      </Routes>
    </Router>
  );
}

export default App;
