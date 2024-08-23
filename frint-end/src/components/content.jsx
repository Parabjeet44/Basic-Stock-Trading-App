import React from 'react';
import './content.css'; // Import the CSS for styling

const Content = ({ stock }) => {
  return (
    <div className="content">
      <h2>{stock.name}</h2>
      <p>Symbol: {stock.symbol}</p>
      <p>Price: ${stock.price}</p>
      <p>Volume: {stock.volume}</p>
      <button className="buy-button">Buy</button>
      <button className="sell-button">Sell</button>
    </div>
  );
};

export default Content;
