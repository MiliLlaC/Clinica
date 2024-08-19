import React from 'react';
import { useNavigate } from 'react-router-dom';
import './stile/testwelcom.css';

const TestWelcome = () => {
  const navigate = useNavigate();

  const handleStartTest = () => {
    navigate('/Quiz');
  };

  return (
    /*<div className="test-welcome-container">
      <h2>Bienvenido al Test de Autoestima</h2>
      <p>Este test consta de varias preguntas que evaluarán tu autoestima.</p>
      <button onClick={handleStartTest}>Iniciar Test</button>
    </div>*/
    <div className="test-welcome-container">
        <h2>Somos Salud.</h2>
        <h1>Test para Conocer tus Emociones</h1>
        <p>Descubre con este test cómo identificas y gestionas tus emociones.</p>
        <p>La inteligencia emocional es un aspecto fundamental en nuestras vidas. Conocer y entender nuestras emociones nos ayuda a mejorar nuestras relaciones y nuestro bienestar personal.</p>
        <p>Este test te permitirá explorar tus habilidades emocionales y te ofrecerá información valiosa sobre tu autoconocimiento.</p>
        <button onClick={handleStartTest}>INICIAR TEST DE EMOCIONES</button>
        <p class="note">*Este test está diseñado para ayudarte a reflexionar sobre tus emociones. No sustituye una evaluación profesional, y los resultados deben interpretarse de manera individualizada.</p>
    </div>
  );
};

export default TestWelcome;
