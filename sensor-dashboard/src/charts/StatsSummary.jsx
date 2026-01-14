import React from 'react';
import styled from 'styled-components';

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
  text-align: center;
`;

const StatCard = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  border-left: 5px solid ${props => props.$color || '#333'};
`;

const Value = styled.div`
  font-size: 2em;
  font-weight: bold;
  color: ${props => props.$color || '#333'};
`;

const Label = styled.div`
  font-size: 1em;
  color: #666;
  margin-top: 5px;
`;

// Valores de ejemplo. 
const dummyStats = {
    avgTemp: 26.3,
    maxTemp: 28.5,
    minTemp: 24.5,
    avgHum: 65.0,
};

const StatsSummary = ({ stats = dummyStats }) => (
    <>
        <h2 style={{ textAlign: 'center', color: '#333' }}>📈 Resumen de Estadísticas (Últimas 24h)</h2>
        <StatsGrid>
            <StatCard $color="#d9534f">
                <Value $color="#d9534f">{stats.avgTemp.toFixed(1)}°C</Value>
                <Label>Temperatura Promedio</Label>
            </StatCard>
            <StatCard $color="#d9534f">
                <Value $color="#d9534f">{stats.maxTemp.toFixed(1)}°C</Value>
                <Label>Temperatura Máxima</Label>
            </StatCard>
            <StatCard $color="#5bc0de">
                <Value $color="#5bc0de">{stats.avgHum.toFixed(1)}%</Value>
                <Label>Humedad Promedio</Label>
            </StatCard>
            <StatCard $color="#5bc0de">
                <Value $color="#5bc0de">{stats.minTemp.toFixed(1)}%</Value>
                <Label>Temperatura Mínima</Label>
            </StatCard>
        </StatsGrid>
    </>
);

export default StatsSummary;