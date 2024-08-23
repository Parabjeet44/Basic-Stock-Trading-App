import React from 'react';
import { useCart } from './CartContext'; // Adjust the path if necessary

const Dashboard = ({ stocks }) => {
  const { cart, addToCart, removeFromCart } = useCart();

  const isInCart = (symbol) => cart.some(stock => stock.symbol === symbol);

  console.log('Stocks data:', stocks); // Log the stocks data

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#f9f9f9',
    marginTop: '20px',
  };

  const thStyle = {
    border: '1px solid #ddd',
    padding: '12px',
    backgroundColor: '#4CAF50',
    color: 'white',
    textAlign: 'left',
  };

  const tdStyle = {
    border: '1px solid #ddd',
    padding: '12px',
  };

  const buttonStyle = {
    padding: '8px 16px',
    margin: '0 5px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  };

  const buyButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#28a745',
    color: 'white',
  };

  const sellButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#dc3545',
    color: 'white',
  };

  const containerStyle = {
    padding: '20px',
    backgroundColor: '#f0f2f5',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const headingStyle = {
    color: '#333',
    marginBottom: '20px',
  };

  return (
    <div className="dashboard" style={containerStyle}>
      <h2 style={headingStyle}>Stock Prices</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Symbol</th>
            <th style={thStyle}>Current Price</th>
            <th style={thStyle}>High</th>
            <th style={thStyle}>Low</th>
            <th style={thStyle}>Open</th>
            <th style={thStyle}>Previous Close</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stocks.length > 0 ? (
            stocks.map((stock) => (
              <tr key={stock.symbol}>
                <td style={tdStyle}>{stock.symbol}</td>
                <td style={tdStyle}>{stock.currentPrice}</td>
                <td style={tdStyle}>{stock.high}</td>
                <td style={tdStyle}>{stock.low}</td>
                <td style={tdStyle}>{stock.open}</td>
                <td style={tdStyle}>{stock.previousClose}</td>
                <td style={tdStyle}>
                  {isInCart(stock.symbol) ? (
                    <button
                      style={sellButtonStyle}
                      onClick={() => removeFromCart(stock.symbol)}
                    >
                      Sell
                    </button>
                  ) : (
                    <button
                      style={buyButtonStyle}
                      onClick={() => addToCart(stock)}
                    >
                      Buy
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={tdStyle}>No stock data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
