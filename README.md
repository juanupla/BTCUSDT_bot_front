# BTC Strategy

BTC Strategy is a minimalist web interface designed to interact with a language model focused on analysis and strategy execution in Bitcoin markets.

The application is built with React and deployed on Netlify.

👉 [https://btc-strategy.netlify.app](https://btc-strategy.netlify.app)

### Core Strategy

The system implements a trading strategy based on exponential moving averages (EMAs) of 200, 50, and 21 periods.

- **Buy condition:** The 50 EMA is above the 200 EMA, and the 21 EMA is above both the 50 and 200 EMAs.
- **Sell condition:** The 50 EMA is below the 200 EMA, the 21 EMA is below both, and the current price of BTCUSDT is also below the 200 EMA.

### Portfolio Execution

The bot manages a trading portfolio and runs in real-time, executing logic every **15 minutes**.  
It can be toggled between `ON` and `OFF` states:

- When set to `OFF`, no trades will be executed, but analytics and signals will continue running.
- The `ON`/`OFF` state affects only the execution of trades, not data processing or display.

### Additional Features

- Monthly performance tracking  
- Full trade history  
- Performance overview of closed trades  
- Admin panel to manage strategy parameters and monitor real-time signals  
- Secure user login to access sensitive data such as nominal amounts, portfolio size, and PnL details

### Technologies Used

- React  
- JavaScript  
- Netlify

### License

MIT
