import React from 'react';
import styled from 'styled-components';
import LineChartHistory from '../charts/LineChartHistory';
import StatsSummary from '../charts/StatsSummary';

// --- NUEVO CenteredWrapper para centrado vertical y horizontal ---
const CenteredWrapper = styled.div`
  display: flex;
  /* Centrado horizontal */
  justify-content: center; 
  /* Centrado vertical (Alinea los elementos en el centro del viewport restante) */
  align-items: center; 
  /* La altura mínima asegura que el wrapper ocupe todo el espacio disponible */
  min-height: calc(100vh - 70px); /* Restamos la altura de la Navbar */
  width: 100vw;
  margin: 0;
  padding: 0;
  background-color: #e9e9e9; /* Fondo similar al dashboard */
`;
// -----------------------------------------------------------------


// El contenedor principal de la página de análisis
const PageContainer = styled.div`
  padding: 20px;
  /* Eliminamos margin: auto, ya que flexbox hace el centrado */
  max-width: 1200px;
  /* Ajustamos el ancho para que no se vea demasiado ancho en pantallas grandes */
  width: 90%; 
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const AnalyticsPage = () => {
  return (
    <CenteredWrapper>
        <PageContainer>
            <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>📊 Análisis Histórico de Sensores</h1>
            
            <StatsSummary />
            
            <hr style={{ margin: '40px 0' }} />

            <LineChartHistory title="Tendencia Reciente de Temperatura y Humedad" />
            
            {/* Podrías añadir más gráficos aquí: gráficos de barras, pie, etc. */}
            
        </PageContainer>
    </CenteredWrapper>
  );
};

export default AnalyticsPage;