// componentes/AgendarPorEspecialidad.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './stile/agendarPorEspecialidad.css'; 

const AgendarPorEspecialidad = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // Hook para redireccionar

  const especialidades = [
    'Psiquiatría',
    'Neurología',
    'Pediatría Psicológica',
    'Psicología de la Salud',
    'Psicología Forense',
    'Psicología del Trabajo y las Organizaciones',
    'Psicología Geriátrica',
    'Psicología del Deporte',
    'Psicología Educativa',
    'Psicología Comunitaria',
  ];

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredEspecialidades = especialidades.filter(especialidad =>
    especialidad.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEspecialidadClick = (especialidad) => {
    // Redirigir a la vista ConfigurarCita con la especialidad seleccionada
    navigate('/Dash/ConfigurarCita', { state: { especialidadSeleccionada: especialidad } });
  };

  return (
    <div className="agendar-especialidad-container">
      <button className="volver-btn" onClick={() => window.history.back()}>Volver</button>
      <h2>Agendar por especialidad</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Ingresa la especialidad"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      <div className="especialidades-list">
        {filteredEspecialidades.map((especialidad, index) => (
          <div key={index} className="especialidad-item">
            <button className="especialidad-btn" onClick={() => handleEspecialidadClick(especialidad)}>{especialidad}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgendarPorEspecialidad;
