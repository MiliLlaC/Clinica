// componentes/SeleccionarSeguro.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './stile/seguro.css';

const SeleccionarSeguro = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { especialidadSeleccionada, sede, fecha, medicoSeleccionado, hora } = location.state || {};

  const [seguro, setSeguro] = useState(null);

  const handleContinuar = () => {
    if (seguro) {
      navigate('/Dash/Resumen', {
        state: {
          especialidadSeleccionada,
          sede,
          fecha,
          medicoSeleccionado,
          hora,
          seguro
        }
      });
    }
  };
  return (
    <div className="seleccionar-seguro-container">
      <button className="volver-btn" onClick={() => window.history.back()}>Volver</button>
      <h2>Elige una opción</h2>
      <div className="alerta-seguro">
        <span>Si no encuentra su seguro, seleccionar "Agregar un seguro", elegir su seguro y presionar el botón "Continuar".</span>
      </div>
      <div className="opcion-seguro">
        <label>
          <input type="radio" name="seguro" value="sin-seguro" onChange={() => setSeguro("Sin seguro")} />
          Sin seguro
        </label>
        <button className="agregar-seguro-btn" onClick={() => setSeguro("Con seguro")}>
          + Agregar un seguro
        </button>
      </div>

      <button 
        className="continuar-btn" 
        disabled={!seguro}
        onClick={handleContinuar}
      >
        Continuar
      </button>

      <div className="resumen-cita">
        <h3>Resumen de tu cita</h3>
        <p><strong>Especialidad:</strong> {especialidadSeleccionada || 'Por definir'}</p>
        <p><strong>Médico:</strong> {medicoSeleccionado || 'Por definir'}</p>
        <p><strong>Sede:</strong> {sede || 'Por definir'}</p>
        <p><strong>Fecha:</strong> {fecha || 'Por definir'}</p>
        <p><strong>Hora:</strong> {hora || 'Por definir'}</p>
      </div>
    </div>
  );
};

export default SeleccionarSeguro;
