import React from 'react';
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

const Chart = () => {
  const data = Array.from({ length: 48 }, (_, i) => ({
    timestamp: new Date(2024, 0, 1, i).getTime(),
    ema21: 40000 + Math.sin(i/10) * 2000 + Math.random() * 500,
    ema50: 41000 + Math.cos(i/10) * 1500 + Math.random() * 300,
    ema200: 42000 + Math.sin(i/20) * 1000 + Math.random() * 100
  }));

  const formatXAxis = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getDate()}/${date.getMonth() + 1} ${date.getHours()}:00`;
  };

  const formatTooltip = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} - ${date.getHours()}:00hs`;
  };

  const formatBrush = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getDate()}/${date.getMonth() + 1}`;
  };

  return (
    <div className="chart-container">
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
          />
          <Tooltip 
            labelFormatter={formatTooltip}
            formatter={(value) => [`$${value.toLocaleString()}`, '']}
          />
          <Legend verticalAlign="top" height={36}/>
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
            stroke="#fed330"
            dot={false} 
            strokeWidth={2}
            name="EMA 200"
          />
          <Brush
            dataKey="timestamp"
            height={30}
            tickFormatter={formatBrush}
            startIndex={Math.max(0, data.length - 24)}
            endIndex={data.length - 1}
            margin={{ top: 20 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;