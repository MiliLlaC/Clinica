import React, { useState } from "react";
import "./stile/pacienteRegistrar.css";

const RegistrarPaciente = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    tipoDocumento: "DNI",
    numeroDocumento: "",
    fechaNacimiento: "",
    consentimiento: false,
    nombres: "",
    apellidos: "",
    sexo: "",
    codigoPais: "Perú (+51)",
    celular: "",
    email: ""
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      // Aquí puedes hacer validaciones adicionales antes de avanzar al siguiente paso
      setStep(2);
    } else {
      // Lógica para enviar el formulario completo
      console.log("Datos del paciente:", formData);
    }
  };

  return (
    <div className="registrar-paciente-container">
      <div className="paciente-header">
        <div className="step-indicator">
          <span className={step === 1 ? "active" : ""}>1</span>
          <span className={step === 2 ? "active" : ""}>2</span>
        </div>
        <a href="/Dash/Inicio" className="cancelar-link">Cancelar</a>
      </div>

      {step === 1 && (
        <form onSubmit={handleSubmit} className="form">
          <h2>Ingresa los datos del paciente</h2>
          <div className="form-group">
            <label>Tipo de documento</label>
            <select
              name="tipoDocumento"
              value={formData.tipoDocumento}
              onChange={handleInputChange}
            >
              <option value="DNI">DNI</option>
              <option value="Pasaporte">Pasaporte</option>
            </select>
          </div>
          <div className="form-group">
            <label>Nº de documento</label>
            <input
              type="text"
              name="numeroDocumento"
              value={formData.numeroDocumento}
              onChange={handleInputChange}
              placeholder="Ej: 11122233"
            />
            {/* Validación de número 
            {!formData.numeroDocumento && (
              <p className="error-message">Ingresa el número</p>
            )}*/}
          </div>
          <div className="form-group">
            <label>Fecha de nacimiento</label>
            <input
              type="date"
              name="fechaNacimiento"
              value={formData.fechaNacimiento}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group consentimiento">
            <input
              type="checkbox"
              name="consentimiento"
              checked={formData.consentimiento}
              onChange={handleInputChange}
            />
            <label>
              Declaro tener el <a href="#">Consentimiento del paciente</a>
            </label>
          </div>
          <button type="submit" className="btn-continuar" disabled={!formData.numeroDocumento || !formData.fechaNacimiento}>
            Continuar
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit} className="form">
          <h2>Revisa los datos del paciente</h2>
          <div className="form-group">
            <label>Nombres y apellidos</label>
            <p>{formData.nombres} {formData.apellidos}</p>
          </div>
          <div className="form-group">
            <label>DNI</label>
            <p>{formData.numeroDocumento}</p>
          </div>
          <div className="form-group">
            <label>Fecha de nacimiento</label>
            <p>{formData.fechaNacimiento}</p>
          </div>
          <div className="form-group">
            <label>Sexo</label>
            <select name="sexo" value={formData.sexo} onChange={handleInputChange}>
              <option value="">Seleccione una opción</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
            </select>
          </div>
          <div className="form-group">
            <label>Código de país</label>
            <select name="codigoPais" value={formData.codigoPais} onChange={handleInputChange}>
              <option value="Perú (+51)">Perú (+51)</option>
              <option value="México (+52)">México (+52)</option>
            </select>
          </div>
          <div className="form-group">
            <label>Celular (opcional)</label>
            <input
              type="text"
              name="celular"
              value={formData.celular}
              onChange={handleInputChange}
              placeholder="Ej: 123456789"
            />
          </div>
          <div className="form-group">
            <label>Correo electrónico (opcional)</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Ej: correo@mail.com"
            />
          </div>
          <button type="submit" className="btn-agregar-paciente">
            Agregar paciente
          </button>
        </form>
      )}
    </div>
  );
};

export default RegistrarPaciente;
