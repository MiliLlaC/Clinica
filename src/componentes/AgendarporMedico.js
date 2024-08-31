import React from 'react';
import './stile/agendarPorMedico.css';
import psicologoimg from '../recursos/imagenes/psicologo.png'; // Imagen de inicio
import buscarimg from '../recursos/imagenes/buscar.png'; // Imagen de inicio


const AgendarPorMedico = () => {
  return (
    <div className="agendar-por-medico-container">
      {/*<a href="/Dash/AgendarCita" className="volver-link">&lt; Volver</a>*/}
      <button className="volver-btn" onClick={() => window.history.back()}>Volver</button>
      <h2>Agendar por Psicólogo</h2>
      <div className="buscar-medico">
        <input
          type="text"
          placeholder="Ingresa el nombre del psicólogo"
          className="input-buscar-medico"
        />
        <button className="btn-buscar-medico">
          <img
            src={buscarimg} 
            alt="buscar"
            className="buscar"
          />
        </button>
      </div>
      <div className="medico-info">
        <img
          src={psicologoimg} 
          alt="Psicologo"
          className="icono-psico"
        />
        <p>Aquí mostraremos a los Psicólogos de tus últimas consultas</p>
      </div>
    </div>
  );
};

export default AgendarPorMedico;
