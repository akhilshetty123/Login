import React from 'react';
import './Home.css';

function Home({ items = [], orders = [] }) {
  return (
<div>
       <h2>Welcome to the Admin Panel</h2>
       <p>This is the home page of the admin panel. Choose an action from the navigation menu.</p>
       <div className="home-container">
       <div className="counting-box">
        <h2>Total Products</h2>
        <p>{items.length}</p>
      </div>
      <div className="counting-box">
        <h2>Total Orders</h2>
        <p>{orders.length}</p>
      </div>
      </div>
    </div>
  );
}

export default Home;
