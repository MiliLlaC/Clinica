import React from 'react';
import { useNavigate } from'react-router-dom';
const Cuestionario = () => {
  const navigate = useNavigate(); // Hook para redireccionar

  return (
    <div className="cuestionario-container">
        <p>Todavía no tienes citas.</p>
        <p>¿Te gustaría agendar una?</p>
        <button className="btn-seleccionar-test" onClick={() => navigate("/Dash/TestSelect")}>Seleccionar un test</button>

    </div>
  );
};

export default Cuestionario;