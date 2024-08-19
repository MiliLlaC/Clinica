/*import { useState, useEffect } from "react";
import preguntas from "./componentes/preguntas";
import "./componentes/stile/global.css";
import "./componentes/stile/App.css";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function App() {
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

  function handleAnswerSubmit(value, e) {
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

  if (showWelcome) {
    return (
      <main className="app welcome-screen">
        <div className="welcome-screen">
          <h1>Bienvenido al Test</h1>
          <p>Presiona el botón para comenzar</p>
          <button onClick={() => setShowWelcome(false)}>Comenzar</button>
        </div>
      </main>
    );
  }

  if (isFinished)
    return (
      <main className="app questions-screen">
        <div className="juego-terminado">
          <span>Test completado</span>
          <button onClick={() => (window.location.href = "/")}>
            Volver a jugar
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
    <main className="app questions-screen">
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
            onClick={(e) => handleAnswerSubmit(respuesta, e)}
          >
            {respuesta}
          </button>
        ))}
      </div>
    </main>
  );
}

export default App;
*/