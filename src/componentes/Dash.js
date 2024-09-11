import React, { useState } from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import './stile/dashboard.css';
import logo from '../recursos/imagenes/Logo_clin.jpg';
import iconhome from '../recursos/imagenes/home.png';
import iconperfil from '../recursos/imagenes/perfil.png';
import iconhist from '../recursos/imagenes/historial.png';
import iconcita from '../recursos/imagenes/cita.png';
import icontests from '../recursos/imagenes/test.png';
import iconresul from '../recursos/imagenes/resultado.png';
import iconfact from '../recursos/imagenes/factura.png';
import iconcont from '../recursos/imagenes/contacto.png';
import DropdownMenu from './DropMenu';

const Dashboard = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const user = localStorage.getItem("user_name");

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_name');
    navigate('/Login');
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const toggleSidebar = () => {
    if (window.innerWidth > 768) {
      setSidebarCollapsed(!sidebarCollapsed);
    } else {
      setSidebarOpen(!sidebarOpen);
    }
  };

  // Función para verificar si la ruta actual es la activa (usando includes para manejar rutas anidadas)
  const isActive = (path) => location.pathname.includes(path);

  return (
    <div className="dashboard-container">
      <div className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''} ${sidebarOpen ? 'open' : ''}`}>
        <div className="profile-info" onClick={toggleSidebar}>
          <img src={logo} alt="logo" />
          {!sidebarCollapsed && <h2>Montero & Co.</h2>}
        </div>
        <nav>
          <ul>
            <li className={isActive('/Inicio') ? 'active' : ''}>
              <Link to="Inicio"><img src={iconhome} alt="client" className="icon-nav" /> <span>Inicio</span></Link>
            </li>
            <li className={isActive('/Historia') ? 'active' : ''}>
              <Link to="Historia"><img src={iconhist} alt="client" className="icon-nav" /> <span>Historia Clínica</span></Link>
            </li>
            <li className={isActive('/Citas') ? 'active' : ''}>
              <Link to="Citas"><img src={iconcita} alt="client" className="icon-nav" /> <span>Mis citas</span></Link>
            </li>
            <li className={isActive('/Resultados') ? 'active' : ''}>
              <Link to="Resultados"><img src={iconresul} alt="client" className="icon-nav" /> <span>Resultados clínicos</span></Link>
            </li>
            <li className={isActive('/SelecTest') ? 'active' : ''}>
              <Link to="SelecTest"><img src={icontests} alt="client" className="icon-nav" /> <span>Test</span></Link>
            </li>
            <li className={isActive('/Facturacion') ? 'active' : ''}>
              <Link to="Facturacion"><img src={iconfact} alt="client" className="icon-nav" /> <span>Facturación</span></Link>
            </li>
            <li className={isActive('/Contactos') ? 'active' : ''}>
              <Link to="Contactos"><img src={iconcont} alt="client" className="icon-nav" /> <span>Contactos</span></Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="main-content">
        <div className="header">
          <div className="welcome-text">
            <button onClick={toggleDropdown} style={{ float: 'right' }}><img src={iconperfil} alt="client" className="icon-nav" /> <span>{user}</span></button>
          </div>
          {showDropdown && <DropdownMenu onLogout={handleLogout} />}
          <div className="burger-menu" onClick={toggleSidebar}>
            &#9776; {/* Icono de menú galleta */}
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
