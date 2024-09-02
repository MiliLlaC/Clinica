// ResumenCita.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResumenCita = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const patient = localStorage.getItem('user_id');
  const token = localStorage.getItem('access_token');
  const [price, setPrice] = useState("");
  const { servicioSeleccionado, sede, fecha, start_time, end_time, medico, tipoConsulta } = location.state || {};
  
  useEffect(() => {
      const calcularPrecio = async () => {
        try {
          const response = await axios.post(
            'http://127.0.0.1:8000/scheduling/psychological-appointments/calculate-price/',
            {
              patient_id: patient,
              appointment_reason_id: servicioSeleccionado.id
            },
            {
              headers: {
                Authorization: `Bearer ${token}`, // Incluir el token de autenticación
                'Content-Type': 'application/json'
              }
            }
          );
          setPrice(response.data.price); // Almacena el precio en el estado
        } catch (error) {
          console.error('Error al calcular el precio de la consulta:', error);
        }
      };

      calcularPrecio();
  }, []);
  
  const handleAgendarCita = () => {
    // Simular almacenamiento de la cita
    const nuevaCita = {
      fecha,
      tipoConsulta,
      especialidad: servicioSeleccionado.id,
      medico: medico.id,
      sede
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
        <p><strong>Médico:</strong> {medico.medicoName || 'Por definir'}</p>
        <p><strong>Especialidad:</strong> {servicioSeleccionado.reason || 'Por definir'}</p>
        <p><strong>Fecha:</strong> {fecha || 'Por definir'}</p>
        <p><strong>Hora:</strong> {start_time && end_time ? `${start_time} - ${end_time}` : "---"}</p>
        <p><strong>Sede:</strong> {sede.name || 'Por definir'}</p>
        <p><strong>Tipo de Consulta:</strong> {tipoConsulta === 'P' ? 'Presencial' : tipoConsulta === 'V' ? 'Teleconsulta': '---'}</p>
        {/*<p><strong>Asegurador:</strong> {seguro || 'Sin seguro'}</p>*/}
        <p><strong>Pago por consulta:</strong> {price}</p>
      </div>
      <button className="btn-agendar-cita" onClick={handleAgendarCita}>Agendar cita</button>
    </div>
  );
};

export default ResumenCita;
