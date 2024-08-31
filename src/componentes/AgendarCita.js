// componentes/AgendarCita.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import iconmedico from '../recursos/imagenes/medico.png';  // Icono
import iconespecialidad from '../recursos/imagenes/especialidad.png';  //
import iconplus from '../recursos/imagenes/plus.png';  // Icono agregar 
import './stile/agendarCita.css'; 

const AgendarCita = ({ user }) => {
  const navigate = useNavigate(); // Hook para redireccionar
  return (
    <div className="agendar-cita-container">
      <h2>Agenda tu cita</h2>
      <div className="agendar-cita-form">
        <label htmlFor="paciente">Agendar cita para:</label>
        <select id="paciente" className="paciente-select">
          <option className='mas-pacientes' value="">{`Para mí: ${user}`}</option>
          {/* agregar otras opciones para otros pacientes */}
        </select>
        <button className="nuevo-paciente"><img src={iconplus} alt="plus" className="iconplus" />Agregar nuevo paciente</button>
        <div className="opciones-servicios">
          <div className="opcion-servicio">
          <button className="btn-servicio" onClick={() => navigate("/Dash/AgendarporMedico")}><img src={iconmedico} alt="medico" className="iconmedico" /> Psicólogo</button>
          </div>
          <div className="opcion-servicio">
            <button className="btn-servicio" onClick={() => navigate("/Dash/AgendarporServicio")}><img src={iconespecialidad} alt="especialista" className="iconmedico" />Servicio</button>
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
