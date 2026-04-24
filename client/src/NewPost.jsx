import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import './NewPost.css';

export default function NewPost() {
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [formData, setFormData] = useState({
        title: '', text: '', engine: '', hp: '', weight_kg: '', max_speed_kmh: ''
    });

    useEffect(() => {
        const authId = localStorage.getItem('authId');
        if (!authId) {
            navigate('/login');
        }
    }, [navigate]);

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function handleFile(e) {
        if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0]);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        const authId = localStorage.getItem('authId');
        
        const formInfo = new FormData();
        Object.keys(formData).forEach(key => formInfo.append(key, formData[key]));
        formInfo.append('id_author', authId);
        if (image) formInfo.append('image', image);

        fetch(`${import.meta.env.VITE_API_URL}/posts/new`, {
            method: "POST",
            credentials: "include",
            body: formInfo,
        })
        .then(() => {
            alert("¡Vehículo publicado!");
            navigate('/');
        });
    }

    return (
        <div className="newpost-container">
            <h1 className="newpost-title">Crear Nuevo Vehículo</h1>
            
            <form className="newpost-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Título del Vehículo:</label>
                    <input type='text' name='title' value={formData.title} onChange={handleChange} required />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Motor:</label>
                        <input type='text' name='engine' value={formData.engine} onChange={handleChange} />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Caballos de Fuerza (HP):</label>
                        <input type='number' name='hp' value={formData.hp} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Peso (kg):</label>
                        <input type='number' name='weight_kg' value={formData.weight_kg} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Velocidad Máxima (km/h):</label>
                        <input type='number' name='max_speed_kmh' value={formData.max_speed_kmh} onChange={handleChange} />
                    </div>
                </div>

                <div className="form-group">
                    <label>Historia / Descripción:</label>
                    <textarea name='text' rows="6" value={formData.text} onChange={handleChange} required></textarea>
                </div>

                <div className="form-group">
                    <label>Imagen del Vehículo:</label>
                    <div className="file-upload-wrapper">
                        <input 
                            type='file' 
                            id="file-upload" 
                            accept="image/*" 
                            onChange={handleFile} 
                            required 
                            className="hidden-file-input" 
                        />
                        
                        <label htmlFor="file-upload" className="custom-file-button">
                            Subir foto
                        </label>
                        
                        <span className="file-name">
                            {image ? image.name : "Ningún archivo seleccionado"}
                        </span>
                    </div>
                </div>

                <button type='submit' className="submit-btn">Guardar Post</button>
            </form>
        </div>
    );
}