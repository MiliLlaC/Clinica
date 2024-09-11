import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserTypeSelection from './componentes/TipoUsuario';
import Login from './componentes/Login';
import Register from './componentes/RegistroUsuario';
import Dashboard from './componentes/Dash';
import TestSelection from './componentes/SelecTest';
import TestWelcome from './componentes/TestWelcom';
import Quiz from './componentes/Quiz';
import Perfil from './componentes/PerfilUsuario';
import HistoriaClinica from './componentes/Historia';
import MisCitas from './componentes/MisCitas';
import Resultados from './componentes/Resultados';
import Cuestionario from './componentes/Cuestionario';
import Facturacion from './componentes/Facturacion';
import Contactos from './componentes/Contactos';
import Inicio from './componentes/Inicio';
import AgendarCita from './componentes/AgendarCita'; // Importa AgendarCita
import AgendarPorMedico from './componentes/AgendarporMedico';
import AgendarPorServicio from './componentes/AgendarporServicio'; // Importa AgendarPorEspecialidad
import ConfigurarCita from './componentes/ConfigurarCita';
import CitaConfigurarPsico from './componentes/CitaConfigurarPsico';
import SeleccionarHorario from './componentes/SeleccionaHora';
import SeleccionarSeguro from './componentes/SelecSeguro';
import OlvidePass from './componentes/OlvidePass';
import Resumen from './componentes/Resumen';
import RegistrarPaciente from './componentes/RegistarPaciente';
import './componentes/stile/global.css';
import './componentes/stile/App.css';
import './componentes/stile/agendarCita.css';
import AgendarPorEspecialidad from './componentes/AgendarporEspecialidad';


const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<UserTypeSelection />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/RegistroUsuario" element={<Register />} />
        <Route path="/OlvidePass" element={<OlvidePass />} />
        <Route path="/Dash" element={<Dashboard />}>
          <Route path="Inicio" element={<Inicio />} />
          <Route path="Perfil" element={<Perfil />} />
          <Route path="Historia" element={<HistoriaClinica />} />
          <Route path="Citas" element={<MisCitas />} />
          <Route path="Resultados" element={<Resultados />} />
          <Route path="Cuestionario" element={<Cuestionario />} />
          <Route path="Facturacion" element={<Facturacion />} />
          <Route path="Contactos" element={<Contactos />} />
          <Route path="AgendarCita" element={<AgendarCita />} /> {/* Nueva ruta para AgendarCita */}
          <Route path="AgendarporMedico" element={<AgendarPorMedico />} />
          <Route path="AgendarporServicio" element={<AgendarPorServicio />} />
          <Route path="CitaConfigurarPsico" element={<CitaConfigurarPsico />} />
          <Route path="ConfigurarCita" element={<ConfigurarCita />} />
          <Route path="RegistrarPaciente" element={<RegistrarPaciente />} />
          <Route path="SeleccionaHora" element={<SeleccionarHorario />} /> 
          <Route path="SelecSeguro" element={<SeleccionarSeguro />} /> 
          <Route path='Resumen' element={<Resumen />} /> 
          <Route path='SelecTest' element={<TestSelection/>} /> {/* Nueva ruta para TestSelect */}
        </Route>
        {/*<Route path="/TestSelect" element={<TestSelection />} />
        <Route path="/TestWelcom" element={<TestWelcome />} />
        <Route path="/Quiz" element={<Quiz />} />*/}
      </Routes>
    </Router>
  </React.StrictMode>
);
