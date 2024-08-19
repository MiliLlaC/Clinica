// componentes/Perfil.js
import React, { useEffect, useState } from 'react';
import './stile/perfil.css'; // Asegúrate de crear este archivo CSS

const Perfil = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    // Aquí debes llamar a tu API para obtener los datos del perfil
    fetch('URL_DE_TU_API') // Reemplaza con la URL de tu API
      .then(response => response.json())
      .then(data => setProfileData(data))
      .catch(error => console.error('Error al obtener los datos del perfil:', error));
  }, []);

  if (!profileData) {
    return <div>Cargando...</div>; // Mostrar un mensaje de carga mientras se obtienen los datos
  }

  return (
    <div className="perfil-container">
      <a href="#" className="volver">Volver</a>
      <h2>Mi Perfil</h2>
      <div className="datos-personales">
        <h3>DATOS PERSONALES</h3>
        <p><strong>Nombres y apellidos:</strong> {profileData.nombreCompleto}</p>
        <p><strong>DNI:</strong> {profileData.dni}</p>
        <p><strong>Fecha de nacimiento:</strong> {profileData.fechaNacimiento}</p>
        <p><strong>Número de Historia Clínica:</strong> {profileData.numeroHistoriaClinica}</p>
      </div>
      <div className="datos-contacto">
        <h3>DATOS DE CONTACTO</h3>
        <p><strong>Número de celular:</strong> {profileData.numeroCelular} <a href="#" className="editar">Editar</a></p>
        <p><strong>Correo electrónico:</strong> {profileData.correoElectronico}</p>
      </div>
    </div>
  );
};

export default Perfil;
