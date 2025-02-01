// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/dashboard';
import Performance from './pages/Performance';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import ControlPanel from './pages/controlPanel';
import './App.css'

const App = () => {
  return (
    <Router>
      <Header/>
      <div className="container-fluid bg-black">
        <div className="row">
          <div className="col-12 AppCont">
            <Routes>
              {/* Rutas públicas */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/performance" element={<Performance/>} />
              <Route path="/control-panel" element={<ControlPanel/>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;