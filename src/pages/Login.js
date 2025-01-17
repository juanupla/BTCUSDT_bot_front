// components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../services/Api';
import './Login.css'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postLogin(email, password);
      if (response.status === 'OK') {
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Error en el login. Verifica tus credenciales.');
    }
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
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;