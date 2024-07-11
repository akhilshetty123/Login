import React from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import ViewCategory from './ViewCategory';
import ViewItems from './View-items';
import './UserLayout.css';
import Userhome from './Userhome';
import MyOrders from './MyOrders';

function UserLayout({ onLogout, items, placeOrder, orders, currentUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('CurrentUser');
    onLogout();
    navigate('/');
  };

  return (
    <div className="user-layout">
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
      <div className="user-content">
        <Routes>
          <Route path="/" element={<Userhome />} />
          <Route path="/view-items" element={<ViewItems items={items} isAdmin={false} placeOrder={placeOrder} />} />
          <Route path="/MyOrders" element={<MyOrders orders={orders} currentUser={currentUser} />} />
          <Route path="/ViewCategory" element={<ViewCategory />} />
        </Routes>
      </div>
    </div>
  );
}

export default UserLayout;
