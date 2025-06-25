import React from 'react';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">
      <div className="home-box">
        <h1>Welcome to Inventory Manager</h1>
        <p>Manage your stock, products, and orders — all in one place.</p>
        <div className="button-group">
          <button className="btn-login" onClick={() => navigate('/login')}>Login</button>
          <button className="btn-signup" onClick={() => navigate('/signup')}>Sign Up</button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
