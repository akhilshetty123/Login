import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import AdminLayout from './components/AdminLayout';
import UserLayout from './components/UserLayout';
import ViewCategory from './components/ViewCategory';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [items, setItems] = useState([
    { id: 1, productName: 'Orange', price: 100 },
    { id: 2, productName: 'Mango', price: 200 },
  ]);

  const handleLogin = (status) => {
    setIsLoggedIn(status);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const addItem = (item) => {
    setItems([...items, item]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/admin/dashboard" /> : <Login onLogin={handleLogin} />} />
        <Route path="/admin/*" element={isLoggedIn ? <AdminLayout onLogout={handleLogout} items={items} addItem={addItem} setItems={setItems} /> : <Navigate to="/" />} />
        <Route path="/user/*" element={isLoggedIn ? <UserLayout onLogout={handleLogout} items={items} /> : <Navigate to="/" />} />
        <Route path="/category" element={<ViewCategory />} />
      </Routes>
    </Router>
  );
}

export default App;
