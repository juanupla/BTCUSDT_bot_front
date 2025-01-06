import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/dashboard';
import Operations from './pages/Operations';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div className="col-2">
            <Sidebar />
          </div>
          <div className="col-10">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/operations" element={<Operations />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
