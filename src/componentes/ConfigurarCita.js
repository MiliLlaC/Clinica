import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './stile/configurarCita.css';

const ConfigurarCita = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { especialidadSeleccionada } = location.state || {};

  const [sede, setSede] = useState('');
  const [fecha, setFecha] = useState('');
  const [medicoSeleccionado, setMedicoSeleccionado] = useState('');
  const [medicos, setMedicos] = useState([]);

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

  const handleSedeChange = (e) => {
    setSede(e.target.value);
    setMedicoSeleccionado('');
  };

  const handleFechaChange = (e) => {
    setFecha(e.target.value);
    setMedicoSeleccionado('');
  };

  const handleMedicoChange = (e) => {
    setMedicoSeleccionado(e.target.value);
  };

  const handleContinuarClick = () => {
    navigate('/Dash/SeleccionaHora', {
      state: {
        especialidadSeleccionada,
        sede,
        fecha,
        medicoSeleccionado
      }
    });
  };

  return (
    <div className="configurar-cita-container">
      <div className="configurar-cita-form">
        <h2>Configura tu cita</h2>

        <label htmlFor="sede">Sede</label>
        <select id="sede" value={sede} onChange={handleSedeChange} className="select-sede">
          <option value="">Selecciona una sede</option>
          <option value="Delgado - Lima">Delgado - Lima</option>
          {/* Agrega más opciones de sede */}
        </select>

        <label htmlFor="fecha">Fecha</label>
        <input 
          type="date" 
          id="fecha" 
          value={fecha} 
          onChange={handleFechaChange} 
          className="input-fecha"
        />

        <label htmlFor="medico">Psicologo</label>
        <div className="medico-info">
          {medicos.length > 0 ? (
            <div className="medicos-list">
              {medicos.map((medico) => (
                <label key={medico.id}>
                  <input
                    type="radio"
                    name="medico"
                    value={medico.nombre}
                    checked={medicoSeleccionado === medico.nombre}
                    onChange={handleMedicoChange}
                  />
                  {medico.nombre}
                </label>
              ))}
            </div>
          ) : (
            <p>Seleccione sede y fecha para ver los médicos disponibles.</p>
          )}
        </div>

        <button
          className="continuar-btn"
          disabled={!sede || !fecha || !medicoSeleccionado}
          onClick={handleContinuarClick}
        >
          Continuar
        </button>
      </div>

      <div className="resumen-cita">
        <h3>Resumen de tu cita</h3>
        <p><strong>Especialidad:</strong> {especialidadSeleccionada || 'Por definir'}</p>
        <p><strong>Médico:</strong> {medicoSeleccionado || 'Por definir'}</p>
        <p><strong>Sede:</strong> {sede || 'Por definir'}</p>
        <p><strong>Fecha:</strong> {fecha || 'Por definir'}</p>
        <p><strong>Hora:</strong> {'Por definir'}</p>
      </div>
    </div>
  );
};

export default ConfigurarCita;
