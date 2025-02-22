import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../services/Api';
import Swal from 'sweetalert2'
import './Login.css'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postLogin(email, password);
      if (response.status === 'OK') {
        navigate('/dashboard', { replace: true });
        window.location.reload();
      }
    } catch (err) {
      setError('Error al ingrear. Verifica tus credenciales.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg"
          alt="Bitcoin Logo"
          className="login-logo"
        />
        <h1 className="welcome-text">Welcome Back!</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <div className="position-relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="pe-5"
            />
            <button
              type="button"
              className="btn btn-link position-absolute end-0 top-50 translate-middle-y eyesBtn"
              onClick={togglePasswordVisibility}
              style={{ 
                border: 'none', 
                background: 'none',
                padding: '0 12px',
                marginTop: '-2px',
                width: 'auto'}}
            >
              <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
            </button>
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;