import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomeDashboard from './components/HomeDashboard'; // El dashboard renombrado
import AnalyticsPage from './pages/AnalyticsPage'; 
import InfoPage from './pages/InfoPage'; 

function App() {
  return (
    <>
      <Navbar /> {/* Barra de navegación global */}
      
      {/* Contenedor principal para las rutas */}
      <div style={{ padding: '20px' }}> 
        <Routes>
          {/* Ruta principal - Muestra el Dashboard */}
          <Route path="/" element={<HomeDashboard />} /> 
          
          {/* Nueva ruta para gráficos y estadísticas */}
          <Route path="/analisis" element={<AnalyticsPage />} /> 
          
          {/* Nueva ruta para información didáctica */}
          <Route path="/info" element={<InfoPage />} /> 
        </Routes>
      </div>
    </>
  );
}

export default App;