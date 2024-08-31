// ResumenCita.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ResumenCita = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { especialidadSeleccionada, sede, fecha, hora, medicoSeleccionado, seguro, tipoConsulta } = location.state || {};

  const handleAgendarCita = () => {
    // Simular almacenamiento de la cita
    const nuevaCita = {
      fecha,
      hora,
      tipoConsulta,
      especialidad: especialidadSeleccionada,
      medico: medicoSeleccionado,
      sede,
      estado: 'Agendada'
    };

    // Guardar la cita en el localStorage (o envíala a un backend)
    const citasPrevias = JSON.parse(localStorage.getItem('citas')) || [];
    const citasActualizadas = [...citasPrevias, nuevaCita];
    localStorage.setItem('citas', JSON.stringify(citasActualizadas));

    // Navegar a la confirmación
    navigate('/Dash/Inicio');
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
        <p><strong>Tipo de Consulta:</strong> {tipoConsulta === 'presencial' ? 'Presencial' : 'Teleconsulta'}</p>
        {/*<p><strong>Asegurador:</strong> {seguro || 'Sin seguro'}</p>*/}
        <p><strong>Pago por consulta:</strong> S/ 300.00</p>
      </div>
      <button className="btn-agendar-cita" onClick={handleAgendarCita}>Agendar cita</button>
    </div>
  );
};

export default ResumenCita;
