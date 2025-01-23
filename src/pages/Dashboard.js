import React, { useEffect, useState } from 'react';
import Chart from '../components/Chart';
import { getEMAs, getStatus } from '../services/Api';
import BotStatus from '../components/BotStatus';
import ActiveTrades from '../components/activeTrades';
import { getToken } from '../services/Auth';
import { jwtDecode } from 'jwt-decode';
import './dashboard.css'


const Dashboard = () => {
  const [emasData, setEmasData] = useState([]); 
  const [botStatus, setBotStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isValidSession, setIsValidSession] = useState(false);


  useEffect(() => {
    const checkAuth = () => {
      const token = getToken();
      if (!token) return false;

      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        return decodedToken.exp > currentTime;
      } catch (error) {
        return false;
      }
    };

    const fetchData = async () => {
      try {
        const emas = await getEMAs();
        setEmasData(emas);  
        
        const status = await getStatus();
        setBotStatus(status);
        
        setIsValidSession(checkAuth());

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
      <h2 className='status'>Status</h2>
      <div className="row cont">
        <div className='col-12'>
          <BotStatus apiData={botStatus}></BotStatus>
        </div>
        <hr className='hr'></hr>
        <div className="col-12 ema">
          <h3 className='emasTittle'>Exponential moving averages - [1h]</h3>
           {emasData.length > 0 ? (
           <Chart apiData={emasData} /> 
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