import { useState } from "react";
import { useNavigate } from "react-router";
import './Auth.css';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        const formInfo = new FormData();
        formInfo.append("username", username);
        formInfo.append("password", password);

        fetch(`${import.meta.env.VITE_API_URL}/login`, {
            method: "POST",
            credentials: "include",
            body: formInfo,
        })
        .then(async (res) => {
            if (!res.ok) {
                throw new Error('Credenciales incorrectas');
            }
            return res.json();
        })
        .then((data) => {
            console.log("Login exitoso:", data);
            localStorage.setItem('authId', data.id_author);
            navigate('/autores/' + data.id_author); 
        })
        .catch((error) => {
            console.log(error);
            setErrorMsg('Usuario o contraseña incorrectos.');
        });
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1>Iniciar Sesión</h1>
                <p className="auth-subtitle">Accede al panel de escritores</p>
                
                {errorMsg && <div className="error-message">{errorMsg}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label>Usuario:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Contraseña:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    
                    <button type="submit" className="submit-btn">Entrar</button>
                </form>
            </div>
        </div>
    );
}