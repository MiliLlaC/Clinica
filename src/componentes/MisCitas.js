import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './stile/miCita.css';

const MisCitas = () => {
  const [citas, setCitas] = useState([]);
  const [mainPatient, setMainPatient] = useState(null); // Estado para el paciente principal y dependientes
  const [selectedPatient, setSelectedPatient] = useState(null); // Estado para el paciente seleccionado
  const navigate = useNavigate();
  
  useEffect(() => {
    // Función para obtener el paciente principal y sus dependientes
    const fetchPatients = async () => {
      const token = localStorage.getItem('access_token'); // Obtener el token del localStorage
      const userId = localStorage.getItem('user_id'); // Obtener el ID del usuario del localStorage

      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/patients/${userId}/`, {
          headers: {
            Authorization: `Bearer ${token}` // Incluir el token en la cabecera de autorización
          }
        });
        setMainPatient(response.data); // Almacenar el paciente principal y dependientes en el estado
        setSelectedPatient(response.data.id); // Establecer el paciente principal como seleccionado
      } catch (error) {
        console.error('Error al obtener los pacientes', error);
      }
    };

    fetchPatients();
  }, []);

  useEffect(() => {
    // Función para obtener las citas del paciente seleccionado
    const fetchCitas = async () => {
      if (!selectedPatient) return; // No hacer la solicitud si no hay paciente seleccionado

      const token = localStorage.getItem('access_token');
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/patients/${selectedPatient}/appointments/`, {
          headers: {
            Authorization: `Bearer ${token}` // Incluir el token en la cabecera de autorización
          },
        });
        setCitas(response.data); // Actualizar el estado con las citas del paciente
      } catch (error) {
        console.error('Error al obtener las citas:', error);
      }
    };

    fetchCitas();
  }, [selectedPatient]); // Ejecutar cuando cambie el paciente seleccionado

  const handleAgendarCita = () => {
    navigate('/Dash/AgendarCita');
  };

  const handleEliminarCita = (id) => {
    // Petición DELETE para cancelar la cita si es necesario
    const updatedCitas = citas.filter(cita => cita.id !== id);
    setCitas(updatedCitas);
  };

  const handlePatientChange = (e) => {
    setSelectedPatient(e.target.value); // Cambiar el paciente seleccionado
  };

  return (
    <div className="mis-citas-container">
      <h2>Próximas citas</h2>
      <h3>Ver citas del paciente:</h3>

      {/* Selector para el paciente principal y sus dependientes */}
      <select id="paciente" className="paciente-select" onChange={handlePatientChange} value={selectedPatient}>
        {mainPatient && (
          <>
            {/* Opción para el paciente principal */}
            <option className='mas-pacientes' value={mainPatient.id}>
              {mainPatient.first_name} {mainPatient.last_name}
            </option>
            
            {/* Opciones para los dependientes del paciente principal */}
            {mainPatient.dependents && mainPatient.dependents.map(dependent => (
              <option key={dependent.id} value={dependent.id}>
                {dependent.first_name} {dependent.last_name}
              </option>
            ))}
          </>
        )}
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
              <th>Hora de inicio</th>
              <th>Hora de fin</th>
              <th>Tipo</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {citas.map((cita) => (
              <tr key={cita.id}>
                <td>{cita.date}</td>
                <td>{cita.start_time}</td>
                <td>{cita.end_time}</td>
                <td>{cita.modality === 'P' ? 'Presencial' : 'Virtual'}</td>
                <td>{cita.status}</td>
                <td>
                  <button 
                    className="eliminar-cita-btn" 
                    onClick={() => handleEliminarCita(cita.id)}
                  >
                    Ver Detalles
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
