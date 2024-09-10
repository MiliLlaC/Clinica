import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResumenCita = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const patient = localStorage.getItem('user_id');
  const token = localStorage.getItem('access_token');
  const [price, setPrice] = useState("");
  const [paymentFile, setPaymentFile] = useState(null); // Estado para el archivo de pago
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
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        setPrice(response.data.price);
      } catch (error) {
        console.error('Error al calcular el precio de la consulta:', error);
      }
    };

    calcularPrecio();
  }, [patient, servicioSeleccionado, token]);

  const handleFileChange = (event) => {
    setPaymentFile(event.target.files[0]); // Almacena el archivo seleccionado
  };

  const handleAgendarCita = async () => {
    const formData = new FormData();
    
    // Añadir los campos necesarios al formData
    formData.append('patient', patient); // El id del paciente
    formData.append('employee', medico.id); // El id del médico (empleado)
    formData.append('appointment_reason', servicioSeleccionado.id); // La especialidad
    formData.append('sede', sede.id);
    formData.append('date', fecha); // La sede
    formData.append('modality', tipoConsulta); // Modalidad (P para presencial, V para virtual)
    formData.append('start_time', start_time); // Hora de inicio
    formData.append('end_time', end_time); // Hora de fin
    
    // Datos de pago
    formData.append('amount', price); // El monto de la consulta
    //formData.append('payment[status]', 'N'); // Estado del pago (N para no pagado)
    formData.append('payment_image', paymentFile); // Imagen del pago

    try {
      await axios.post('http://127.0.0.1:8000/scheduling/psychological-appointments/', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data' // Importante para enviar archivos
        }
      });
      
      // Si todo es exitoso, navega a la pantalla de confirmación
      navigate('/Dash/Citas');
    } catch (error) {
      console.error('Error al agendar la cita:', error);
    }
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
        <p><strong>Tipo de Consulta:</strong> {tipoConsulta === 'P' ? 'Presencial' : tipoConsulta === 'V' ? 'Teleconsulta' : '---'}</p>
        <p><strong>Pago por consulta:</strong> {price}</p>
        <div>
          <label>Subir comprobante de pago (imagen):</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>
      </div>
      <button className="btn-agendar-cita" onClick={handleAgendarCita}>Agendar cita</button>
    </div>
  );
};

export default ResumenCita;
