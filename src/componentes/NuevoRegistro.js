import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './stile/nuevoReg.css';

const Registro = () => {
  const [nombre, setNombre] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [tipoDocumento, setTipoDocumento] = useState('dni');
  const [numeroDocumento, setNumeroDocumento] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [religion, setReligion] = useState('');
  const [terminos, setTerminos] = useState(false);
  const [ofertas, setOfertas] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegistro = (e) => {
    e.preventDefault();

    // Validaciones simples
    if (!nombre || !apellidoPaterno || !numeroDocumento || !fechaNacimiento || !religion || !terminos) {
      setError('Por favor, completa todos los campos obligatorios y acepta los términos.');
      return;
    }

    // lógica para enviar los datos a un servidor

    alert('Registro completado con éxito!');
    navigate('/'); // Redirigir a la página de inicio o donde desees
  };

  return (
    <div className="registro-container">
      <h2>Registro</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleRegistro}>
        <div className="form-group">
          <label>Nombre</label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required placeholder="Ingresa tu nombre" />
        </div>
        <div className="form-group">
          <label>Apellido Paterno</label>
          <input type="text" value={apellidoPaterno} onChange={(e) => setApellidoPaterno(e.target.value)} required placeholder="Ingresa tu apellido paterno" />
        </div>
        <div className="form-group">
          <label>Apellido Materno</label>
          <input type="text" value={apellidoMaterno} onChange={(e) => setApellidoMaterno(e.target.value)} placeholder="Ingresa tu apellido materno" />
        </div>
        <div className="form-group">
          <label>Tipo de documento</label>
          <select value={tipoDocumento} onChange={(e) => setTipoDocumento(e.target.value)}>
            <option value="dni">DNI</option>
            {/* Otras opciones pueden ser añadidas aquí */}
          </select>
        </div>
        <div className="form-group">
          <label>N° de documento</label>
          <input type="text" value={numeroDocumento} onChange={(e) => setNumeroDocumento(e.target.value)} required placeholder="Ej: 11122233" />
        </div>
        <div className="form-group">
          <label>Fecha de nacimiento</label>
          <input type="date" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Religión</label>
          <input type="text" value={religion} onChange={(e) => setReligion(e.target.value)} required placeholder="Ingresa tu religión" />
        </div>
        <div className="checkbox">
          <input type="checkbox" checked={terminos} onChange={() => setTerminos(!terminos)} required />
          <label>Acepto los Términos y Condiciones y la Política de Privacidad</label>
        </div>
        <div className="checkbox">
          <input type="checkbox" checked={ofertas} onChange={() => setOfertas(!ofertas)} />
          <label>Acepto recibir beneficios, ofertas, publicidad y novedades de Auna</label>
        </div>
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Registro;
