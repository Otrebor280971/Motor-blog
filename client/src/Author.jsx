import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router";
import './Auth.css';

export default function Author() {
    const { id_author } = useParams();
    const [author, setAuthor] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/authors/` + id_author, {
            method: "GET",
            credentials: "include"
        })
        .then((res) => {
            if (res.status === 401) {
                navigate('/login');
                return null;
            }
            if (res.status === 404) {
                throw new Error("Autor no encontrado");
            }
            return res.json();
        })
        .then((data) => {
            if (data) setAuthor(data);
            setLoading(false);
        })
        .catch((error) => {
            console.log(error);
            setLoading(false);
        });
    }, [id_author, navigate]);

    if (loading) return <div className="auth-container"><h2>Cargando perfil...</h2></div>;
    if (!author) return <div className="auth-container"><h2>No se encontró el autor.</h2></div>;

    return (
        <div className="auth-container">
            <div className="dashboard-card">
                <div className="profile-header">
                    <h1>¡Hola, {author.name}!</h1>
                    <span className="badge">Escritor Autorizado</span>
                </div>
                
                <div className="profile-info">
                    <p><strong>ID de Sistema:</strong> #{author.id_author}</p>
                    {author.username && <p><strong>Usuario:</strong> @{author.username}</p>}
                </div>

                <div className="dashboard-actions">
                    <Link to="/newpost" className="action-btn new-post-btn">
                        Escribir Nuevo Post
                    </Link>
                    
                    <button onClick={() => navigate('/blog')} className="action-btn secondary-btn">
                        Ir al Blog
                    </button>
                </div>
            </div>
        </div>
    )
}