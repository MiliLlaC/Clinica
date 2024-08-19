// componentes/ResumenCita.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './stile/resumen.css';

const ResumenCita = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { especialidadSeleccionada, sede, fecha, hora, medicoSeleccionado, seguro } = location.state || {};

  const handleAgendarCita = () => {
    console.log("Cita agendada");
    navigate('/Dash/Confirmacion');
  };

  return (
    <div className="resumen-cita-container">
      <button className="volver-btn" onClick={() => window.history.back()}>Volver</button>
      <h2>Revisa el resumen de tu cita</h2>
      <div className="datos-cita">
        <p><strong>Médico:</strong> {medicoSeleccionado || 'Por definir'}</p>
        <p><strong>Especialidad:</strong> {especialidadSeleccionada || 'Por definir'}</p>
        <p><strong>Fecha:</strong> {fecha || 'Por definir'}</p>
        <p><strong>Hora:</strong> {hora || 'Por definir'}</p>
        <p><strong>Sede:</strong> {sede || 'Por definir'}</p>
        <p><strong>Asegurador:</strong> {seguro || 'Sin seguro'}</p>
        <p><strong>Pago por consulta:</strong> S/ 300.00</p>
      </div>
      <button className="agendar-cita-btn" onClick={handleAgendarCita}>Agendar cita</button>
    </div>
  );
};

export default ResumenCita;
