// componentes/MisCitas.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './stile/miCita.css';

const MisCitas = () => {
  const [citas, setCitas] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    // hacer una llamada a tu API para obtener las citas del usuario
    // Por ejemplo:
    // fetch('/api/citas')
    //   .then(response => response.json())
    //   .then(data => setCitas(data))
    
    // Simulación de datos para ejemplo
    const fetchedCitas = []; // Cambia esto por la respuesta de API
    setCitas(fetchedCitas);
  }, []);

  const handleAgendarCita = () => {
    navigate('/Dash/AgendarCita'); // Navega a la ruta AgendarCita dentro de Dash
  };

  return (
    <div className="mis-citas-container">
      <h2>Próximas citas</h2>
      <h3>Ver citas del paciente:</h3>
      <select>
        <option>Maria Milagros Llauce Cajusol</option>
        {/* Agrega más pacientes si es necesario */}
      </select>
      <p>Solo se mostrarán las citas agendadas por ti</p>

      {citas.length === 0 ? (
        <div className="no-citas">
          <h4>Todavía no tienes citas.</h4>
          <p>¿Te gustaría agendar una?</p>
          <button className='mi-cita' onClick={handleAgendarCita}>Agendar una cita</button>
        </div>
      ) : (
        <ul className="lista-citas">
          {citas.map((cita, index) => (
            <li key={index}>
              <p><strong>Fecha:</strong> {cita.fecha}</p>
              <p><strong>Hora:</strong> {cita.hora}</p>
              <p><strong>Especialidad:</strong> {cita.especialidad}</p>
              <p><strong>Médico:</strong> {cita.medico}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MisCitas;
