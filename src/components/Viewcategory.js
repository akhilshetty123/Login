import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ViewCategory.css';

function ViewCategory({ onLogout }) {
  const [fruits, setFruits] = useState([
    { name: 'Orange', weight: '200g', price: '₹100' },
    { name: 'Apple', weight: '150g', price: '₹150' },
    { name: 'Grapes', weight: '250g', price: '₹80' },
    { name: 'Watermelon', weight: '250g', price: '₹50' },
    { name: 'Mango', weight: '250g', price: '₹90' },
  ]);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    onLogout();
    navigate('/');
  };

  return (
    <div className="view-category-container">
      <nav className="navbar">
        <img src="/images/loginnnn.jpg" alt="Dashboard" className="navbar-icon" />
        <div className="navbar-left">
          <ul className="navbar-items">
          <li><Link to="/View-items">View Items</Link></li>
          <li><Link to="/ViewCategory">View-Categories</Link></li>
          </ul>
        </div>
        <div className="navbar-right">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      
      <div className="bk">
        <h2>View Category</h2>
      </div>
      <div className="table-wrapper">
        <table className="fruits-table">
          <thead>
            <tr>
              <th>Fruit Name</th>
              <th>Weight</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {fruits.map((fruit, index) => (
              <tr key={index}>
                <td>{fruit.name}</td>
                <td>{fruit.weight}</td>
                <td>{fruit.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewCategory;
