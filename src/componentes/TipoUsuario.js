import React from 'react';
import { useNavigate } from 'react-router-dom';
import './stile/tipo_user.css'; // Asegúrate de crear el archivo de estilos correspondiente
import iconp from '../recursos/imagenes/doctor.png';
import iconc from '../recursos/imagenes/paciente.png';
import icon from '../recursos/imagenes/Logo_clin.jpg';
import fondo1 from '../recursos/imagenes/fondo1.jpg';
const UserTypeSelection = () => {
  const navigate = useNavigate();

  const handleUserTypeSelection = (userType) => {
    navigate('/Login', { state: { userType } }); // Navega a la página de login con el tipo de usuario seleccionado
  };

  return (
    <div className="usertype">
        <div className='imagen'>
            <img src={fondo1} all="fondo"></img>
        </div>
        <div className='usercont'>
            <div className='logouser'>
              <img src={icon} alt="icono"/>
            </div>
            {/*<h2>Selecciona el tipo de usuario</h2>*/}
            <button onClick={() => handleUserTypeSelection('client')} class="icon-button">
                <img src={iconc}  alt="client" class="button-icon"/> Cliente 
            </button>      
            <button onClick={() => handleUserTypeSelection('staff')} class="icon-button">
                <img src={iconp}  alt="staff" class="button-icon"/> Personal
            </button>                      
        </div>
    </div>
  );
};

export default UserTypeSelection;

