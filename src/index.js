import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';  // El componente principal
import './index.css';     // Si tienes estilos globales

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')  // Aquí se inyecta la app en el HTML
);
