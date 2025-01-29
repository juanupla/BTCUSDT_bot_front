import React, { useEffect, useState } from 'react';
import { getOperations, getPrivateOperations } from '../services/Api';
import { getToken,removeToken } from '../services/Auth';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2'

import './activeTrades.css'

const ActiveTrades = () => {
    const [trades, setTrades] = useState([]);
    const [isValidSession, setIsValidSession] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    

    useEffect(() => {
      const checkAuth = () => {
        const token = getToken();
                  if (!token) return false;
                  try {
                      const decodedToken = jwtDecode(token);
                      const currentTime = Math.floor(Date.now() / 1000);
                      if (decodedToken.exp > currentTime) {
                          return true;
                      } else {
                          removeToken();
                          Swal.fire({
                              position: "top-end",
                              icon: "warning",
                              title: "Su sesión ha caducado.",
                              showConfirmButton: false,
                              timer: 2000
                            });
                          return false;
                      }
                  } catch (error) {
                      return false;
                  }
      };
      const fetchTrades = async () => {
        try {
          const response = await getOperations();
          if (response.status === "OK") {
            setTrades(response.data);
          }

           const validSession = checkAuth();
           setIsValidSession(validSession);
          
           if (validSession) {
               const privateClosedTrades = await getPrivateOperations();
               setTrades(privateClosedTrades);
           } else {
               const getOperations = await getOperations();
               setTrades(getOperations);
           }
           setLoading(false);             
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

                {isValidSession && (
                <div>
                  <span className='btc-descrip'>Trade amount</span> 
                  {trade.amount} 
                  <span className='btc'> BTC</span>
                </div>
              )}
              {isValidSession && (
                <div className='net-income'>
                  <span> Net Income </span>  ${Number(trade.totalOperation).toFixed(2)}
                </div>
              )}
              </div>

            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default ActiveTrades;