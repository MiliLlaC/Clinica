// componentes/AgendarCita.js
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import iconmedico from '../recursos/imagenes/medico.png';  // Icono
import iconespecialidad from '../recursos/imagenes/especialidad.png';  //
import iconplus from '../recursos/imagenes/plus.png';  // Icono agregar 
import './stile/agendarCita.css'; 

const AgendarCita = ({ user }) => {
  const [mainPatient, setMainPatient] = useState(null);
  const navigate = useNavigate(); // Hook para redireccionar

  useEffect(() => {
    const fetchPatients = async () => {
      const token = localStorage.getItem('access_token'); // Obtener el token del localStorage
      const userId = localStorage.getItem('user_id'); // Obtener el ID del usuario del localStorage

      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/patients/${userId}/`, {
          headers: {
            'Authorization': `Bearer ${token}` // Incluir el token en la cabecera de autorización
          }
        });
        setMainPatient(response.data); // Almacenar los dependientes en el estado
      } catch (error) {
        console.error('Error al obtener los pacientes', error);
      }
    };

    fetchPatients();
  }, []);
//asasas
  return (
    <div className="agendar-cita-container">
      <h2>Agenda tu cita</h2>
      <div className="agendar-cita-form">
        <label htmlFor="paciente">Agendar cita para:</label>
        <select id="paciente" className="paciente-select">
          {mainPatient && (
            <>
              <option className='mas-pacientes' value={mainPatient.id}>
                {`Para mí: ${mainPatient.first_name} ${mainPatient.last_name}`}
              </option>
              {mainPatient.dependents && mainPatient.dependents.map(dependent => (
                <option key={dependent.id} value={dependent.id}>
                  {dependent.first_name} {dependent.last_name}
                </option>
              ))}
            </>
          )}
        </select>
        <button className="nuevo-paciente" onClick={() => navigate("/Dash/RegistrarPaciente")}><img src={iconplus} alt="plus" className="iconplus" />Agregar nuevo paciente</button>

        <div className="opciones-servicios">
          <div className="opcion-servicio">
            <button className="btn-servicio" onClick={() => navigate("/Dash/AgendarporMedico")}><img src={iconmedico} alt="medico" className="iconmedico" /> Psicólogo</button>
          </div>
          <div className="opcion-servicio">
            <button className="btn-servicio" onClick={() => navigate("/Dash/AgendarporServicio")}><img src={iconespecialidad} alt="especialista" className="iconmedico" />Especialidad</button>
          </div>
          {/*<div className="opcion-servicio">
            <button className="btn-servicio">Laboratorio</button>
          </div>*/}
        </div>
      </div>
    </div>
  );
};

export default AgendarCita;
