// src/componentes/quiz.js
/*import React, { useState, useEffect } from 'react';
import preguntas from './preguntas';
import './stile/global.css';

const Quiz = () => {
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [respuestas, setRespuestas] = useState(Array(preguntas.length).fill(null));
  const [isFinished, setIsFinished] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState(10);
  const [areDisabled, setAreDisabled] = useState(false);
  const [answersShown, setAnswersShown] = useState(false);
  const [showCounts, setShowCounts] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [counts, setCounts] = useState({
    Siempre: 0,
    "Casi Siempre": 0,
    "Algunas Veces": 0,
    "Casi Nunca": 0,
    Nunca: 0,
  });

  const opciones = ["Siempre", "Casi Siempre", "Algunas Veces", "Casi Nunca", "Nunca"];

  function handleAnswerSubmit(value) {
    const nuevasRespuestas = [...respuestas];
    nuevasRespuestas[preguntaActual] = value;
    setRespuestas(nuevasRespuestas);

    setTimeout(() => {
      if (preguntaActual === preguntas.length - 1) {
        setIsFinished(true);
        calculateCounts();
      } else {
        setPreguntaActual(preguntaActual + 1);
        setTiempoRestante(10);
      }
    }, 500);
  }

  function calculateCounts() {
    const newCounts = {
      Siempre: respuestas.filter((response) => response === 'Siempre').length,
      "Casi Siempre": respuestas.filter((response) => response === 'Casi Siempre').length,
      "Algunas Veces": respuestas.filter((response) => response === 'Algunas Veces').length,
      "Casi Nunca": respuestas.filter((response) => response === 'Casi Nunca').length,
      Nunca: respuestas.filter((response) => response === 'Nunca').length,
    };
    setCounts(newCounts);
  }

  function toggleShowCounts() {
    setShowCounts(!showCounts);
  }

  useEffect(() => {
    const intervalo = setInterval(() => {
      if (tiempoRestante > 0) setTiempoRestante((prev) => prev - 1);
      if (tiempoRestante === 0) setAreDisabled(true);
    }, 1000);

    return () => clearInterval(intervalo);
  }, [tiempoRestante]);

  useEffect(() => {
    if (isFinished) {
      calculateCounts();
    }
  }, [isFinished]);

  if (isFinished)
    return (
      <main className="app questions-screen">
        <div className="terminado">
          <span>Test completado</span>
          <button onClick={() => (window.location.href = "/testselect")}>
            Salir
          </button>
          <button
            onClick={() => {
              setIsFinished(false);
              setAnswersShown(true);
              setPreguntaActual(0);
            }}
          >
            Ver respuestas
          </button>
          <button onClick={toggleShowCounts}>
            {showCounts ? "Ocultar Recuento" : "Mostrar Recuento"}
          </button>
        </div>
        {showCounts && (
          <div className="conteo-respuestas">
            <h3>Conteo de Respuestas:</h3>
            <p>Siempre: {counts.Siempre}</p>
            <p>Casi Siempre: {counts["Casi Siempre"]}</p>
            <p>Algunas Veces: {counts["Algunas Veces"]}</p>
            <p>Casi Nunca: {counts["Casi Nunca"]}</p>
            <p>Nunca: {counts.Nunca}</p>
          </div>
        )}
      </main>
    );

  if (answersShown)
    return (
      <main className="app questions-screen">
        <div className="lado-izquierdo">
          <div className="numero-pregunta">
            <span>Pregunta {preguntaActual + 1} de</span> {preguntas.length}
          </div>
          <div className="titulo-pregunta">{preguntas[preguntaActual].titulo}</div>
          <div>
            {respuestas[preguntaActual]}
          </div>
          <button
            onClick={() => {
              if (preguntaActual === preguntas.length - 1) {
                window.location.href = "/";
              } else {
                setPreguntaActual(preguntaActual + 1);
              }
            }}
          >
            {preguntaActual === preguntas.length - 1
              ? "Volver a jugar"
              : "Siguiente"}
          </button>
        </div>
      </main>
    );

  return (
    <div className="app questions-screen">
      <div className="lado-izquierdo">
        <div className="numero-pregunta">
          <span>Pregunta {preguntaActual + 1} de</span> {preguntas.length}
        </div>
        <div className="titulo-pregunta">{preguntas[preguntaActual].titulo}</div>
        <div>
          {!areDisabled ? (
            <span className="tiempo-restante">
              Tiempo restante: {tiempoRestante}
            </span>
          ) : (
            <button
              onClick={() => {
                setTiempoRestante(10);
                setAreDisabled(false);
                if (preguntaActual === preguntas.length - 1) {
                  setIsFinished(true);
                } else {
                  setPreguntaActual(preguntaActual + 1);
                }
              }}
            >
              Continuar
            </button>
          )}
        </div>
      </div>
      <div className="lado-derecho">
        {opciones.map((respuesta, index) => (
          <button
            disabled={areDisabled}
            key={index}
            onClick={() => handleAnswerSubmit(respuesta)}
          >
            {respuesta}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Quiz;*/
