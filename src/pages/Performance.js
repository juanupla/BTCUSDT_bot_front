import React, { useEffect, useState } from 'react';
import ClosedTrades from '../components/closedTrades';
import PerformancePerMonth from '../components/performancePerMonth';
import BotStatus from '../components/BotStatus';
import { getStatus } from '../services/Api';
import './Performance.css'


const Performance = () => {

  const [loading, setLoading] = useState(true);
  const [botStatus, setBotStatus] = useState(false);
  


  useEffect(() => {
    const fetchData = async () => {
      try {
        
        setLoading(false);
         const status = await getStatus();
                setBotStatus(status);
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
    <div className='container-fluid pnl'>
      <div className="row cont">
        <div className='col-12 bot-tatus-container'>
          <BotStatus apiData={botStatus}></BotStatus>
        </div>
        <hr className='hr'></hr>
        <div className="col-12 closeTrades mt-1">
          <PerformancePerMonth></PerformancePerMonth>
        </div>
        <div className='col-12 closeTrades mt-2'>
          <ClosedTrades/>
        </div>
      </div>
    </div>
  );
};

export default Performance;
