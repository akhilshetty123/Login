import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './ViewOrders.css';

function ViewOrders({ orders, onLogout }) {
  const navigate = useNavigate(); 

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    onLogout();
    navigate('/');
  };

  
  const calculateTotalPrice = (order) => {
    return order.price * order.quantity;
  };

  return (
    <div className="view-orders-container">
      
      <nav className="navbar">
        <img src="/images/log.png" alt="Dashboard" className="navbar-icon" />
        <div className="navbar-left">
          <ul className="navbar-items">
            <li><Link to="/admin">Home</Link></li>
            <li><Link to="/Add-item">Add-Item</Link></li>
            <li><Link to="/View-item">View-Item</Link></li>
            <li><Link to="/View-orders">View-Orders</Link></li>
          </ul>
        </div>
        <div className="navbar-right">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div className="view-orders-content">
        <h2>View Orders</h2>
        <div className="orders-list">
          <table className="orders-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity(kg)</th>
                <th>Total Price</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>{order.id}</td>
                  <td><img src={order.image} alt={order.productName} className="order-image" /></td>
                  <td>{order.productName}</td>
                  <td>{`₹${order.price}`}</td>
                  <td>{order.quantity}</td>
                  <td>{`₹${calculateTotalPrice(order)}`}</td> 
                  <td>{order.username}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ViewOrders;
