// componentes/SeleccionarHorario.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './stile/horario.css'; 

const SeleccionarHorario = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { especialidadSeleccionada, sede, medicoSeleccionado, fecha } = location.state || {}; // Asegúrate de incluir fecha aquí

  const [selectedHora, setSelectedHora] = useState(null);
  const horasDisponibles = ['09:00', '09:30', '10:00', '11:00', '11:30', '12:30', '15:30', '16:00'];

  const handleHoraClick = (hora) => {
    setSelectedHora(hora);
  };

  const handleContinuarClick = () => {
    navigate('/Dash/SelecSeguro', {
      state: {
        especialidadSeleccionada,
        sede,
        fecha, 
        medicoSeleccionado,
        hora: selectedHora
      }
    });
  };

  return (
    <div className="seleccionar-horario-container">
      <button className="volver-btn" onClick={() => window.history.back()}>Volver</button>
      <h2>Elige la fecha y hora</h2>

      <div className="selector-fecha">
        <input type="date" value={fecha || ''} readOnly />
        <button className="reset-fecha-btn">Restablecer fecha</button>
      </div>

      <div className="tipo-consulta">
        <button className={`btn-tipo ${selectedHora ? '' : 'active'}`} onClick={() => setSelectedHora(null)}>
          Presencial
        </button>
        <button className={`btn-tipo ${selectedHora ? 'active' : ''}`} onClick={() => setSelectedHora(null)}>
          Teleconsulta
        </button>
      </div>

      <div className="horarios-disponibles">
        {horasDisponibles.map((hora, index) => (
          <button
            key={index}
            className={`hora-btn ${selectedHora === hora ? 'selected' : ''}`}
            onClick={() => handleHoraClick(hora)}
          >
            {hora}
          </button>
        ))}
      </div>

      <button
        className="continuar-btn"
        disabled={!selectedHora}
        onClick={handleContinuarClick}
      >
        Continuar
      </button>

      <div className="resumen-cita">
        <h3>Resumen de tu cita</h3>
        <p><strong>Especialidad:</strong> {especialidadSeleccionada || 'Por definir'}</p>
        <p><strong>Médico:</strong> {medicoSeleccionado || 'Por definir'}</p>
        <p><strong>Sede:</strong> {sede || 'Por definir'}</p>
        <p><strong>Fecha:</strong> {fecha || 'Por definir'}</p>
        <p><strong>Hora:</strong> {selectedHora || 'Por definir'}</p>
      </div>
    </div>
  );
};

export default SeleccionarHorario;
