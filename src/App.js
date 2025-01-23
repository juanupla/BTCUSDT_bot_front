// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/dashboard';
import Performance from './pages/Performance';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <Header/>
      <div className="container-fluid bg-black">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <Routes>
              {/* Rutas públicas */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              
              {/* Ruta protegida para Operations */}
              <Route 
                path="/performance" 
                element={
                  
                    <Performance/>
                  
                } 
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;