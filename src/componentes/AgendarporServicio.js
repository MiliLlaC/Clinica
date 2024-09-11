// componentes/AgendarPorEspecialidad.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './stile/agendarPorServicio.css'; 

const AgendarPorServicio = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [servicios, setServicios] = useState([]);
  const navigate = useNavigate(); // Hook para redireccionar
  
  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const token = localStorage.getItem('access_token'); // Obtener el token de autenticación
        const response = await axios.get('http://127.0.0.1:8000/scheduling/appointment-reasons/', {
          headers: {
            'Authorization': `Bearer ${token}` // Incluir el token en la cabecera de autorización
          }
        });
        setServicios(response.data); // Guardar los datos en el estado
      } catch (error) {
        console.error('Error al obtener los servicios:', error);
      }
    };

    fetchServicios();
  }, []);


  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredServicios = servicios.filter(servicio =>
    servicio.reason.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleServicioClick = (servicio) => {
    // Redirigir a la vista ConfigurarCita con el servicio seleccionado
    navigate('/Dash/ConfigurarCita', { state: { servicioSeleccionado: servicio } });
  };

  return (
    <div className="agendar-especialidad-container">
      <button className="volver-btn" onClick={() => window.history.back()}>Volver</button>
      <h2>Agendar por servicio</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Ingresa el servicio"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      <div className="especialidades-list">
        {filteredServicios.map((servicio) => (
          <div key={servicio.id} className="especialidad-item">
            <button className="especialidad-btn" onClick={() => handleServicioClick(servicio)}>{servicio.reason}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgendarPorServicio;
