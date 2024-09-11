import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './stile/agendarPorMedico.css';
import psicologoimg from '../recursos/imagenes/psicologo.png';
import buscarimg from '../recursos/imagenes/buscar.png';

const AgendarPorMedico = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPsychologists, setFilteredPsychologists] = useState([]);
  const navigate = useNavigate();

  const psychologists = [
    { id: 1, name: 'Christian Jorge Pino Melgar', specialty: 'Neurocirugía' },
    { id: 2, name: 'Emeric Jorge Macedo Vendezu', specialty: 'Pediatría' },
    { id: 3, name: 'Jesus Jorge Jove Manrique', specialty: 'Cirugía Torácica Y Cardiovascular' },
    // Agrega más psicólogos según sea necesario
  ];

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === '') {
      setFilteredPsychologists([]); // Limpiar los resultados de búsqueda si el input está vacío
    } else {
      const filtered = psychologists.filter(psico =>
        psico.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredPsychologists(filtered);
    }
  };

  const clearSearch = () => {
    setSearchTerm(''); // Limpiar el input
    setFilteredPsychologists([]); // Limpiar los resultados de búsqueda
  };

  const handleSelectPsychologist = (psicologo) => {
    navigate('/Dash/CitaConfigurarPsico', {
      state: {
        psicologoSeleccionado: psicologo.name,
        especialidadSeleccionada: psicologo.specialty
      }
    });
  };

  return (
    <div className="agendar-por-medico-container">
      <button className="volver-btn" onClick={() => window.history.back()}>Volver</button>
      <h2>Agendar por Psicólogo</h2>
      <div className="buscar-medico">
        <input
          type="text"
          placeholder="Ingresa el nombre del psicólogo"
          className="input-buscar-medico"
          value={searchTerm}
          onChange={handleSearch}
        />

        {/* Mostrar el icono de búsqueda y la X */}
        <div className="search-icon-container">
          {searchTerm ? (
            <span className="clear-icon" onClick={clearSearch}>&times;</span>
          ) : (
            <img src={buscarimg} alt="buscar" className="search-icon" />
          )}
        </div>
      </div>

      {filteredPsychologists.length > 0 && (
        <div className={`resultados-busqueda ${filteredPsychologists.length === 1 ? 'single-result' : ''}`}>
          {filteredPsychologists.map((psico) => (
            <div
              key={psico.id}
              className="resultado-item"
              onClick={() => handleSelectPsychologist(psico)}
            >
              {psico.name} - {psico.specialty}
            </div>
          ))}
        </div>
      )}
      
      <div className="medico-info">
        <img src={psicologoimg} alt="Psicologo" className="icono-psico" />
        <p>Aquí mostraremos a los Psicólogos de tus últimas consultas</p>
      </div>
    </div>
  );
};

export default AgendarPorMedico;
