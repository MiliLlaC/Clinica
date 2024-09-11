import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './stile/configurarCita.css';
import iconreset from '../recursos/imagenes/reset.png';

const CitaConfigurarPsico = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { psicologoSeleccionado, especialidadSeleccionada } = location.state || {};

  const [fechaSeleccionada, setFechaSeleccionada] = useState('');
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState('');
  const [sede, setSede] = useState('');
  const [tipoConsulta, setTipoConsulta] = useState('Presencial'); // Presencial or Teleconsulta
  const [isAvailable, setIsAvailable] = useState(true); // Availability flag

  const today = new Date().toISOString().split('T')[0];

  // Datos de ejemplo: horarios y sedes por psicólogo y tipo de consulta
  const psicologosData = {
    'Christian Jorge Pino Melgar': {
      sede: 'Sede Central',
      horarios: {
        Presencial: {
          'Lunes 09 de septiembre 2024': ['15:30', '16:15', '16:45', '17:00', '17:15'],
          'Viernes 13 de septiembre 2024': ['15:00', '15:15', '15:30', '15:45', '16:15'],
          'Jueves 26 de septiembre 2024': ['08:30', '08:45', '09:00', '09:15'],
        },
        Teleconsulta: {
          'Lunes 09 de septiembre 2024': ['10:00', '10:30', '11:00'],
          'Viernes 13 de septiembre 2024': ['11:00', '11:30', '12:00'],
        },
      }
    },
    'Emeric Jorge Macedo Vendezu': {
      sede: 'Sede Norte',
      horarios: {
        Presencial: {
          'Martes 10 de septiembre 2024': ['10:00', '10:30', '11:00', '11:30'],
          'Miércoles 18 de septiembre 2024': ['14:00', '14:30', '15:00'],
        },
        Teleconsulta: {
          'Martes 10 de septiembre 2024': ['13:00', '13:30', '14:00'],
        },
      }
    },
  };

   // Load the psychologist's schedules and location based on the selected psychologist and consultation type
   useEffect(() => {
    if (psicologoSeleccionado) {
      const datosPsicologo = psicologosData[psicologoSeleccionado];
      setSede(datosPsicologo.sede);
      const availableHorarios = datosPsicologo.horarios[tipoConsulta];
      setHorariosDisponibles(availableHorarios);

      // Automatically select the first available date and schedule
      const availableDates = Object.keys(availableHorarios);
      if (availableDates.length > 0) {
        setFechaSeleccionada(availableDates[0]); // Select the first available date
        const firstDateHorarios = availableHorarios[availableDates[0]];
        setHorarioSeleccionado(firstDateHorarios[0]); // Select the first available time for that date
        setIsAvailable(true); // Set availability to true
      } else {
        setIsAvailable(false); // No available dates
      }
    }
  }, [psicologoSeleccionado, tipoConsulta]);

  const handleFechaChange = (e) => {
    const selectedDate = e.target.value;
    setFechaSeleccionada(selectedDate);
    setHorarioSeleccionado('');

    // Check if there are available schedules for the selected date
    if (!horariosDisponibles[selectedDate]) {
      setIsAvailable(false); // No available schedules for the selected date
    } else {
      setIsAvailable(true); // Schedules are available for the selected date
      setHorarioSeleccionado(horariosDisponibles[selectedDate][0]); // Automatically select the first available time
    }
  };

  const handleHorarioChange = (horario) => {
    setHorarioSeleccionado(horario);
  };

  const handleTipoConsultaChange = (tipo) => {
    setTipoConsulta(tipo); // Change consultation type (Presencial or Teleconsulta)
    setFechaSeleccionada(''); // Reset selected date when changing the consultation type
    setHorarioSeleccionado(''); // Reset selected time when changing the consultation type
    setIsAvailable(true); // Reset availability when changing consultation type
  };

  const handleContinuarClick = () => {
    navigate('/Dash/Resumen', {
      state: {
        especialidadSeleccionada,
        sede,
        fechaSeleccionada,
        horarioSeleccionado,
        psicologoSeleccionado,
      }
    });
  };

  return (
    <div className="configurar-cita-container">
      <div className="configurar-cita-form">
        <button className="volver-btn" onClick={() => window.history.back()}>Volver</button>
        <h2>Configura tu cita</h2>

        {/* Consultation type selection */}
        <div className="tipo-consulta">
          <button
            className={tipoConsulta === 'Presencial' ? 'selected' : ''}
            onClick={() => handleTipoConsultaChange('Presencial')}
          >
            Presencial
          </button>
          <button
            className={tipoConsulta === 'Teleconsulta' ? 'selected' : ''}
            onClick={() => handleTipoConsultaChange('Teleconsulta')}
          >
            Teleconsulta
          </button>
        </div>

        {/* Date selection using date picker */}
        <div className="filtro-fecha">
          <label htmlFor="fecha">Seleccione una fecha</label>
          <input
            type="date"
            id="fecha"
            className="input-fecha"
            value={fechaSeleccionada}
            onChange={handleFechaChange}
            min={today}
          />
        </div>

        {/* Show available schedules or "No disponible" */}
        {fechaSeleccionada && (
          isAvailable ? (
            <div className="horarios-disponibles-grid">
              {horariosDisponibles[fechaSeleccionada]?.map((horario, index) => (
                <button
                  key={index}
                  className={`hora-btn ${horarioSeleccionado === horario ? 'selected' : ''}`}
                  onClick={() => handleHorarioChange(horario)}
                >
                  {horario}
                </button>
              ))}
            </div>
          ) : (
            <div className="no-disponible">No hay horarios disponibles para la fecha seleccionada</div>
          )
        )}

        {/* Agrupar los horarios por fechas */}
        {Object.keys(horariosDisponibles).length > 0 ? (
          Object.keys(horariosDisponibles).map((fecha, index)  => (
            <div key={index} className="fecha-horarios">
              <h4>{fecha}</h4>
              <div className="horarios-disponibles-grid">
                {horariosDisponibles[fecha]?.map((horario, index) => (
                  <button
                    key={index}
                    className={`hora-btn ${horarioSeleccionado === horario ? 'selected' : ''}`}
                    onClick={() => handleHorarioChange(horario)}
                  >
                    {horario}
                  </button>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="no-disponible">No hay horarios disponibles</div>
        )}

        <button
          className="continuar-btn"
          disabled={!fechaSeleccionada || !horarioSeleccionado}
          onClick={handleContinuarClick}
        >
          Continuar
        </button>
      </div>

      <div className="resumen-cita">
        <h3>Resumen de tu cita</h3>
        <p><strong>Especialidad:</strong> {especialidadSeleccionada || 'Por definir'}</p>
        <p><strong>Psicólogo:</strong> {psicologoSeleccionado || 'Por definir'}</p>
        <p><strong>Sede:</strong> {sede || 'Por definir'}</p>
        <p><strong>Fecha:</strong> {fechaSeleccionada || 'Por definir'}</p>
        <p><strong>Hora:</strong> {horarioSeleccionado || 'Por definir'}</p>
      </div>
    </div>
  );
};

export default CitaConfigurarPsico;
