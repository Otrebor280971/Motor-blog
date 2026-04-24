import './Post.css'
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function Post() {

    const { id_post } = useParams();
    const [post, setPost] = useState({});
    
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/posts/` + id_post)
            .then((res) => res.json())
            .then((data) => setPost(data));
    }, [id_post]);

    return (
        <div className="post-container">
            {post.image && <img className="post-image" src={'../' + post.image} alt="Imagen" />}
            
            <h1 className="post-title">{post.title}</h1>
            <h2 className="post-author">Escrito por: <span>{post.author_name}</span></h2>

            <div className="modal-specs">
              <p><strong>Motor:</strong> {post.engine}</p>
              <p><strong>Potencia:</strong> {post.hp} HP</p>
              <p><strong>Peso:</strong> {post['weight-kg']} kg</p>
              <p><strong>Velocidad Max:</strong> {post.max_speed_kmh} km/h</p>
            </div>
            
            <div className="post-content">
                <p>{post.text}</p>
            </div>
        </div>
    );
}