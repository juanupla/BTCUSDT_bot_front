import React, { useState, useEffect } from 'react';
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, ResponsiveContainer, Cell } from 'recharts';
import { getPerformancePerMonth, getPrivatePerformancePerMonth } from '../services/Api';
import { getToken } from '../services/Auth';
import { jwtDecode } from 'jwt-decode';
import './performancePerMonth.css';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null;

  const getPerformanceColor = (value) => {
    return value >= 0 ? '#28a745' : '#dc3545';
  };

  return (
    <div className="custom-tooltip">
      <p className="tooltip-label">{label}</p>
      {payload.map((pld, index) => (
        <p 
          key={index} 
          className="tooltip-entry" 
          style={{ 
            color: pld.name === 'Performance' 
              ? getPerformanceColor(pld.value)
              : pld.color 
          }}
        >
          {pld.name}: {
            pld.name === 'Performance' 
              ? `${pld.value}%` 
              : `${pld.value}$`
          }
        </p>
      ))}
    </div>
  );
};

const getBarColor = (value) => {
  return value >= 0 ? '#28a745' : '#dc3545';
};

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

  const resultData = data.map((item) => ({
    name: `${item.year}-${item.month}`,
    performance: item.monthlyPerformance,
    netIncome: isValidSession ? item.netIncome : undefined
  }));

  //custom Legend para el Performance
  const CustomizedLegend = (props) => {
    const { payload } = props;
    
    return (
      <div className="custom-legend">
        {payload.map((entry, index) => {
          // en la entrada de Performance, usamos el ultimo valor de performance para determinar el color
          const color = entry.value === 'Performance'
            ? getBarColor(resultData[resultData.length - 1]?.performance || 0)
            : entry.color;
            
          return (
            <span 
              key={`item-${index}`} 
              className="legend-item"
              style={{ color: color }}
            >
              <span className="legend-color" style={{ backgroundColor: color }}></span>
              {entry.value}
            </span>
          );
        })}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="chart-container bg-gray-900 p-4 md:p-8 rounded-lg w-full">
        <div className="w-full h-[400px] flex items-center justify-center text-white">
          Loading...
        </div>
      </div>
    );
  }

  if (!resultData || resultData.length === 0) {
    return (
      <div className="chart-container bg-gray-900 p-4 md:p-8 rounded-lg w-full">
        <div className="w-full h-[400px] flex items-center justify-center text-white">
          No data available
        </div>
      </div>
    );
  }

  return (
    <div className="chart-container bg-gray-900 p-4 md:p-8 rounded-lg w-full">
      <h2 className="monthly-performance-title">Monthly Performance</h2>
      <div style={{ width: '100%', height: 470 }}>
        <ResponsiveContainer>
          <BarChart 
            data={resultData}
            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              angle={-45}
              textAnchor="end"
              height={60}
              interval={0}
              tick={{ fill: '#cbd5e0' }}
            />
            <YAxis tick={{ fill: '#cbd5e0' }} />
            <Tooltip 
              content={<CustomTooltip />}
              cursor={{ fill: '#1a1a1a' }}
            />
            <Legend content={<CustomizedLegend />} />
            <Bar dataKey="performance" name="Performance">
              {resultData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`}
                  fill={getBarColor(entry.performance)}
                />
              ))}
            </Bar>
            {isValidSession && (
              <Bar dataKey="netIncome" fill="#ff7300" name="Net Income" />
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformancePerMonth;