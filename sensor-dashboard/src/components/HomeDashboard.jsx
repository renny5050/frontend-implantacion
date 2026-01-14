import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

// --- Styled Components ---

const CenteredWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 70px);
  width: 100vw;
  background-color: #e9e9e9;
`;

const DashboardContainer = styled.div`
  max-width: 900px;
  width: 95%;
  padding: 20px;
  border-radius: 12px;
  background-color: #f9f9f9;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-align: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
`;

const LastReadingBar = styled.div`
  background-color: #e0e0e0;
  border-radius: 6px;
  height: 35px;
  margin-bottom: 20px;
  overflow: hidden;
  position: relative;
`;

const ProgressBar = styled.div.attrs(props => ({
    style: {
        width: `${props.$percentage}%`,
        backgroundColor: props.$color,
    },
}))`
    height: 100%;
    transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.5s ease;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 15px;
    color: white;
    font-weight: bold;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
`;

const Title = styled.h2`
  color: #2c3e50;
  border-bottom: 3px solid #5cb85c;
  padding-bottom: 10px;
  margin-bottom: 20px;
`;

const HistoryGrid = styled.ul`
    list-style-type: none;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); 
    gap: 15px;
`;

const ReadingCard = styled.li`
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  
  .time { font-weight: bold; border-bottom: 1px solid #f0f0f0; margin-bottom: 10px; padding-bottom: 5px; }
  .temp { color: #d9534f; font-size: 1.1em; }
  .humidity { color: #5bc0de; font-size: 1.1em; }
  .air { color: #f0ad4e; font-size: 1.1em; font-weight: bold; }
`;

// --- Component ---

const HomeDashboard = () => {
    const [readings, setReadings] = useState([]);
    const [status, setStatus] = useState('Conectando...');

    // Replace with your Server IP if testing on a mobile device
    const API_BASE_URL = 'http://localhost:5001'; 
    
    const calculatePercentage = (value, min, max) => {
        return Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
    };

    // Helper to determine Air Quality Color based on common MQ-135 thresholds
    const getAirQualityColor = (value) => {
        if (value < 400) return '#5cb85c'; // Good (Green)
        if (value < 800) return '#f0ad4e'; // Moderate (Yellow)
        return '#d9534f';                // Poor/Hazardous (Red)
    };

    const handleNewData = useCallback((event) => {
        try {
            const newReadings = JSON.parse(event.data);
            setReadings(prevReadings => {
                let updatedReadings = [...newReadings, ...prevReadings];
                return updatedReadings.slice(0, 10);
            });
            setStatus('Transmisión en Vivo Activa');
        } catch (error) {
            setStatus('Error de Datos');
        }
    }, []);

    useEffect(() => {
        const eventSource = new EventSource(`${API_BASE_URL}/api/readings/stream`);
        eventSource.onmessage = handleNewData;
        eventSource.onerror = () => {
            setStatus('Error de Conexión');
            eventSource.close();
        };
        return () => eventSource.close();
    }, [handleNewData]);

    const lastReading = readings[0];

    return (
        <CenteredWrapper>
            <DashboardContainer>
                <Title>📊 Dashboard de Sensores Ambientales</Title>
                <p>Estado: <strong>{status}</strong></p>
                <hr />

                {lastReading ? (
                    <>
                        <h3 style={{color: '#7f8c8d'}}>
                            Última Actualización: {new Date(lastReading.createdAt).toLocaleTimeString()}
                        </h3>
                        
                        {/* TEMPERATURE BAR */}
                        <div style={{ textAlign: 'left', margin: '10px 20px' }}>
                            <label>🌡️ Temperatura: {lastReading.temperature.toFixed(1)}°C</label>
                            <LastReadingBar>
                                <ProgressBar $percentage={calculatePercentage(lastReading.temperature, 0, 50)} $color="#d9534f">
                                    {lastReading.temperature.toFixed(1)}°C
                                </ProgressBar>
                            </LastReadingBar>
                        </div>

                        {/* HUMIDITY BAR */}
                        <div style={{ textAlign: 'left', margin: '10px 20px' }}>
                            <label>💧 Humedad: {lastReading.humidity.toFixed(1)}%</label>
                            <LastReadingBar>
                                <ProgressBar $percentage={lastReading.humidity} $color="#5bc0de">
                                    {lastReading.humidity.toFixed(1)}%
                                </ProgressBar>
                            </LastReadingBar>
                        </div>

                        {/* AIR QUALITY BAR (NEW) */}
                        <div style={{ textAlign: 'left', margin: '10px 20px' }}>
                            <label>☁️ Calidad de Aire (Gas): {lastReading.airQuality}</label>
                            <LastReadingBar>
                                <ProgressBar 
                                    $percentage={calculatePercentage(lastReading.airQuality, 0, 1024)} 
                                    $color={getAirQualityColor(lastReading.airQuality)}
                                >
                                    {lastReading.airQuality} Units
                                </ProgressBar>
                            </LastReadingBar>
                        </div>

                        <hr style={{margin: '30px 0'}} />
                        <h3>Historial de Lecturas</h3>
                        
                        <HistoryGrid>
                            {readings.map((reading, index) => (
                                <ReadingCard key={reading._id || index}>
                                    <div className="time">{new Date(reading.createdAt).toLocaleTimeString()}</div>
                                    <div className="temp">🌡️ {reading.temperature.toFixed(1)}°C</div>
                                    <div className="humidity">💧 {reading.humidity.toFixed(1)}%</div>
                                    <div className="air">☁️ Gas: {reading.airQuality || 'N/A'}</div>
                                </ReadingCard>
                            ))}
                        </HistoryGrid>
                    </>
                ) : (
                    <div style={{padding: '40px'}}>
                        <p>Cargando datos de sensores...</p>
                        <small>Asegúrate de que el ESP32 esté enviando datos a {API_BASE_URL}</small>
                    </div>
                )}
            </DashboardContainer>
        </CenteredWrapper>
    );
};

export default HomeDashboard;