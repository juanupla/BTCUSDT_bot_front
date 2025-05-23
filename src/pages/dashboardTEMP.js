import React, { useEffect, useState } from 'react';
import Chart from '../components/Chart';
import { getEMAs, getStatus } from '../services/Api';
import BotStatus from '../components/BotStatus';
import ActiveTrades from '../components/activeTrades';
import WelcomeMessage from '../components/WelcomeMessage';
import './dashboard.css'


const Dashboard = () => {
  const [emasData, setEmasData] = useState([]); 
  const [botStatus, setBotStatus] = useState(false);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    

    const fetchData = async () => {
      try {
        const emas = await getEMAs();
        setEmasData(emas);  
        
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
    <div className='container-fluid panel'>
      <div className="row cont">
        <div className='col-12'>
          <WelcomeMessage></WelcomeMessage>
        </div>
        <div className='col-12 bot-status-cont'>
          <BotStatus apiData={botStatus}></BotStatus>
        </div>
        <hr className='hr'></hr>
        <div className="col-12 ema">
          <h3 className='emasTittle'>Exponential moving averages [4hs]</h3>
           {emasData.length > 0 ? (
           <Chart apiData={emasData} /> 
           ) : (
          <p>No hay datos disponibles para mostrar.</p>
          )}
        </div>
        <div className='col-12 activeTrades mt-2'>
          <ActiveTrades />  
        </div>
      </div>
    </div>
  );
};

export default Dashboard;