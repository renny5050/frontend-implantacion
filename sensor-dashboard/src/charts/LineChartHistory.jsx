import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';

const ChartWrapper = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  margin-top: 20px;
  text-align: center;
`;

// Datos de ejemplo
const dummyData = [
    { time: '08:00', Temp: 24.5, Hum: 60 },
    { time: '09:00', Temp: 25.1, Hum: 62 },
    { time: '10:00', Temp: 26.0, Hum: 65 },
    { time: '11:00', Temp: 27.2, Hum: 68 },
    { time: '12:00', Temp: 28.5, Hum: 70 },
];

const LineChartHistory = ({ data = dummyData, title = "Tendencia" }) => (
    <ChartWrapper>
        <h3>{title}</h3>
        <div style={{ width: '100%', height: 350 }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis yAxisId="left" orientation="left" stroke="#d9534f" label={{ value: 'Temperatura (°C)', angle: -90, position: 'insideLeft' }} />
                    <YAxis yAxisId="right" orientation="right" stroke="#5bc0de" label={{ value: 'Humedad (%)', angle: 90, position: 'insideRight' }} />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="Temp" stroke="#d9534f" activeDot={{ r: 8 }} name="Temperatura (°C)" />
                    <Line yAxisId="right" type="monotone" dataKey="Hum" stroke="#5bc0de" name="Humedad (%)" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    </ChartWrapper>
);

export default LineChartHistory;