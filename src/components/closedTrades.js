import React, { useEffect, useState } from 'react';
import { getToken, removeToken } from '../services/Auth';
import { jwtDecode } from 'jwt-decode';
import { getClosedOperations, getPrivateCloseOperations } from '../services/Api';
import Swal from 'sweetalert2'
import './closedTrades.css'

const ClosedTrades = () => {
    const [loading, setLoading] = useState(true);
    const [isValidSession, setIsValidSession] = useState(false);
    const [closedTradesData, setClosedTradesData] = useState([]);
    
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
                        title: "Your session has expired",
                        showConfirmButton: false,
                        timer: 2000
                    }).then(() => {
                        window.location.reload();
                    });
                    return false;
                }
            } catch (error) {
                return false;
            }
        };

        const fetchData = async () => {
            try {
                const validSession = checkAuth();
                setIsValidSession(validSession);

                if (validSession) {
                    const privateClosedTrades = await getPrivateCloseOperations();
                    setClosedTradesData(privateClosedTrades);
                } else {
                    const publicClosedTrades = await getClosedOperations();
                    setClosedTradesData(publicClosedTrades);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error al cargar operaciones cerradas:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="closed-trades-container">
            <h2 className="closed-trades-title text-center">Closed Transactions Summary</h2>
            <div className="closed-trades-scroll-container">
                {closedTradesData.map((trade, index) => (
                    <div key={index} className="closed-trade-item">
                        <div className="closed-trade-left">
                            <div className="closed-trade-dates">
                                <div className="closed-trade-date-from">
                                    <span className='dateColor'>Date from:</span>
                                    {trade.buyOperation.date}
                                </div>
                                <div className="closed-trade-date-to">
                                    <span className='dateColor'>Date to:</span>
                                    {trade.sellOperation.date}
                                </div>
                            </div>
                            
                            
                        </div>
                        <div className="closed-trade-right">
                            <div className="closed-trade-prices">
                                <div className="closed-trade-buy-price">
                                   <span className='buyColor'>BUY</span> 
                                   ${trade.buyOperation.price.toFixed(2)}
                                </div>
                                <div className="closed-trade-sell-price">
                                    <span className='sellColor'>SELL</span>
                                    ${trade.sellOperation.price.toFixed(2)}
                                </div>
                                <hr className='hr-result-separator'></hr>

                                {isValidSession && (
                                    <div className="closed-trade-amount">
                                        <span className='btc-descrip'>Trade amount</span> 
                                        {trade.sellOperation.amount} 
                                        <span className='btc'> BTC</span>
                                    </div>
                            )}
                            </div>
                            <div className={`closed-trade-performance ${trade.netPerformance < 0 ? 'negative' : 'positive'} text-right`}>
                                <span className='net-result'> Net Result (%):</span> 
                                {trade.netPerformance.toFixed(2)}%
                            </div>
                            
                            {isValidSession && (
                                <div className={`closed-trade-net-income ${trade.netPerformance < 0 ? 'negative' : 'positive'} text-right` }>
                                    <span className={'nominal-result '}>Nominal result:</span>
                                    ${trade.netIncome.toFixed(2)}
                                </div>
                            )}
                            {isValidSession && (
                                <div className="closed-trade-total-operation">
                                   <span className='nominal-result'>Net income: </span> ${trade.sellOperation.totalOperation.toFixed(2)}
                                </div>
                            )}
                            
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default ClosedTrades;