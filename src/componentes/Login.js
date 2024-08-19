import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Slider from './Slider';
import './stile/login.css';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Obtener el tipo de usuario seleccionado desde el estado
  const userType = location.state?.userType;

  // Efecto para verificar si el usuario ya está autenticado
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/Dash/Inicio', { state: { user: 'Nombre del Paciente' } });
    }
  }, [navigate]);

  // Función que maneja el inicio de sesión
  const handleLogin = (e) => {
    e.preventDefault();

    // Lógica de autenticación simulada
    if (userType === 'client' && email === 'client@example.com' && password === 'clientPass') {
      localStorage.setItem('token', 'dummy-token');
      navigate('/Dash/Inicio', { state: { user: 'Nombre del Paciente' } });
    } else if (userType === 'staff' && email === 'staff@example.com' && password === 'staffPass') {
      localStorage.setItem('token', 'dummy-token');
      navigate('/Dash/Inicio_Personal', { state: { user: 'Nombre del Personal' } });
    } else {
      setError('Acceso denegado: tipo de usuario no corresponde');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  };

  return (
    <div className="login-container">
      <div className="slider-container">
        <Slider />
      </div>
      <div className="login-form">
        <h2>Inicia sesión</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Correo electrónico</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Ingresa tu correo electrónico" />
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Ingresa tu contraseña" />
          </div>
          <div className="forgot-password">
            <a href="/OlvidePass">Olvidé mi contraseña</a>
          </div>
          <button type="submit">Ingresar</button>
          {/* Solo mostrar la opción de registro si el tipo de usuario es cliente */}
          {userType === 'client' && (
            <div className="register">
              <p>¿No tienes cuenta? <a href="/RegistroUsuario">Regístrate</a></p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;

