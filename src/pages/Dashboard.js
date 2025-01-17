import React, { useEffect, useState } from 'react';
import Chart from '../components/Chart';
import { getEMAs, getStatus } from '../services/Api';
import BotStatus from '../components/BotStatus';
import ActiveTrades from '../components/activeTrades';
import './dashboard.css'


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
    <div className='container-fluid pan'>
      <h2 className='status'>Status</h2>
      <div className="row cont">
        <div className='col-12'>
          <BotStatus apiData={botStatus}></BotStatus>
        </div>
        <hr className='hr'></hr>
        <div className="col-12 ema">
          <h3 className='emasTittle'>Exponential moving averages</h3>
          {emasData ? (
            <Chart apiData={emasData} /> // Pasamos los datos como props
          ) : (
            <p>No hay datos disponibles para mostrar.</p>
          )}
        </div>
        <div className='col-12 activeTrades'>
          <ActiveTrades />  
        </div>
      </div>
    </div>
  );
};

export default Dashboard;