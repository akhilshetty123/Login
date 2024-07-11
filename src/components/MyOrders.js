import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from './UserContext'; 
import './MyOrders.css';
function MyOrders({ orders, onLogout }) {
  const navigate = useNavigate();
  const { currentUser } = useUser();

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    onLogout();
    navigate('/');
  };

  const userOrders = orders.filter(order => order.username === currentUser.username);

  return (
    <div className="my-orders-container">
      <nav className="navbar">
        <img src="/images/log.png" alt="Dashboard" className="navbar-icon" />
        <div className="navbar-left">
          <ul className="navbar-items">
            <li><Link to="/user">Home</Link></li>
            <li><Link to="/view-items">View-Items</Link></li>
            <li><Link to="/MyOrders">My-Orders</Link></li>
          </ul>
        </div>
        <div className="navbar-right">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>
      <div className="my-orders-content">
      <h2>My Orders</h2>
      {userOrders.length > 0 ? (
        <table className="orders-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity(kg)</th>
              <th>Username</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {userOrders.map((order, index) => (
              <tr key={index}>
                <td>{order.id}</td>
                <td><img src={order.image} alt={order.productName} className="order-image" /></td>
                <td>{order.productName}</td>
                <td>{`₹${order.price}`}</td>
                <td>{order.quantity}</td>
                <td>{order.username}</td>
                <td>{`₹${order.price * order.quantity}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders found for {currentUser.username}.</p>
      )}
    </div>
    </div>
  );
}

export default MyOrders;
