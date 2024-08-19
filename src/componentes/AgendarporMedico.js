import React from 'react';
import './stile/agendarPorMedico.css';

const AgendarPorMedico = () => {
  return (
    <div className="agendar-por-medico-container">
      <a href="/Dash/AgendarCita" className="volver-link">&lt; Volver</a>
      <h2>Agendar por médico</h2>
      <div className="buscar-medico">
        <input
          type="text"
          placeholder="Ingresa el nombre del médico"
          className="input-buscar-medico"
        />
        <button className="btn-buscar-medico">
          <i className="fas fa-search"></i> {/* Icono de búsqueda */}
        </button>
      </div>
      <div className="medico-info">
        <img
          src="ruta-al-icono-medico.png" 
          alt="Médico"
          className="icono-medico"
        />
        <p>Aquí mostraremos a los médicos de tus últimas consultas en [Nombre de la Clínica]</p>
      </div>
    </div>
  );
};

export default AgendarPorMedico;
