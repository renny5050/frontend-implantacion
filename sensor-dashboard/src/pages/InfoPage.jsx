import React from 'react';
import styled from 'styled-components';

const CenteredWrapper = styled.div`
  display: flex;
  justify-content: center; 
  padding: 50px 20px;
  min-height: calc(100vh - 70px); 
  background-color: #f0f2f5; 
`;

const InfoContainer = styled.div`
  max-width: 950px;
  background-color: #ffffff;
  padding: 50px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  color: #2d3748;
`;

const MainTitle = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 10px;
  color: #1a202c;
`;

const Subtitle = styled.p`
  text-align: center;
  color: #718096;
  font-size: 1.1rem;
  margin-bottom: 40px;
`;

const Section = styled.section`
  margin-bottom: 50px;
`;

const SectionTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.8rem;
  color: #2b6cb0;
  border-bottom: 2px solid #ebf8ff;
  padding-bottom: 10px;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 1.05rem;
  line-height: 1.8;
  margin-bottom: 20px;
  color: #4a5568;
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  margin: 25px 0;
`;

const DetailedTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 18px;
    border: 1px solid #edf2f7;
    text-align: left;
  }
  
  th {
    background-color: #2b6cb0;
    color: white;
    font-weight: 600;
  }

  tr:nth-child(even) { background-color: #f7fafc; }

  .status-label {
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: bold;
    text-transform: uppercase;
  }

  .ideal { background-color: #c6f6d5; color: #22543d; }
  .warning { background-color: #feebc8; color: #744210; }
  .danger { background-color: #fed7d7; color: #822727; }
`;

const InfoPage = () => {
    return (
        <CenteredWrapper>
            <InfoContainer>
                <MainTitle>Guía Científica de Salud Ambiental</MainTitle>
                <Subtitle>Entendiendo las métricas recolectadas por tu nodo ESP32</Subtitle>
                
                <hr style={{ opacity: 0.2, margin: '30px 0' }} />

                {/* --- TEMPERATURA --- */}
                <Section>
                    <SectionTitle>🌡️ Temperatura Ambiente (DHT11)</SectionTitle>
                    <Description>
                        La temperatura influye directamente en el metabolismo humano. El "Confort Térmico" no es solo una preferencia; es el estado en el que el cuerpo no necesita realizar esfuerzos biológicos para regular su calor interno.
                    </Description>
                    <TableWrapper>
                        <DetailedTable>
                            <thead>
                                <tr>
                                    <th>Rango (°C)</th>
                                    <th>Clasificación</th>
                                    <th>Impacto Fisiológico</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>18°C - 20°C</td>
                                    <td><span className="status-label warning">Fresco</span></td>
                                    <td>Ideal para actividad física moderada, pero puede causar rigidez muscular en reposo.</td>
                                </tr>
                                <tr>
                                    <td>21°C - 24°C</td>
                                    <td><span className="status-label ideal">Óptimo</span></td>
                                    <td>Rango de máxima productividad cognitiva y confort general.</td>
                                </tr>
                                <tr>
                                    <td>+26°C</td>
                                    <td><span className="status-label danger">Calor Crítico</span></td>
                                    <td>Aumenta la fatiga, reduce la concentración y puede causar estrés térmico.</td>
                                </tr>
                            </tbody>
                        </DetailedTable>
                    </TableWrapper>
                </Section>

                {/* --- HUMEDAD --- */}
                <Section>
                    <SectionTitle>💧 Humedad Relativa (H.R.)</SectionTitle>
                    <Description>
                        La humedad mide la cantidad de vapor de agua en el aire. Es el factor determinante para la supervivencia de virus y la integridad de las vías respiratorias.
                    </Description>
                    <TableWrapper>
                        <DetailedTable>
                            <thead>
                                <tr>
                                    <th>H.R. (%)</th>
                                    <th>Estado</th>
                                    <th>Consecuencias</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>&lt; 30%</td>
                                    <td><span className="status-label danger">Muy Seco</span></td>
                                    <td>Irritación de ojos, piel seca y mayor riesgo de contagio de virus respiratorios.</td>
                                </tr>
                                <tr>
                                    <td>30% - 55%</td>
                                    <td><span className="status-label ideal">Saludable</span></td>
                                    <td>Ideal para humanos y mobiliario. Minimiza el crecimiento de bacterias.</td>
                                </tr>
                                <tr>
                                    <td>&gt; 60%</td>
                                    <td><span className="status-label warning">Excesivo</span></td>
                                    <td>Crecimiento de moho (hongos), ácaros del polvo y condensación estructural.</td>
                                </tr>
                            </tbody>
                        </DetailedTable>
                    </TableWrapper>
                </Section>

                {/* --- CALIDAD DEL AIRE --- */}
                <Section>
                    <SectionTitle>💨 Calidad del Aire y VOCs (MQ-135)</SectionTitle>
                    <Description>
                        El sensor MQ-135 detecta gases nocivos y compuestos orgánicos volátiles (VOCs). A diferencia de los otros sensores, este mide la "pureza" química del aire que respiras.
                    </Description>
                    <TableWrapper>
                        <DetailedTable>
                            <thead>
                                <tr>
                                    <th>Valor Analógico</th>
                                    <th>Calidad</th>
                                    <th>Gases Detectados</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>0 - 250</td>
                                    <td><span className="status-label ideal">Excelente</span></td>
                                    <td>Aire fresco de exterior o filtrado. Bajo nivel de CO2.</td>
                                </tr>
                                <tr>
                                    <td>251 - 500</td>
                                    <td><span className="status-label warning">Aceptable</span></td>
                                    <td>Aire viciado. Se requiere ventilación mecánica o natural pronto.</td>
                                </tr>
                                <tr>
                                    <td>+500</td>
                                    <td><span className="status-label danger">Mala / Tóxica</span></td>
                                    <td>Presencia de humos, amoníaco o niveles de CO2 que causan mareos.</td>
                                </tr>
                            </tbody>
                        </DetailedTable>
                    </TableWrapper>
                </Section>

                <div style={{ backgroundColor: '#ebf8ff', padding: '30px', borderRadius: '12px', borderLeft: '6px solid #2b6cb0' }}>
                    <h3 style={{ marginTop: 0, color: '#2c5282' }}>💡 Consejo Profesional</h3>
                    <p style={{ margin: 0 }}>
                        Si notas que la <strong>Calidad del Aire</strong> sube por encima de 400 de forma constante, incluso con ventanas abiertas, revisa posibles fuentes de contaminación como productos de limpieza fuertes, estufas mal selladas o falta de purificadores de aire con filtro HEPA.
                    </p>
                </div>
            </InfoContainer>
        </CenteredWrapper>
    );
};

export default InfoPage;