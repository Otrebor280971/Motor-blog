import './Contact.css'

function Contact() {
  return (
    <div className="contact-container">
      <h1 className="title">Ponte en contacto</h1>
      <p className="contact-text">¿Tienes alguna sugerencia para el blog o te gustaría ver algún vehículo específico? ¡Escríbenos!</p>
      
      <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
        <div className="input-group">
          <label htmlFor="name">Nombre</label>
          <input type="text" id="name" placeholder="Tu nombre" />
        </div>
        
        <div className="input-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input type="email" id="email" placeholder="tucorreo@email.com" />
        </div>
        
        <div className="input-group">
          <label htmlFor="message">Mensaje</label>
          <textarea id="message" rows="5" placeholder="¿De qué quieres hablar?"></textarea>
        </div>
        
        <button type="submit" className="submit-btn">Enviar Mensaje</button>
      </form>
    </div>
  )
}

export default Contact