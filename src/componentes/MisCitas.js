// componentes/MisCitas.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './stile/miCita.css';

const MisCitas = () => {
  const [citas, setCitas] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Fetch appointments from your API
    // For example:
    // fetch('/api/citas')
    //   .then(response => response.json())
    //   .then(data => setCitas(data))

    // Simulated data for example
    const fetchedCitas = [
      {
        id: 1,
        fecha: '2024-08-26',
        hora: '10:00 AM',
        tipo: 'Presencial',
        especialidad: 'Psicología',
        medico: 'Dr. Jorge Arturo Aguilar Segura',
        sede: 'Delgado - Lima',
        estado: 'Agendada',
      },
      // More appointments...
    ];
    setCitas(fetchedCitas);
  }, []);

  const handleAgendarCita = () => {
    navigate('/Dash/AgendarCita');
  };

  const handleEliminarCita = (id) => {
    // Logic to delete the appointment (for example, making a DELETE request to the API)
    const updatedCitas = citas.filter(cita => cita.id !== id);
    setCitas(updatedCitas);
  };

  return (
    <div className="mis-citas-container">
      <h2>Próximas citas</h2>
      <h3>Ver citas del paciente:</h3>
      <select>
        <option>Maria Milagros Llauce Cajusol</option>
        {/* Add more patients if needed */}
      </select>
      <p>Solo se mostrarán las citas agendadas por ti</p>

      {citas.length === 0 ? (
        <div className="no-citas">
          <h4>Todavía no tienes citas.</h4>
          <p>¿Te gustaría agendar una?</p>
          <button className='mi-cita' onClick={handleAgendarCita}>Agendar una cita</button>
        </div>
      ) : (
        <table className="tabla-citas">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Tipo</th>
              <th>Especialidad</th>
              <th>Médico</th>
              <th>Sede</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {citas.map((cita, index) => (
              <tr key={index}>
                <td>{cita.fecha}</td>
                <td>{cita.hora}</td>
                <td>{cita.tipo}</td>
                <td>{cita.especialidad}</td>
                <td>{cita.medico}</td>
                <td>{cita.sede}</td>
                <td>{cita.estado}</td>
                <td>
                  <button 
                    className="eliminar-cita-btn" 
                    onClick={() => handleEliminarCita(cita.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MisCitas;
