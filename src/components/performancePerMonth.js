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
              : getNetIncomeColor(pld.value)
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
  return value >= 0 ? 'rgba(40, 167, 70, 0.56)' : 'rgba(220, 53, 70, 0.56)';
};

const getNetIncomeColor = (value) => {
  return 'rgba(53, 159, 220, 0.5)';
};

const PerformancePerMonth = () => {
  const [loading, setLoading] = useState(true);
  const [isValidSession, setIsValidSession] = useState(false);
  const [data, setData] = useState([]);
  const [visibleMonths] = useState(6);
  const [startIndex, setStartIndex] = useState(0);

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

  // Slice the data to show only visible months
  const visibleData = resultData.slice(startIndex, startIndex + visibleMonths);

  const handleNext = () => {
    if (startIndex + visibleMonths < resultData.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const CustomizedLegend = (props) => {
    const { payload } = props;
    
    return (
      <div className="custom-legend">
        {payload.map((entry, index) => {
          let color;
          const lastDataPoint = visibleData[visibleData.length - 1];
          
          if (entry.value === 'Performance') {
            color = getBarColor(lastDataPoint?.performance || 0);
          } else if (entry.value === 'Net Income') {
            color = getNetIncomeColor(lastDataPoint?.netIncome || 0);
          }
            
          return (
            <span 
              key={`item-${index}`} 
              className="legend-item"
              style={{ color: '#fff' }}
            >
              <span 
                className="legend-color" 
                style={{ 
                  backgroundColor: color,
                  opacity: 1
                }}
              ></span>
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
    <div className="performance-chart-container bg-gray-900  md:p-8 rounded-lg w-full">
      <h2 className="monthly-performance-title">Monthly Performance</h2>
      <div className="navigation-buttons">
        <button 
          onClick={handlePrev}
          disabled={startIndex === 0}
          className="nav-button"
        >
          Previous
        </button>
        <button 
          onClick={handleNext}
          disabled={startIndex + visibleMonths >= resultData.length}
          className="nav-button"
        >
          Next
        </button>
      </div>
      <div style={{ width: '100%', height: 500 }}>
        <ResponsiveContainer>
          <BarChart 
            data={visibleData}
            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              angle={-45}
              textAnchor="end"
              height={60}
              interval={0}
              tick={{ fill: '#b0b3b8' }}
            />
            <YAxis tick={{ fill: '#b0b3b8' }} />
            <Tooltip 
              content={<CustomTooltip />}
              cursor={{ fill: '#333' }}
            />
            <Legend content={<CustomizedLegend />} />
            <Bar dataKey="performance" name="Performance">
              {visibleData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`}
                  fill={getBarColor(entry.performance)}
                />
              ))}
            </Bar>
            {isValidSession && (
              <Bar dataKey="netIncome" name="Net Income">
                {visibleData.map((entry, index) => (
                  <Cell 
                    key={`cell-netIncome-${index}`}
                    fill={getNetIncomeColor(entry.netIncome)}
                  />
                ))}
              </Bar>
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="pagination-info">
        Showing months {startIndex + 1} to {Math.min(startIndex + visibleMonths, resultData.length)} of {resultData.length}
      </div>
    </div>
  );
};

export default PerformancePerMonth;