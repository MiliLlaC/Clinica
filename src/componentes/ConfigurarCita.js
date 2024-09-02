import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./stile/configurarCita.css";
import iconreset from "../recursos/imagenes/reset.png"; // Icono agregar

const ConfigurarCita = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { servicioSeleccionado } = location.state || {};
  const sedes = servicioSeleccionado ? servicioSeleccionado.sedes : [];
  //Sede
  const [sede, setSede] = useState("");

  //Modalidad
  const [modality, setModality] = useState("");
  const [tipoConsulta, setTipoConsulta] = useState("");

  //Medico (optimizar aqui)
  const [medicoSeleccionado, setMedicoSeleccionado] = useState("");
  const [medicoName, setMedicoName] = useState("");
  const [medicos, setMedicos] = useState([]);

  //Fecha
  const [fecha, setFecha] = useState("");

  //Horarios
  const [horarios, setHorarios] = useState([]);
  const [start_time, setStartTime] = useState("");
  const [end_time, setEndTime] = useState("");
  
  const today = new Date().toISOString().split("T")[0];
  

  // OBTENGO LOS HORARIOS DISPONIBLES (SELECCIONANDO MEDICO Y FECHA)
  useEffect(() => {
    if (medicoSeleccionado && fecha) {
      axios
        .post("http://127.0.0.1:8000/scheduling/available-time-slots/", {
          employee: medicoSeleccionado,
          date: fecha,
        })
        .then((response) => {
          setHorarios(response.data);
        })
        .catch((error) => {
          console.error("Error al obtener los horarios:", error);
          setHorarios([]);
        });
    } else {
      setHorarios([]);
    }
  }, [medicoSeleccionado, fecha]);

  // OBTENGO LOS MEDICOS (SELECCIONANDO LA SEDE)
  useEffect(() => {
    if (sede) {
      axios
        .get(`http://127.0.0.1:8000/scheduling/sedes/${sede.id}`)
        .then((response) => {
          const empleados = response.data.employees;
          const medicosDisponibles = empleados.map((emp) => ({
            id: emp.id,
            name: `${emp.first_name} ${emp.last_name}`,
          }));
          setMedicos(medicosDisponibles);
        })
        .catch((error) => {
          console.error("Error al obtener los empleados:", error);
          setMedicos([]);
        });
    } else {
      setMedicos([]);
    }
  }, [sede, sedes]);

  const handleSedeChange = (e) => {
    const sedeId = parseInt(e.target.value);
    const selectedSede = sedes.find((sede) => sede.id === sedeId);
    setSede(selectedSede);
    if (selectedSede) {
      setMedicoSeleccionado("");
      setStartTime("");
      setEndTime("");
      // Determinar la modalidad permitida basado en la sede y el servicio
      if (selectedSede.modality === "A") {
        setTipoConsulta("P");
        setModality(
          servicioSeleccionado.modality === "A"
            ? "A"
            : servicioSeleccionado.modality === "P"
            ? "P"
            : "V"
        );
      } else {
        setModality(selectedSede.modality);
        setTipoConsulta(selectedSede.modality);
      }
    }
  };

  const handleFechaChange = (e) => {
    setFecha(e.target.value);
    setStartTime("");
    setEndTime("");
  };

  const handleMedicoChange = (e) => {
    const medicoId = parseInt(e.target.value, 10);
    const selectedMedico = medicos.find((medico) => medico.id === medicoId);
    if (selectedMedico) {
      setMedicoSeleccionado(selectedMedico.id);
      setMedicoName(selectedMedico.name);
      setStartTime("");
      setEndTime("");
    }
  };

  const handleHorarioChange = (start_time, end_time) => {
    setStartTime(start_time);
    setEndTime(end_time)
  };

  const handleContinuarClick = () => {
    console.log(servicioSeleccionado);
    console.log(sede);
    navigate("/Dash/Resumen", {
      state: {
        servicioSeleccionado,
        sede: sede,
        fecha,
        start_time,
        end_time,
        medico : {medicoSeleccionado, medicoName},
        tipoConsulta,
      },
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString + "T00:00:00");
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="configurar-cita-container">
      <div className="configurar-cita-form">
        <button className="volver-btn" onClick={() => window.history.back()}>
          Volver
        </button>
        <h2>Configura tu cita</h2>

        <label htmlFor="sede">Sede</label>
        <select id="sede" value={sede.id} onChange={handleSedeChange} className="select-sede">
          <option value="">Selecciona una sede</option>
          {sedes.map((sede) => (
            <option key={sede.id} value={sede.id}>
              {sede.name}
            </option>
          ))}
        </select>

        <label htmlFor="medico">Psicólogo</label>
        <div className="medico-info">
          {medicos.length > 0 ? (
            <div className="medicos-list">
              {medicos.map((medico) => (
                <label key={medico.id} className="medico-item">
                  <input
                    type="radio"
                    name="medico"
                    value={medico.id}
                    checked={medicoSeleccionado === medico.id}
                    onChange={handleMedicoChange}
                  />
                  <span>{medico.name}</span>
                </label>
              ))}
            </div>
          ) : (
            <p>Seleccione la sede para ver los médicos disponibles.</p>
          )}
        </div>

        <div className="filtro-fecha">
          <label htmlFor="fecha">Seleccione una fecha</label>
          <div className="input-fecha-container">
            <input
              type="date"
              id="fecha"
              value={fecha}
              min={today}
              onChange={handleFechaChange}
              className="input-fecha"
            />
            <button
              className="reset-fecha-cita"
              onClick={() => setFecha(today)}
            >
              <img src={iconreset} alt="plus" className="iconreset" />
            </button>
          </div>
        </div>

        {medicoSeleccionado && horarios.length > 0 && (
          <>
            {["A", "P"].includes(modality) && (
              <button
                className={`tab-btn ${tipoConsulta === "P" ? "active" : ""}`}
                onClick={() => setTipoConsulta("P")}
              >
                Presencial
              </button>
            )}
            {["A", "V"].includes(modality) && (
              <button
                className={`tab-btn ${tipoConsulta === "V" ? "active" : ""}`}
                onClick={() => setTipoConsulta("V")}
              >
                Teleconsulta
              </button>
            )}

            <div className="horarios-list">
              <p>{formatDate(fecha)}</p>
              <div className="horarios-container">
                {horarios.map((horario) => (
                  <button
                    key={horario.id}
                    className={`hora-btn ${
                      start_time === horario.start_time
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => handleHorarioChange(horario.start_time, horario.end_time)}
                  >
                    {`${horario.start_time} - ${horario.end_time}`}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        <button
          className="continuar-btn"
          disabled={
            !sede || !fecha || !medicoSeleccionado || !start_time || !end_time
          }
          onClick={handleContinuarClick}
        >
          Continuar
        </button>
      </div>

      <div className="resumen-cita">
        <h3>Resumen de tu cita</h3>
        <p>
          <strong>Servicio:</strong>{" "}
          {servicioSeleccionado.reason || "---"}
        </p>
        <p>
          <strong>Psicólogo:</strong> {medicoName || "---"}
        </p>
        <p>
          <strong>Sede:</strong> {sede.name || "---"}
        </p>
        <p>
          <strong>Fecha:</strong> {fecha ? formatDate(fecha) : "---"}
        </p>
        <p>
          <strong>Hora:</strong> {start_time && end_time ? `${start_time} - ${end_time}` : "---"}
        </p>
        <p>
          <strong>Tipo de Consulta:</strong>{" "}
          {tipoConsulta === 'P' ? 'Presencial' : tipoConsulta === 'V' ? 'Teleconsulta': '---'}
        </p>
      </div>
    </div>
  );
};

export default ConfigurarCita;
