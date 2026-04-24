import './Home.css'
import { Link } from 'react-router'

function Home() {
  return (
    <div className="home-container">
      <div className="title-section">
        <h1 className="title">Coches y motos</h1>
        <p className="subtitle">
          Dentro de este blog podrás conocer acerca de algunos de los coches y motos más icónicos y emocionantes
          tanto modernos como clásicos.
        </p>
        <Link to="/blog" className="cta-button">Ir a los artículos</Link>
      </div>
      
      <h2>Como parte del contenido podrás encontrar:</h2>

      <div className="features">
        <div className="feature-box">
          <h2>Motos</h2>
          <p>Datos sobre las mejores máquinas de 2 ruedas del mercado.</p>
        </div>
        <div className="feature-box">
          <h2>Coches</h2>
          <p>Desde deportivos de lujo hasta los clásicos todoterreno.</p>
        </div>
      </div>
    </div>
  )
}

export default Home