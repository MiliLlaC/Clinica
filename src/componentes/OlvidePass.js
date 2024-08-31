import React, { useState } from 'react';
import './stile/contrasena.css';

const OlvidePass = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1); // 1 para correo, 2 para nueva contraseña
  const [error, setError] = useState('');

  const handleEmailSubmit = (event) => {
    event.preventDefault();
    // Enviar el correo electrónico con el enlace de verificación.
    console.log('Correo electrónico enviado a:', email);
    setStep(2); // Pasar a la siguiente etapa (establecer nueva contraseña)
  };

  const handlePasswordSubmit = (event) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    // lógica para actualizar la contraseña en el servidor.
    console.log('Nueva contraseña establecida para:', email);
    alert('Tu contraseña ha sido restablecida con éxito.');
    // Redirigir al usuario a la página de inicio de sesión
    window.location.href = '/Login';
  };

  return (
    <div className="olvide-contrasena-container">
      <h2>{step === 1 ? 'Recupera tu cuenta' : 'Establecer nueva contraseña'}</h2>
      {step === 1 ? (
        <form onSubmit={handleEmailSubmit}>
          <div className="input-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              placeholder="Ingresa tu correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-enviar">Enviar</button>
        </form>
      ) : (
        <form onSubmit={handlePasswordSubmit}>
          <div className="input-group">
            <label htmlFor="new-password">Nueva contraseña</label>
            <input
              type="password"
              id="new-password"
              placeholder="Ingresa tu nueva contraseña"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="confirm-password">Confirmar contraseña</label>
            <input
              type="password"
              id="confirm-password"
              placeholder="Confirma tu nueva contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="btn-enviar">Restablecer contraseña</button>
        </form>
      )}
      <div className="volver-inicio">
        <a href="/Login">Volver al inicio de sesión</a>
      </div>
    </div>
  );
};

export default OlvidePass;
