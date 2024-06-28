import React from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import ViewCategory from './ViewCategory';
import ViewItems from './ViewItems';
import './UserLayout.css';
// import backgroundImage from '../assets/user.jpg'; // Import the image

function UserLayout({ onLogout, items }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <div className="user-layout" >
      <nav className="navbar">
        <img src="/images/loginnnn.jpg" alt="Dashboard" className="navbar-icon" />
        <div className="navbar-left">
          <ul className="navbar-items">
            <li><Link to="/user/view-items">View items</Link></li>
            <li><Link to="/user/view-category">View categories</Link></li>
          </ul>
        </div>
        <div className="navbar-right">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>
      <div className="user-content">
        <Routes>
          <Route path="view-category" element={<ViewCategory />} />
          <Route path="view-items" element={<ViewItems items={items} isAdmin={false} />} />
        </Routes>
      </div>
    </div>
  );
}

export default UserLayout;
