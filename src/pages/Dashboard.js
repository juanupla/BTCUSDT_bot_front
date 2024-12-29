import React, { useEffect, useState } from 'react';
import Chart from '../components/Chart';


// Usa:
import { getPerformancePerMonth } from '../services/Api';



const Dashboard = () => {
  const [performanceData, setPerformanceData] = useState({ labels: [], values: [] });

  useEffect(() => {
    // Llamada a la API para obtener datos de rendimiento
    getPerformancePerMonth().then((data) => {
      setPerformanceData({
        labels: data.labels,
        values: data.values,
      });
    });
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <Chart data={performanceData} />
    </div>
  );
};

export default Dashboard;
