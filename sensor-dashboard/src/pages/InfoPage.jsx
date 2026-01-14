import React from 'react';
import styled from 'styled-components';

// --- NUEVO CenteredWrapper para centrado vertical y horizontal ---
const CenteredWrapper = styled.div`
  display: flex;
  /* Centrado horizontal */
  justify-content: center; 
  /* Centrado vertical */
  align-items: center; 
  /* Altura mínima para que ocupe todo el espacio disponible debajo del Navbar */
  min-height: calc(100vh - 70px); 
  width: 100vw;
  margin: 0;
  padding: 0;
  background-color: #e9e9e9; 
`;
// -----------------------------------------------------------------

const InfoContainer = styled.div`
  padding: 30px;
  max-width: 900px;
  /* Eliminamos margin: 20px auto; ya que el centrado lo hace el wrapper */
  margin: 20px; /* Un margen vertical simple para evitar que se pegue demasiado */
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  line-height: 1.6;
`;

const SectionTitle = styled.h2`
  color: #007bff;
  border-bottom: 2px solid #007bff;
  padding-bottom: 5px;
  margin-top: 30px;
  margin-bottom: 15px;
`;

const RangeTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
  
  th, td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: left;
  }
  
  th {
    background-color: #e9f5ff;
    color: #007bff;
    font-weight: bold;
  }
  
  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const InfoPage = () => {
    return (
        <CenteredWrapper> {/* 👈 Envolvemos el contenido */}
            <InfoContainer>
                <h1 style={{ textAlign: 'center', color: '#333' }}>📚 La Importancia de la Calidad del Aire Interior</h1>
                <p style={{ textAlign: 'center', color: '#666' }}>
                    Conoce los rangos ideales y por qué es vital monitorear la temperatura y la humedad.
                </p>
                <hr />

                <SectionTitle>🌡️ Rangos de Calidad del Aire Recomendados</SectionTitle>

                <p>
                    Los siguientes rangos se basan en recomendaciones generales (EPA, ASHRAE) para asegurar el **confort térmico**, prevenir la **proliferación de patógenos** y garantizar la **salud respiratoria** en ambientes interiores:
                </p>

                <RangeTable>
                    <thead>
                        <tr>
                            <th>Parámetro</th>
                            <th>Rango Ideal/Seguro</th>
                            <th>Riesgos Fuera de Rango</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>**Temperatura (Temp.)**</td>
                            <td>**20°C a 24°C** (68°F a 75°F)</td>
                            <td>
                                * **&lt; 20°C:** Malestar, reducción de la concentración.
                                * **&gt; 24°C:** Somnolencia, estrés por calor.
                            </td>
                        </tr>
                        <tr>
                            <td>**Humedad Relativa (H.R.)**</td>
                            <td>**30% a 50%**</td>
                            <td>
                                * **Baja (&lt;30%):** Piel seca, irritación de vías respiratorias y ojos.
                                * **Alta (&gt;50%):** Proliferación de moho, ácaros, bacterias y sensación de bochorno.
                            </td>
                        </tr>
                    </tbody>
                </RangeTable>
                
                

                <SectionTitle>¿Por Qué es Fundamental el Monitoreo?</SectionTitle>
                
                <p>
                    El monitoreo constante de estos parámetros en tu aplicación permite:
                </p>
                <ul>
                    <li>**Salud Preventiva:** Mantener la humedad por debajo del **60%** es la principal forma de prevenir el crecimiento de moho.</li>
                    <li>**Productividad:** Un ambiente térmico confortable (dentro de los rangos ideales) maximiza la concentración y el rendimiento en el trabajo o estudio.</li>
                    <li>**Control de Sistemas:** Permite la automatización y el ajuste manual de sistemas de ventilación (**HVAC**) para optimizar el consumo energético.</li>
                </ul>

            </InfoContainer>
        </CenteredWrapper>
    );
};

export default InfoPage;