import React, { useEffect, useState } from 'react';
import Chart from '../components/Chart';
import { getEMAs, getStatus } from '../services/Api';

const Dashboard = () => {
  const [emasData, setEmasData] = useState(null);  // Cambié el estado inicial
  const [botStatus, setBotStatus] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const emas = await getEMAs();
        setEmasData(emas);  // Aquí ya no procesamos los datos, los pasamos directamente
        
        const status = await getStatus();
        setBotStatus(status);
        
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar los datos:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Dashboard</h2>
      <div className="row">
        <div className="col-md-12">
          <h3>EMAs</h3>
          <Chart />
        </div>
        <div className="col-md-6">
          <h3>Bot Status</h3>
          <p>Running</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;