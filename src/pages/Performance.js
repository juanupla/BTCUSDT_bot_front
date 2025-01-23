import React, { useEffect, useState } from 'react';
import ClosedTrades from '../components/closedTrades';
import './Performance.css'


const Performance = () => {

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        
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
    <div className='container-fluid pnl'>
      <div className="row cont">
        <div className='col-12 closeTrades'>
          <ClosedTrades/>
        </div>
        <div className="col-12 ">

        </div>
      </div>
    </div>
  );
};

export default Performance;
