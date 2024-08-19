import React from 'react';
import { useNavigate } from 'react-router-dom';
import './stile/testslect.css';
import logo from '../recursos/imagenes/Logo_clin.jpg';
import testImage from '../recursos/imagenes/emocion.jpg'; // Importa la imagen  
import testImage1 from '../recursos/imagenes/vocacion.jpg'; // Importa la imagen  
import testImage2 from '../recursos/imagenes/conducta.jpg'; // Importa la imagen  



const TestSelection = () => {
  const navigate = useNavigate();

  const handleTestSelect = () => {
    navigate('/TestWelcom');
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/Dash/Cuestionario');
  };
  return (
    /*<div className="test-selection-container">
      <h2>Seleccione un tipo de test</h2>
      <button onClick={handleTestSelect}>Test de Autoestima</button>
      {/* Puedes agregar más botones para diferentes tests aquí 
    </div>*/
    <div className="test-selection-container">
      <div class="headertest">
          <div class="title">
            <h1 /*style={{ backgroundImage: `url(${testImage})` }}*/>Test de Psicología</h1>
          </div>
          <p>¡Bienvenida, estupenda! Estos test de psicología tienen como objetivo principal darte una visión global de cómo están a día de hoy diferentes parcelas de tu vida. De esta forma, podrás tomar conciencia y decidir qué hacer con ello: si animarte a empezar a florecer y así poder mejorar aquellos aspectos que flaquean o hacerlo en un futuro.</p>
          <button onClick={handleLogout}>RESPONDER LUEGO</button>
      </div>
      <div class="card-container">
          <div class="card">
             <div class="foto">
                <img src={testImage} alt="emocion" /> 
             </div>
             <div class="contenido">
                <h2>Mis emociones</h2>
                <p>Un viaje introspectivo que invita a la reflexión sobre los sentimientos y su impacto en nuestra vida diaria.</p>
                <button onClick={handleTestSelect}>COMPLETAR</button>
              </div>
          </div>
          <div class="card">
              <div class="foto">
                <img src={testImage1} alt="vocacion" />
              </div>
              <div class="contenido">
                <h2>Descubre tu Vocación</h2>
                <p>Identifica tus intereses, habilidades y valores profesionales. ¡Comienza tu camino hacia un futuro profesional!</p>
                <button>COMPLETAR</button>
              </div>
          </div>
          <div class="card">
              <div class="foto">
                <img src={testImage2} alt="conducta" />
              </div>
              <div class="contenido">
                <h2>Conducta Personal</h2>
                <p>Comprende mejor tu forma de interactuar con los demás y a mejorar tus habilidades sociales. ¡Descubre más sobre ti mismo</p>
                <button>COMPLETAR</button>
              </div>
          </div>
      </div>
    </div>
  );
};

export default TestSelection;
