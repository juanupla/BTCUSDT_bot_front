import React, { useEffect, useState } from 'react';
import Chart from '../components/Chart';
import { getEMAs, getStatus } from '../services/Api';
import BotStatus from '../components/BotStatus';


const Dashboard = () => {
  const [emasData, setEmasData] = useState([]);  // Cambié el estado inicial
  const [botStatus, setBotStatus] = useState(false);
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
        <div className='col-12'>
          {botStatus ? (<BotStatus apiData={botStatus}></BotStatus>):(false)}
        </div>
        <div className="col-12">
          <h3>EMAs</h3>
          {emasData ? (
            <Chart apiData={emasData} /> // Pasamos los datos como props
          ) : (
            <p>No hay datos disponibles para mostrar.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;