import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './stile/configurarCita.css';
import iconreset from '../recursos/imagenes/reset.png';  // Icono agregar 

const ConfigurarCita = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { especialidadSeleccionada } = location.state || {};

  const [sede, setSede] = useState('');
  const [fecha, setFecha] = useState('');
  const [medicoSeleccionado, setMedicoSeleccionado] = useState('');
  const [medicos, setMedicos] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState('');
  const [tipoConsulta, setTipoConsulta] = useState('presencial'); // Estado añadido

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (sede && fecha) {
      const medicosDisponibles = [
        { id: 1, nombre: 'Dr. Jorge Arturo Aguilar Segura' },
        { id: 2, nombre: 'Dra. Ana María Flores García' },
        // Más médicos...
      ];
      setMedicos(medicosDisponibles);
    } else {
      setMedicos([]);
    }
  }, [sede, fecha]);

  useEffect(() => {
    if (medicoSeleccionado) {
      const horariosDisponibles = [
        { id: 1, horario: '9:00 AM', tipo: 'presencial' },
        { id: 2, horario: '10:00 AM', tipo: 'presencial' },
        { id: 3, horario: '11:00 AM', tipo: 'presencial' },
        { id: 4, horario: '12:00 PM', tipo: 'presencial' },
        { id: 5, horario: '1:00 PM', tipo: 'presencial' },
        { id: 6, horario: '9:00 AM', tipo: 'teleconsulta' },
        { id: 7, horario: '10:00 AM', tipo: 'teleconsulta' },
        // Más horarios...
      ];
      setHorarios(horariosDisponibles);
    } else {
      setHorarios([]);
    }
  }, [medicoSeleccionado]);

  const handleSedeChange = (e) => {
    setSede(e.target.value);
    setMedicoSeleccionado('');
    setHorarioSeleccionado('');
  };

  const handleFechaChange = (e) => {
    setFecha(e.target.value);
    setMedicoSeleccionado('');
    setHorarioSeleccionado('');
  };

  const handleMedicoChange = (e) => {
    setMedicoSeleccionado(e.target.value);
    setHorarioSeleccionado('');
  };

  const handleHorarioChange = (horario) => {
    setHorarioSeleccionado(horario);
  };

  const handleContinuarClick = () => {
    navigate('/Dash/Resumen', {
      state: {
        especialidadSeleccionada,
        sede,
        fecha,
        hora: horarioSeleccionado,  // Asigna el horario seleccionado
        medicoSeleccionado,
        tipoConsulta,
        seguro: 'Sin seguro' // Puedes cambiar este valor según la lógica de tu aplicación
      }
    });
  };

  const horariosFiltrados = horarios.filter(horario => horario.tipo === tipoConsulta);

  const formatDate = (dateString) => {
    const date = new Date(dateString + 'T00:00:00'); // Concatenar la hora para evitar problemas de zona horaria
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="configurar-cita-container">
      <div className="configurar-cita-form">
       <button className="volver-btn" onClick={() => window.history.back()}>Volver</button>
        <h2>Configura tu cita</h2>

        <div className="filtro-fecha">
          <label htmlFor="fecha">Seleccione una fecha</label>
          <div className="input-fecha-container">
            <input
              type="date"
              id="fecha"
              value={fecha}
              min={today}
              onChange={handleFechaChange}
              className="input-fecha"
            />
            <button className="reset-fecha-cita" onClick={() => setFecha(today)}><img src={iconreset} alt="plus" className="iconreset" /></button>
          </div>
        </div>

        <label htmlFor="sede">Sede</label>
        <select id="sede" value={sede} onChange={handleSedeChange} className="select-sede">
          <option value="">Selecciona una sede</option>
          <option value="Chiclayo">Chiclayo</option>
          <option value="Piura">Piura</option>
          <option value="Trujillo">Trujillo</option>
          <option value="Lima">Lima</option>
          {/* Agrega más opciones de sede */}
        </select>

        <label htmlFor="medico">Psicólogo</label>
        <div className="medico-info">
          {medicos.length > 0 ? (
            <div className="medicos-list">
              {medicos.map((medico) => (
                <label key={medico.id} className="medico-item">
                  <input
                    type="radio"
                    name="medico"
                    value={medico.nombre}
                    checked={medicoSeleccionado === medico.nombre}
                    onChange={handleMedicoChange}
                  />
                  <span>{medico.nombre}</span>
                </label>
              ))}
            </div>
          ) : (
            <p>Seleccione sede y fecha para ver los médicos disponibles.</p>
          )}
        </div>

        {medicoSeleccionado && horariosFiltrados.length > 0 && (
          <>
            <div className="tipo-consulta-tabs">
              <button
                className={`tab-btn ${tipoConsulta === 'presencial' ? 'active' : ''}`}
                onClick={() => setTipoConsulta('presencial')}
              >
                Presencial
              </button>
              <button
                className={`tab-btn ${tipoConsulta === 'teleconsulta' ? 'active' : ''}`}
                onClick={() => setTipoConsulta('teleconsulta')}
              >
                Teleconsulta
              </button>
            </div>

            <div className="horarios-list">
              <p>{formatDate(fecha)}</p>
              <div className="horarios-container">
                {horariosFiltrados.map((horario) => (
                  <button
                    key={horario.id}
                    className={`hora-btn ${horarioSeleccionado === horario.horario ? 'selected' : ''}`}
                    onClick={() => handleHorarioChange(horario.horario)}
                  >
                    {horario.horario}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        <button
          className="continuar-btn"
          disabled={!sede || !fecha || !medicoSeleccionado || !horarioSeleccionado}
          onClick={handleContinuarClick}
        >
          Continuar
        </button>
      </div>

      <div className="resumen-cita">
        <h3>Resumen de tu cita</h3>
        <p><strong>Servicio:</strong> {especialidadSeleccionada || 'Por definir'}</p>
        <p><strong>Psicólogo:</strong> {medicoSeleccionado || 'Por definir'}</p>
        <p><strong>Sede:</strong> {sede || 'Por definir'}</p>
        <p><strong>Fecha:</strong> {fecha ? formatDate(fecha) : 'Por definir'}</p>
        <p><strong>Hora:</strong> {horarioSeleccionado || 'Por definir'}</p>
        <p><strong>Tipo de Consulta:</strong> {tipoConsulta === 'presencial' ? 'Presencial' : 'Teleconsulta'}</p>
      </div>
    </div>
  );
};

export default ConfigurarCita;
