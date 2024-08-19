// componentes/AgendarPorEspecialidad.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './stile/agendarPorServicio.css'; 

const AgendarPorServicio = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // Hook para redireccionar

  const especialidades = [
    'Atención Psicológica',
    'Capacitaciones o talleres para pesonal',
    'Capacitaciones o talleres para padres de familia',    
    'Coaching personal neurolinguistico',
    'Coaching personal ejecutivo',
    'Consultoria organizacional',
    'Estimulación temprana',
    'Evaluación Psicológica',
    'Intervención de psicoterapia',
    'Talleres psicoterapéuticos para niños',
    'Talleres psicoterapéuticos para adolescentes',
    'Talleres psicoterapéuticos para adultos',
    'Terapia Ocupacional',
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
        {filteredEspecialidades.map((especialidad, index) => (
          <div key={index} className="especialidad-item">
            <button className="especialidad-btn" onClick={() => handleEspecialidadClick(especialidad)}>{especialidad}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgendarPorServicio;
