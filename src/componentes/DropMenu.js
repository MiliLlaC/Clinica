// componentes/DropdownMenu.js
import React from 'react';
import { Link } from 'react-router-dom';
import './stile/DropMenu.css'; // Asegúrate de crear este archivo CSS

const DropdownMenu = ({ onLogout }) => {
  return (
    <div className="dropdown-menu">
      <ul>
        <li><Link to="Perfil">Perfil</Link></li>
        <li><Link to="Inicio">Configuración</Link></li>
        <li><Link to="/" onClick={onLogout}>Cerrar Sesión</Link></li>
      </ul>
    </div>
  );
};

export default DropdownMenu;