import React, { useState, useEffect } from 'react';
import preguntas from './Preguntas'; // Importar las preguntas desde un archivo externo
import './stile/global.css'; // Importar estilos globales

const Quiz = () => {
  const [preguntaActual, setPreguntaActual] = useState(0); // Estado para la pregunta actual
  const [respuestas, setRespuestas] = useState(Array(preguntas.length).fill(null)); // Estado para almacenar las respuestas
  const [isFinished, setIsFinished] = useState(false); // Estado para verificar si el test ha terminado
  const [tiempoRestante, setTiempoRestante] = useState(10); // Estado para el tiempo restante por pregunta
  const [areDisabled, setAreDisabled] = useState(false); // Estado para deshabilitar los botones después de que el tiempo se agote
  const [answersShown, setAnswersShown] = useState(false); // Estado para mostrar las respuestas después de terminar
  const [showCounts, setShowCounts] = useState(false); // Estado para mostrar el recuento de respuestas
  const [counts, setCounts] = useState({
    Siempre: 0,
    "Casi Siempre": 0,
    "Algunas Veces": 0,
    "Casi Nunca": 0,
    Nunca: 0,
  }); // Estado para el conteo de respuestas

  const opciones = ["Siempre", "Casi Siempre", "Algunas Veces", "Casi Nunca", "Nunca"]; // Opciones de respuesta

  // Función para manejar la selección de una respuesta
  function handleAnswerSubmit(value) {
    const nuevasRespuestas = [...respuestas];
    nuevasRespuestas[preguntaActual] = value;
    setRespuestas(nuevasRespuestas);

    setTimeout(() => {
      if (preguntaActual === preguntas.length - 1) {
        setIsFinished(true); // Si es la última pregunta, se marca el test como terminado
        calculateCounts(); // Calcula el recuento de respuestas
      } else {
        setPreguntaActual(preguntaActual + 1); // Pasa a la siguiente pregunta
        setTiempoRestante(10); // Reinicia el tiempo
      }
    }, 500);
  }

  // Función para calcular el recuento de respuestas
  function calculateCounts() {
    const newCounts = {
      Siempre: respuestas.filter((response) => response === 'Siempre').length,
      "Casi Siempre": respuestas.filter((response) => response === 'Casi Siempre').length,
      "Algunas Veces": respuestas.filter((response) => response === 'Algunas Veces').length,
      "Casi Nunca": respuestas.filter((response) => response === 'Casi Nunca').length,
      Nunca: respuestas.filter((response) => response === 'Nunca').length,
    };
    setCounts(newCounts);
  }

  // Función para alternar la visualización del recuento de respuestas
  function toggleShowCounts() {
    setShowCounts(!showCounts);
  }

  // Función para finalizar el test
  function handleFinishTest() {
    setIsFinished(true);
    calculateCounts();
  }

  // useEffect para manejar el tiempo restante
  useEffect(() => {
    const intervalo = setInterval(() => {
      if (tiempoRestante > 0) setTiempoRestante((prev) => prev - 1);
      if (tiempoRestante === 0) setAreDisabled(true);
    }, 1000);

    return () => clearInterval(intervalo);
  }, [tiempoRestante]);

  // useEffect para calcular el recuento de respuestas cuando el test ha terminado
  useEffect(() => {
    if (isFinished) {
      calculateCounts();
    }
  }, [isFinished]);

  // Renderizado cuando el test ha terminado
  if (isFinished)
    return (
      <main className="app questions-screen">
        <div className="terminado">
          <span>Test completado</span>
          <button onClick={() => (window.location.href = "/test-selection")}>
            Salir
          </button>
          <button
            onClick={() => {
              setIsFinished(false);
              setAnswersShown(true);
            }}
          >
            Ver respuestas
          </button>
          <button onClick={toggleShowCounts}>
            {showCounts ? "Ocultar Recuento" : "Mostrar Recuento"}
          </button>
        </div>
        {showCounts && (
          <div className="conteo-respuestas">
            <h3>Conteo de Respuestas:</h3>
            <p>Siempre: {counts.Siempre}</p>
            <p>Casi Siempre: {counts["Casi Siempre"]}</p>
            <p>Algunas Veces: {counts["Algunas Veces"]}</p>
            <p>Casi Nunca: {counts["Casi Nunca"]}</p>
            <p>Nunca: {counts.Nunca}</p>
          </div>
        )}
      </main>
    );

  // Renderizado cuando se están mostrando las respuestas
  if (answersShown)
    return (
      <main className="app questions-screen">
        <div className="lado-izquierdo">
          <div className="titulo-pregunta">Respuestas del Test:</div>
          {preguntas.map((pregunta, index) => (
            <div key={index}>
              <div className="numero-pregunta">
                <span>Pregunta {index + 1} de</span> {preguntas.length}
              </div>
              <div className="titulo-pregunta">{pregunta.titulo}</div>
              <div>{respuestas[index]}</div>
            </div>
          ))}
          <button onClick={() => (window.location.href = "/test-selection")}>
            Salir
          </button>
        </div>
      </main>
    );

  // Renderizado principal del quiz
  return (
    <div className="app questions-screen">
      <div className="lado-izquierdo">
        <div className="numero-pregunta">
          <span>Pregunta {preguntaActual + 1} de</span> {preguntas.length}
        </div>
        <div className="titulo-pregunta">{preguntas[preguntaActual].titulo}</div>
        {/*<div>
          {!areDisabled ? (
            <span className="tiempo-restante">
              Tiempo restante: {tiempoRestante}
            </span>
          ) : (
            <button
              onClick={() => {
                setTiempoRestante(10);
                setAreDisabled(false);
                if (preguntaActual === preguntas.length - 1) {
                  setIsFinished(true);
                } else {
                  setPreguntaActual(preguntaActual + 1);
                }
              }}
            >
              Continuar
            </button>
          )}
        </div>*/}
      </div>
      <div className="lado-derecho">
        <div className="respuestasbutton">
          {opciones.map((respuesta, index) => (
            <button
              disabled={areDisabled}
              key={index}
              onClick={() => handleAnswerSubmit(respuesta)}
            >
              {respuesta}
            </button>
          ))}
        </div>
        <div className="botones-controles">
          <button
            onClick={() => setPreguntaActual(Math.max(preguntaActual - 1, 0))}
            disabled={preguntaActual === 0}
          >
            Anterior
          </button>
          <button
            onClick={() => setPreguntaActual(Math.min(preguntaActual + 1, preguntas.length - 1))}
            disabled={preguntaActual === preguntas.length - 1}
          >
            Siguiente
          </button>
          <button onClick={handleFinishTest}>
            Finalizar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
