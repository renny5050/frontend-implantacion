import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// --- ESTILOS ---
const CenteredWrapper = styled.div`
  display: flex;
  justify-content: center; 
  align-items: flex-start;
  min-height: calc(100vh - 70px); 
  width: 100vw;
  padding: 40px 0;
  background-color: #f0f2f5; 
`;

const PageContainer = styled.div`
  padding: 30px;
  max-width: 1000px;
  width: 95%; 
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.08);
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin: 30px 0;
`;

const StatCard = styled.div`
  padding: 20px;
  background: #f8fafc;
  border-radius: 10px;
  text-align: center;
  border: 1px solid #e2e8f0;
  h4 { margin: 0; color: #64748b; font-size: 0.75rem; text-transform: uppercase; }
  p { margin: 10px 0 0; font-size: 1.8rem; font-weight: bold; color: #1e293b; }
`;

// --- COMPONENTE DE GRÁFICO MANUAL CON EJES ---
const ManualGraph = ({ data, dataKey, color, height = 250, maxVal = 100, unit = "" }) => {
  if (!data || data.length < 2) return <p style={{ color: '#999' }}>Esperando datos...</p>;

  const width = 850;
  const paddingLeft = 50;  // Espacio para los números del eje Y
  const paddingBottom = 40; // Espacio para las horas del eje X
  const paddingTop = 20;
  const paddingRight = 20;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  // 1. Generar puntos para la línea
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * chartWidth + paddingLeft;
    const val = d[dataKey] || 0;
    const y = chartHeight - ((val / maxVal) * chartHeight) + paddingTop;
    return `${x},${y}`;
  }).join(' ');

  // 2. Generar marcas del eje Y (5 niveles)
  const yLevels = [0, 0.25, 0.5, 0.75, 1];

  // 3. Generar marcas del eje X (Tiempo) - Mostramos 5 etiquetas
  const xLabelIndices = [0, Math.floor(data.length * 0.25), Math.floor(data.length * 0.5), Math.floor(data.length * 0.75), data.length - 1];

  return (
    <div style={{ width: '100%', overflowX: 'auto', background: '#fff', padding: '15px', borderRadius: '12px', border: '1px solid #eee' }}>
      <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
        
        {/* Líneas de Guía Horizontales y Eje Y */}
        {yLevels.map((lvl, idx) => {
          const yPos = chartHeight - (lvl * chartHeight) + paddingTop;
          const labelVal = (lvl * maxVal).toFixed(0);
          return (
            <g key={idx}>
              <line x1={paddingLeft} y1={yPos} x2={width - paddingRight} y2={yPos} stroke="#f0f0f0" strokeWidth="1" />
              <text x={paddingLeft - 10} y={yPos + 4} textAnchor="end" fontSize="12" fill="#999">{labelVal}{unit}</text>
            </g>
          );
        })}

        {/* Marcas de Tiempo en Eje X */}
        {xLabelIndices.map((dataIdx, idx) => {
          const d = data[dataIdx];
          if (!d) return null;
          const xPos = (dataIdx / (data.length - 1)) * chartWidth + paddingLeft;
          const timeStr = new Date(d.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          return (
            <g key={idx}>
              <line x1={xPos} y1={chartHeight + paddingTop} x2={xPos} y2={chartHeight + paddingTop + 5} stroke="#ccc" />
              <text x={xPos} y={chartHeight + paddingTop + 20} textAnchor="middle" fontSize="11" fill="#999">{timeStr}</text>
            </g>
          );
        })}

        {/* Ejes principales */}
        <line x1={paddingLeft} y1={paddingTop} x2={paddingLeft} y2={chartHeight + paddingTop} stroke="#ccc" strokeWidth="1" />
        <line x1={paddingLeft} y1={chartHeight + paddingTop} x2={width - paddingRight} y2={chartHeight + paddingTop} stroke="#ccc" strokeWidth="1" />
        
        {/* Línea del Gráfico */}
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />
      </svg>
    </div>
  );
};

const AnalyticsPage = () => {
  const [readings, setReadings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://backend-implantacion-1.onrender.com/api/readings/all')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const now = new Date();
          const fortyEightHoursAgo = new Date(now.getTime() - (48 * 60 * 60 * 1000));
          const filteredData = data.filter(r => new Date(r.createdAt) >= fortyEightHoursAgo);
          setReadings(filteredData.reverse());
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, []);

  const getStats = () => {
    if (readings.length === 0) return { avgT: 0, maxT: 0, avgH: 0, avgA: 0 };
    const count = readings.length;
    const avgT = readings.reduce((sum, r) => sum + r.temperature, 0) / count;
    const maxT = Math.max(...readings.map(r => r.temperature));
    const avgH = readings.reduce((sum, r) => sum + r.humidity, 0) / count;
    const avgA = readings.reduce((sum, r) => sum + r.airQuality, 0) / count;
    return { avgT: avgT.toFixed(1), maxT: maxT.toFixed(1), avgH: avgH.toFixed(1), avgA: avgA.toFixed(0) };
  };

  const stats = getStats();

  if (loading) return <CenteredWrapper><h2>Sincronizando datos de sensores...</h2></CenteredWrapper>;

  return (
    <CenteredWrapper>
      <PageContainer>
        <h1 style={{ textAlign: 'center', color: '#1a202c', marginBottom: '10px' }}>📊 Histórico de 48 Horas</h1>
        <p style={{ textAlign: 'center', color: '#718096', marginBottom: '40px' }}>Análisis detallado con marcas de tiempo y valores reales</p>

        <StatsGrid>
          <StatCard><h4>Temperatura Media</h4><p>{stats.avgT}°C</p></StatCard>
          <StatCard><h4>Pico Máximo</h4><p>{stats.maxT}°C</p></StatCard>
          <StatCard><h4>Humedad Promedio</h4><p>{stats.avgH}%</p></StatCard>
          <StatCard><h4>Calidad Aire</h4><p>{stats.avgA}</p></StatCard>
        </StatsGrid>

        <hr style={{ border: '0', borderTop: '1px solid #edf2f7', margin: '40px 0' }} />

        <h3 style={{ color: '#e53e3e', fontSize: '1.2rem', marginBottom: '15px' }}>🌡️ Variación de Temperatura</h3>
        <ManualGraph data={readings} dataKey="temperature" color="#e53e3e" maxVal={50} unit="°C" />

        <div style={{ margin: '50px 0' }} />

        <h3 style={{ color: '#3182ce', fontSize: '1.2rem', marginBottom: '15px' }}>💧 Registro de Humedad</h3>
        <ManualGraph data={readings} dataKey="humidity" color="#3182ce" maxVal={100} unit="%" />

        <div style={{ margin: '50px 0' }} />

        <h3 style={{ color: '#38a169', fontSize: '1.2rem', marginBottom: '15px' }}>💨 Concentración de Gases</h3>
        <ManualGraph data={readings} dataKey="airQuality" color="#38a169" maxVal={1024} unit="" />

      </PageContainer>
    </CenteredWrapper>
  );
};

export default AnalyticsPage;