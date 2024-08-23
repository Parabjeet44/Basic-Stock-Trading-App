import React, { useEffect, useState } from 'react';
import { CartProvider } from './components/CartContext'; // Ensure the path is correct
import Dashboard from './components/Dashboard';
import axios from 'axios';

function App() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const symbols = 'AAPL,GOOGL,MSFT'; // Example stock symbols
        const response = await axios.get(`http://localhost:5000/api/stock?symbols=${symbols}`);
        console.log('Fetched stock data:', response.data); // Log the fetched data
        
        // Ensure the data is in the expected format
        const stockData = response.data.map(stock => ({
          symbol: stock.symbol,
          currentPrice: stock.currentPrice,
          high: stock.high,
          low: stock.low,
          open: stock.open,
          previousClose: stock.previousClose
        }));
        
        setStocks(stockData);
      } catch (error) {
        console.error('Error fetching stock data:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <CartProvider>
      <div className="App" style={{ padding: '20px' }}>
        <h1>My Stock Dashboard</h1>
        <Dashboard stocks={stocks} />
      </div>
    </CartProvider>
  );
}

export default App;
