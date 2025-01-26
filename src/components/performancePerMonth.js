import React, { useState, useEffect } from 'react';
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar } from 'recharts';
import { getPerformancePerMonth, getPrivatePerformancePerMonth } from '../services/Api';
import { getToken, removeToken } from '../services/Auth';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';
import './performancePerMonth.css';

const PerformancePerMonth = () => {
  const [loading, setLoading] = useState(true);
  const [isValidSession, setIsValidSession] = useState(false);
  const [data, setData] = useState([]);

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
        const validSession = checkAuth();
        setIsValidSession(validSession);

        const performanceData = validSession
          ? await getPrivatePerformancePerMonth()
          : await getPerformancePerMonth();
        setData(performanceData);
        setLoading(false);
      } catch (error) {
        console.error('Error loading performance data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  const resultData = data.map((item) => ({
    name: `${item.year}-${item.month}`,
    performance: item.monthlyPerformance,
    netIncome: isValidSession ? item.netIncome : undefined
  }));

  return (
        <div className="bg-gray-900 p-8 rounded-lg flex justify-center pan12">
            <div className='row'>
                <div className='col-12'>
                    <h2 className="monthly-performance-title">Monthly Performance</h2>
                </div>
                
            </div>
            <BarChart width={800} height={400} data={resultData}>
                    <XAxis dataKey='name' fontSize={12} />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="performance" fill="#28a745" />
                        {isValidSession && (
                            <Bar dataKey="netIncome" fill="#ff7300" />
                        )}
                    </BarChart>
        </div>
  );
};

export default PerformancePerMonth;