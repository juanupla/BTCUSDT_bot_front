import React, { useEffect, useState } from 'react';
import { getOperations } from '../services/Api';
import './activeTrades.css'

const ActiveTrades = () => {
    const [trades, setTrades] = useState([]);

    useEffect(() => {
      const fetchTrades = async () => {
        try {
          const response = await getOperations();
          if (response.status === "OK") {
            setTrades(response.data);
          }
        } catch (error) {
          console.error('Error fetching trades:', error);
        }
      };
  
      fetchTrades();
    }, []);
  
    return (
      <div className="trades-container">
        <h2 className="trades-title">Active Trades</h2>
        <div className="trades-scroll-container">
          {trades.map((trade, index) => (
            <div key={index} className="trade-item">
              <div className="trade-info">
                <div className="trade-date">Date: {trade.date}</div>
                <div className="trade-type">
                  Type: <span className={trade.type.toLowerCase()}>{trade.type}</span>
                  Ticker: {trade.ticket}
                </div>
              </div>
              <div className="trade-price">
                Price: ${Number(trade.price).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default ActiveTrades;