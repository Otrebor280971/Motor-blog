import './App.css'
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router'
import Blog from './Blog.jsx'
import Home from './Home.jsx'
import Contact from './Contact.jsx'
import Post from './Post.jsx'
import NewPost from './NewPost.jsx'
import Author from './Author.jsx'
import Login from './Login.jsx'

function App() {
  const navigate = useNavigate();
  const location = useLocation(); 
  const authId = localStorage.getItem('authId');

  const handleLogout = () => {
      fetch(`${import.meta.env.VITE_API_URL}/logout`, { credentials: "include" })
          .then(() => {
              localStorage.removeItem('authId');
              navigate('/login');
          })
          .catch((error) => console.log('Error al salir:', error));
  };

  return (
    <>
      <div className='navBar'>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contact">Contacto</Link>
          
          {authId ? (
            <>
              <Link to={`/autores/${authId}`}>Mi Panel</Link>
              <Link to="/newpost">Nuevo Post</Link>
              <button onClick={handleLogout} className="logout-btn">Salir</button>
            </>
          ) : (
            <Link to="/login" className="login-link">Acceso</Link>
          )}
        </nav>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog/:id_post" element={<Post />} />
        <Route path='/newpost' element={<NewPost />} />
        <Route path='/autores/:id_author' element={<Author/>} />
        <Route path='/login' element={<Login/>} />
      </Routes>
    </>
  )
}

export default App