import React from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import Dashboard from './Add-item';
import ViewItems from './View-items';
import ViewOrders from './ViewOrders';
import Home from './Home';
import './AdminLayout.css';


function AdminLayout({ onLogout, items, addItem, setItems, orders }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    onLogout();
    navigate('/');
  };

  return (
    <div className="admin-layout" style={{  backgroundColor: '' }}>
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
      <div className="admin-content">
        <Routes>
          <Route path="/" element={<Home items={items} orders={orders} />} />
          <Route path="/Add-item" element={<Dashboard items={items} addItem={addItem} />} />
          <Route path="/View-item" element={<ViewItems items={items} setItems={setItems} isAdmin={true} />} />
          <Route path="/View-orders" element={<ViewOrders orders={orders} onLogout={handleLogout} />} />
        </Routes>
      </div>
    </div>
  );
}

export default AdminLayout;
