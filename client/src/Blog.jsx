import './Blog.css'
import { CardList } from './cards.jsx'
import { useState, useEffect } from 'react'
import { Link } from 'react-router'

function Blog() {
  const [entries, setEntries] = useState([]);
  const [filteredText, setFilteredText] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState(null); 


  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/posts`)
      .then((res) => res.json())
      .then((posts) => setEntries(posts))
      .catch((error) => console.error("Error obteniendo los posts:", error));
  }, []);

  function handleChange(e) {
    setFilteredText(e.target.value);
  }

  function openModal(vehicle) {
    setSelectedVehicle(vehicle);
  }

  function closeModal() {
    setSelectedVehicle(null);
  }

  return (
    <>
      <h1 className='title'>Contenido</h1>
      <div className='filter'>
        <p>Buscar por título</p>
        <input type='text' value={filteredText} onChange={handleChange}></input>
      </div>
      

      <CardList entries={entries} filteredText={filteredText} onCardClick={openModal}></CardList>

      <Link to="/newpost" className="newpost-button">Crear Nuevo Post</Link>
    </>
  )
}

export default Blog