import React from 'react';
import './nav.css'; // Import the CSS for styling

const Nav = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <h1>Stock Market App</h1>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/dashboard">Dashboard</a></li>
          <li><a href="/portfolio">Portfolio</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
