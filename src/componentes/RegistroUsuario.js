import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './stile/registro.css';

const Register = () => {
  const [step, setStep] = useState(1);
  const [documentNumber, setDocumentNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [birthPlace, setBirthPlace] = useState(''); // Cambiado a seleccionar por ID
  const [gender, setGender] = useState('');
  const [workCenter, setWorkCenter] = useState('');
  const [occupation, setOccupation] = useState('');
  const [religion, setReligion] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [workCenters, setWorkCenters] = useState([]);
  const [locations, setLocations] = useState([]); // Almacena las locations

  const navigate = useNavigate();

  // Función para obtener los centros de labores
  useEffect(() => {
    const fetchWorkCenters = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/companys/');
        setWorkCenters(response.data);
      } catch (error) {
        console.error('Error al obtener los centros de trabajo:', error);
      }
    };

    fetchWorkCenters();
  }, []);

  // Función para obtener las locations
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/locations/');
        setLocations(response.data);
      } catch (error) {
        console.error('Error al obtener las locations:', error);
      }
    };

    fetchLocations();
  }, []);

  // Función para registrar el cliente
  const handleRegisterClient = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const clientData = {
      username: username,
      password: password,
      email: email,
      patient: {
        dni: documentNumber,
        first_name: firstName,
        last_name: lastName,
        gender: gender,
        birth_date: birthDate,
        address: "789 Oak St", // Agregar un input
        phone: phoneNumber,
        company: workCenter,
        location: birthPlace,
        language: "Spanish", // Agregar un input
        occupation: occupation,
        religion: religion,
        education_level: "Bachelor's", // Agregar un input
        area: "Architecture", // Agregar un input
        email: email,
      },
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register/client', clientData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 201) {
        console.log(response);
        localStorage.setItem("access_token", response.data.data.access);
        localStorage.setItem("refresh_token", response.data.data.refresh);
        localStorage.setItem("user_name", response.data.data.user_name);
        localStorage.setItem("user_id", response.data.data.user_id);
        navigate('/Dash/Inicio', { state: { user: username } });
      }
    } catch (error) {
      console.error('Error al registrar al cliente:', error);
      alert('Hubo un error al registrar el cliente');
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
          <form onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
            <label>
              Nº de DNI
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
              Apellidos
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                placeholder="Ej: Pérez"
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
              <select value={birthPlace} onChange={(e) => setBirthPlace(e.target.value)} required>
                <option value="">Selecciona tu lugar de nacimiento</option>
                {locations.map(location => (
                  <option key={location.id} value={location.id}>
                    {`${location.department}, ${location.province}, ${location.district}`}
                  </option>
                ))}
              </select>
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
          <form onSubmit={(e) => { e.preventDefault(); setStep(3); }}>
            <label>
              Sexo
              <select value={gender} onChange={(e) => setGender(e.target.value)} required>
                <option value="">Selecciona tu sexo</option>
                <option value="F">Femenino</option>
                <option value="M">Masculino</option>
                <option value="O">Otro</option>
              </select>
            </label>
            <label>
              Centro de labores
              <select value={workCenter} onChange={(e) => setWorkCenter(e.target.value)} required>
                <option value="">Selecciona tu centro de labores</option>
                {workCenters.map(center => (
                  <option key={center.id} value={center.id}>
                    {center.name}
                  </option>
                ))}
              </select>
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
          <form onSubmit={handleRegisterClient}>
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
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Nombre de usuario"
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
