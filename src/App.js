import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import AdminLayout from './components/AdminLayout';
import UserLayout from './components/UserLayout';
import Dashboard from './components/Add-item';
import AddItem from './components/Add-item';
import ViewItems from './components/View-items';
import Home from './components/Home';
import NotFound from './components/NotFound';
import ViewOrders from './components/ViewOrders';
import MyOrders from './components/MyOrders';
import { UserProvider } from './components/UserContext'; 
import orangeImage from './assets/orange.jpeg';
import mangoImage from './assets/mango.jpeg';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [items, setItems] = useState([
    { id: 1, productName: 'Orange', price: 100, image: orangeImage },
    { id: 2, productName: 'Mango', price: 200, image: mangoImage },
  ]);
  const [orders, setOrders] = useState([]);

  const handleLogin = (status, admin = false) => {
    setIsLoggedIn(status);
    setIsAdmin(admin);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  const addItem = (item) => {
    const newItem = { ...item, id: items.length + 1 };
    setItems([...items, newItem]);
  };

  const placeOrder = (order) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      setOrders([...orders, { ...order, username: currentUser.username }]);
    }
  };

  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? (isAdmin ? <Navigate to="/admin/home" /> : <Navigate to="/user/home" />) : <Login onLogin={handleLogin} />}
          />

          {/* Admin routes */}
          <Route
            path="/admin/*"
            element={isLoggedIn && isAdmin ? <AdminLayout onLogout={handleLogout} items={items} addItem={addItem} setItems={setItems} orders={orders} /> : <Navigate to="/404" />}
          />
          <Route
            path="/admin/home"
            element={isLoggedIn && isAdmin ? <Dashboard items={items} addItem={addItem} onLogout={handleLogout} /> : <Navigate to="/404" />}
          />
          <Route
            path="/Add-item"
            element={isLoggedIn && isAdmin ? <AddItem addItem={addItem} onLogout={handleLogout} /> : <Navigate to="/404" />}
          />
          <Route
            path="/View-item"
            element={isLoggedIn && isAdmin ? <ViewItems items={items} setItems={setItems} isAdmin={true} onLogout={handleLogout} placeOrder={placeOrder} /> : <Navigate to="/404" />}
          />
          <Route
            path="/View-orders"
            element={isLoggedIn && isAdmin ? <ViewOrders orders={orders} onLogout={handleLogout} /> : <Navigate to="/404" />}
          />

          {/* User routes */}
          <Route
            path="/user/*"
            element={isLoggedIn && !isAdmin ? <UserLayout onLogout={handleLogout} items={items} placeOrder={placeOrder} orders={orders} /> : <Navigate to="/404" />}
          />
          <Route
            path="/home"
            element={isLoggedIn && !isAdmin ? <Home items={items} orders={orders} /> : <Navigate to="/404" />}
          />
          <Route
            path="/view-items"
            element={isLoggedIn && !isAdmin ? <ViewItems items={items} setItems={setItems} isAdmin={false} onLogout={handleLogout} placeOrder={placeOrder} /> : <Navigate to="/404" />}
          />
          <Route
            path="/MyOrders"
            element={isLoggedIn && !isAdmin ? <MyOrders orders={orders} onLogout={handleLogout} /> : <Navigate to="/404" />}
          />

          {/* 404 for all other routes */}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
