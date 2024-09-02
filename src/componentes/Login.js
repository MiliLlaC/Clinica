import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Slider from "./Slider";
import axios from "axios";
import "./stile/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Obtener el tipo de usuario seleccionado desde el estado
  const userType = location.state?.userType;

  // Efecto para verificar si el usuario ya está autenticado
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const userName = localStorage.getItem("user_name");
    if (token) {
      navigate("/Dash/Inicio", { state: { user: userName } });
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Solicitud al backend para iniciar sesión
      const response = await axios.post("http://127.0.0.1:8000/api/login/", {
        username: email,
        password: password,
        type: userType === "staff" ? "P" : "C",
      });

      // Verificar si el login fue exitoso
      if (response.data.success) {
        // Si el login es exitoso, guardar los tokens en localStorage
        const { id, name, access, refresh } = response.data.data;
        localStorage.setItem("access_token", access);
        localStorage.setItem("refresh_token", refresh);
        localStorage.setItem("user_name", name);
        localStorage.setItem("user_id", id);

        // Redirigir al usuario a la página correspondiente
        if (userType === "staff") {
          navigate("/Dash/Inicio_Personal", {
            state: { user: "Nombre del Personal" },
          });
        } else {
          navigate("/Dash/Inicio");
        }
      } else {
        // Si success es false, manejar el error basado en el mensaje o en los errores
        setError(response.data.message || "Error de autenticación");
      }
    } catch (err) {
      // Manejando errores de red o del servidor
      if (err.response && err.response.data) {
        setError(
          "Error: " + (err.response.data.message || "Credenciales incorrectas")
        );
      } else {
        setError("Error: No se pudo conectar con el servidor");
      }
    }

    // Opcional: Mostrar el error durante un tiempo limitado
    setTimeout(() => {
      setError("");
    }, 5000);
  };

  // Función que maneja el inicio de sesión
  /*const handleLogin = (e) => {
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
  };*/

  return (
    <div className="login-container">
      <div className="slider-container">
        <Slider />
      </div>
      <div className="login-form">
        <h2>Inicia sesión</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Ingresa tu correo electrónico"
            />
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Ingresa tu contraseña"
            />
          </div>
          <div className="forgot-password">
            <a href="/OlvidePass">Olvidé mi contraseña</a>
          </div>
          <button type="submit">Ingresar</button>
          {/* Solo mostrar la opción de registro si el tipo de usuario es cliente */}
          {userType === "client" && (
            <div className="register">
              <p>
                ¿No tienes cuenta? <a href="/RegistroUsuario">Regístrate</a>
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
