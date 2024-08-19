import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './stile/registro.css';

const Register = () => {
  const [step, setStep] = useState(1);
  const [documentType, setDocumentType] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [secondLastName, setSecondLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [birthPlace, setBirthPlace] = useState('');
  const [gender, setGender] = useState('');
  const [workCenter, setWorkCenter] = useState('');
  const [occupation, setOccupation] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [religion, setReligion] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  // Función para calcular la edad
  const calculateAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDifference = today.getMonth() - birthDateObj.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }

    return age;
  };

  // Función para generar el nombre de usuario
  useEffect(() => {
    if (firstName && lastName && secondLastName) {
      const generatedUsername = `${firstName.toLowerCase()}`;
      setUsername(generatedUsername);
    }
  }, [firstName]);

  const handleRegister = (e) => {
    e.preventDefault();
    const age = calculateAge(birthDate);
    if (age < 18) {
      alert('Debes ser mayor de 18 años para registrarte.');
    } else {
      setStep(2);
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    setStep(3);
  };

  const handleContact = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
    } else {
      // Aquí iría la lógica para registrar al usuario y navegar al dashboard
      navigate('/Dash', { state: { user: username } });
    }
  };

  return (
    <div className="register-container">
      <div className="register-left">
        <h2>Agenda tus citas médicas virtuales y/o presenciales de la manera más simple y rápida</h2>
      </div>
      {step === 1 ? (
        <div className="register-right">
          <a href="/Login" className="back-link">Volver</a>
          <h2>Ingresa tus datos</h2>
          <form onSubmit={handleRegister}>
            <label>
              Tipo de documento
              <select value={documentType} onChange={(e) => setDocumentType(e.target.value)} required>
                <option value="">Selecciona tu tipo de documento</option>
                <option value="DNI">DNI</option>
                <option value="Pasaporte">Pasaporte</option>
              </select>
            </label>
            <label>
              Nº de documento
              <input
                type="text"
                value={documentNumber}
                onChange={(e) => setDocumentNumber(e.target.value)}
                required
                placeholder="Ej: 11122333"
              />
            </label>
            <label>
              Nombres
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                placeholder="Ej: Juan"
              />
            </label>
            <label>
              Apellido paterno
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                placeholder="Ej: Pérez"
              />
            </label>
            <label>
              Apellido materno
              <input
                type="text"
                value={secondLastName}
                onChange={(e) => setSecondLastName(e.target.value)}
                required
                placeholder="Ej: Gómez"
              />
            </label>
            <label>
              Fecha de nacimiento
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                required
              />
            </label>
            <label>
              Lugar de nacimiento
              <input
                type="text"
                value={birthPlace}
                onChange={(e) => setBirthPlace(e.target.value)}
                required
                placeholder="Ej: Lima, Perú"
              />
            </label>
            <button type="submit" className="submit-button">Continuar</button>
          </form>
        </div>
      ) : step === 2 ? (
        <div className="verify-container">
          <a href="/Login" className="back-link">Volver</a>
          <div className="progress-indicator">
            <div className="step completed">1</div>
            <div className="step completed">2</div>
            <div className="step">3</div>
          </div>
          <h2>Ingresa tus datos</h2>
          <form onSubmit={handleVerify}>
            <label>
              Sexo
              <select value={gender} onChange={(e) => setGender(e.target.value)} required>
                <option value="">Selecciona tu sexo</option>
                <option value="Femenino">Femenino</option>
                <option value="Masculino">Masculino</option>
                <option value="Otro">Otro</option>
              </select>
            </label>
            <label>
              Centro de labores
              <input
                type="text"
                value={workCenter}
                onChange={(e) => setWorkCenter(e.target.value)}
                required
                placeholder="Ej: Nombre del centro"
              />
            </label>
            <label>
              Ocupación
              <input
                type="text"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                required
                placeholder="Ej: Ingeniero"
              />
            </label>
            <label>
              Estado civil
              <select value={maritalStatus} onChange={(e) => setMaritalStatus(e.target.value)} required>
                <option value="">Selecciona tu estado civil</option>
                <option value="Soltero">Soltero</option>
                <option value="Casado">Casado</option>
                <option value="Divorciado">Divorciado</option>
                <option value="Viudo">Viudo</option>
              </select>
            </label>
            <label>
              Religión
              <input
                type="text"
                value={religion}
                onChange={(e) => setReligion(e.target.value)}
                required
                placeholder="Ej: Católica"
              />
            </label>
            <button type="submit" className="submit-button">Continuar</button>
          </form>
        </div>
      ) : (
        <div className="contact-container">
          <a href="/Login" className="back-link">Volver</a>
          <div className="progress-indicator">
            <div className="step completed">1</div>
            <div className="step completed">2</div>
            <div className="step completed">3</div>
          </div>
          <h2>Ingresa tus datos</h2>
          <form onSubmit={handleContact}>
            <label>
              Correo electrónico
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Ej: correo@mail.com"
              />
            </label>
            <label>
              Celular
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                placeholder="Ej: 123456789"
              />
            </label>
            <label>
              Nombre de usuario
              <input
                type="text"
                value={username}
                disabled
              />
            </label>
            <label>
              Contraseña
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Ingresa tu contraseña"
              />
            </label>
            <label>
              Confirmar contraseña
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirma tu contraseña"
              />
            </label>
            <button type="submit" className="submit-button">Registrar</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Register;
