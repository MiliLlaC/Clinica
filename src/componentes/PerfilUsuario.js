// componentes/Perfil.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './stile/perfil.css'; // Asegúrate de crear este archivo CSS

const Perfil = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('access_token'); // Obtener el token de autenticación
        const response = await axios.get('http://127.0.0.1:8000/api/profile/', {
          headers: {
            'Authorization': `Bearer ${token}` // Incluir el token en la cabecera de autorización
          }
        });
        setProfileData(response.data.data); // Guardar los datos del perfil en el estado
      } catch (error) {
        console.error('Error al obtener los datos del perfil:', error);
      }
    };

    fetchProfileData();
  }, []);

  if (!profileData) {
    return <div>Cargando...</div>; // Mostrar un mensaje de carga mientras se obtienen los datos
  }
  const { person, user } = profileData;

  return (
    <div className="perfil-container">
      <a href="#" className="volver">Volver</a>
      <h2>Mi Perfil</h2>
      <div className="datos-personales">
        <h3>DATOS PERSONALES</h3>
        <p><strong>Nombres y apellidos:</strong> {`${person.first_name} ${person.last_name}`}</p>
        <p><strong>DNI:</strong> {person.dni}</p>
        <p><strong>Fecha de nacimiento:</strong> {person.birth_date}</p>
        <p><strong>Ocupación:</strong> {person.occupation}</p>
        <p><strong>Religión:</strong> {person.religion}</p>
        <p><strong>Nivel de educación:</strong> {person.education_level}</p>
        <p><strong>Área:</strong> {person.area}</p>
        <p><strong>Dirección:</strong> {person.address}</p>
        <p><strong>Teléfono:</strong> {person.phone}</p>
        <p><strong>Estado civil:</strong> {person.marital_status || "No especificado"}</p>
      </div>
      <div className="datos-contacto">
        <h3>DATOS DE CONTACTO</h3>
        <p><strong>Correo electrónico:</strong> {user.email}</p>
      </div>
    </div>
  );
};

export default Perfil;
