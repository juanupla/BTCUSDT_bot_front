import React, { useEffect, useState } from 'react';
import './Chart.css';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush
} from 'recharts';

const Chart = ({ apiData }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (apiData && apiData.length > 0) {
      const formattedData = apiData
        .map((item) => ({
          timestamp: new Date(item.date).getTime(),
          ema21: item.ema21,
          ema50: item.ema50,
          ema200: item.ema200,
        }))
        .reverse();
      setData(formattedData);
    }
  }, [apiData]); // Se ejecuta cada vez que apiData cambia

  const formatXAxis = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getDate()}/${date.getMonth() + 1} ${date.getHours()}:00`;
  };

  const formatTooltip = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} - ${date.getHours()}:00hs`;
  };

  const endIndex = data.length - 1;
  const startIndex = Math.max(endIndex - 1000, 0);

  return (
    <div className="chart-container">
      {data.length > 0 ? (
        <ResponsiveContainer>
          <LineChart 
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 45 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="timestamp"
              tickFormatter={formatXAxis}
              angle={-45}
              textAnchor="end"
              height={60}
              interval="preserveStartEnd"
              minTickGap={30}
            />
            <YAxis 
              domain={['auto', 'auto']}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
              orientation="right"
            />
            <Tooltip 
              labelFormatter={formatTooltip}
              formatter={(value) => [`$${value.toLocaleString()}`, '']}
            />
            <Legend verticalAlign="top" height={36} />
            <Line 
              type="monotone"
              dataKey="ema21"
              stroke="#ff6b6b"
              dot={false}
              strokeWidth={2}
              name="EMA 21"
            />
            <Line 
              type="monotone"
              dataKey="ema50"
              stroke="#4ecdc4"
              dot={false}
              strokeWidth={2}
              name="EMA 50"
            />
            <Line 
              type="monotone"
              dataKey="ema200"
              stroke="#ffa52e"
              dot={false}
              strokeWidth={2}
              name="EMA 200"
            />
            <Brush
              dataKey="timestamp"
              height={30}
              tickFormatter={() => ''}
              startIndex={startIndex}
              endIndex={endIndex}
              margin={{ top: 20 }}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p>No hay datos para mostrar.</p>
      )}
    </div>
  );
};

export default Chart;
