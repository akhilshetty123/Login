import React from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import ViewItems from './ViewItems';
import './AdminLayout.css';
import backgroundImage from '../assets/adm.jpg'; // Import the image

function AdminLayout({ onLogout, items, addItem }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <div className="admin-layout" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <nav className="navbar">
        <img src="/images/loginnnn.jpg" alt="Dashboard" className="navbar-icon" />
        <div className="navbar-left">
          <ul className="navbar-items">
            <li><Link to="/admin/dashboard">Add-Item</Link></li>
            <li><Link to="/admin/view-items">View-Item</Link></li>
          </ul>
        </div>
        <div className="navbar-right">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>
      <div className="admin-content">
        <Routes>
          <Route path="dashboard" element={<Dashboard items={items} addItem={addItem} />} />
          <Route path="view-items" element={<ViewItems items={items} />} />
        </Routes>
      </div>
    </div>
  );
}

export default AdminLayout;
