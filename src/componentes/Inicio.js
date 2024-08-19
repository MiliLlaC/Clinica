import React from 'react';
import { useNavigate } from 'react-router-dom';
import inicioimag from '../recursos/imagenes/forma.png'; // Imagen de inicio
import calendario from '../recursos/imagenes/calendario.png'; // Imagen de calend
import './stile/Inicio.css';

const Inicio = ({ user }) => {
  const navigate = useNavigate();

  const handleAgendarCita = () => {
    navigate('/Dash/AgendarCita'); // Navega a la ruta AgendarCita dentro de Dash
  };

  return (
    <div className="citas-vista-container">
      <div className="saludo">
        <div className="saludo-usuario">
        <h1>¡Hola {user}!</h1>
        <p>Estamos aquí para cuidarte.</p>
        </div>
        <div className="inicioimag">
        <img src={inicioimag} alt="iniciologo"/>
        </div>
      </div>
      <div className="citas-vacio">
        <div className="icono-citas">
        <img src={calendario} alt="calendario"/>
        </div>
        <p>Todavía no tienes citas.</p>
        <p>¿Te gustaría agendar una?</p>
        <button className="btn-agendar-cita" onClick={handleAgendarCita}>
          Agendar una cita
        </button>
      </div>
    </div>
  );
};

export default Inicio;
