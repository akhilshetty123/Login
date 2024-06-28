import React from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import Dashboard from './Add-item';
import ViewItems from './ViewItems';
import './AdminLayout.css';
import backgroundImage from '../assets/adm.jpg';

function AdminLayout({ onLogout, items, addItem, setItems }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <div className="admin-layout" style={{ backgroundImage: `url(${backgroundImage})`, backgroundColor: 'white' }}>
      <nav className="navbar">
        <img src="/images/loginnnn.jpg" alt="Dashboard" className="navbar-icon" />
        <div className="navbar-left">
          <ul className="navbar-items">
            <li><Link to="/admin/Add-items">Add-Item</Link></li>
            <li><Link to="/admin/View-items">View-Item</Link></li>
          </ul>
        </div>
        <div className="navbar-right">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>
      <div className="admin-content">
        <Routes>
          <Route path="Add-items" element={<Dashboard items={items} addItem={addItem} />} />
          <Route path="View-items" element={<ViewItems items={items} setItems={setItems} isAdmin={true} />} />
        </Routes>
      </div>
    </div>
  );
}

export default AdminLayout;
