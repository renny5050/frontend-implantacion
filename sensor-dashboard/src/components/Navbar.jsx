import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavContainer = styled.nav`
  background-color: #333;
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 8px 15px;
  margin: 0 10px;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #555;
  }
`;

const Navbar = () => {
  return (
    <NavContainer>
      <NavLink to="/">🏠 Inicio (Dashboard)</NavLink>
      <NavLink to="/analisis">📊 Análisis y Gráficos</NavLink>
      <NavLink to="/info">📚 Calidad del Aire Info</NavLink>
    </NavContainer>
  );
};

export default Navbar;