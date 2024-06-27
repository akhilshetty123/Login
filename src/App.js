// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
// import './App.css';

// function Login({ onLogin }) {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (username === 'admin' && password === 'password1234') {
//       setMessage('Login successful!');
//       onLogin(true);
//     } else {
//       setMessage('Invalid credentials, please try again.');
//     }
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Login</h1>
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label>
//               Username:
//               <input 
//                 type="text" 
//                 value={username} 
//                 onChange={(e) => setUsername(e.target.value)} 
//               />
//             </label>
//           </div>
//           <div>
//             <label>
//               Password:
//               <input 
//                 type="password" 
//                 value={password} 
//                 onChange={(e) => setPassword(e.target.value)} 
//               />
//             </label>
//           </div>
//           <button type="submit">Login</button>
//         </form>
//         {message && <p>{message}</p>}
//       </header>
//     </div>
//   );
// }

// function Admin() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Admin Page</h1>
//         <p>Welcome to the admin page!</p>
//       </header>
//     </div>
//   );
// }

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   return (
//     <Router>
//       <Switch>
//         <Route path="/" exact>
//           {isLoggedIn ? <Redirect to="/admin" /> : <Login onLogin={setIsLoggedIn} />}
//         </Route>
//         <Route path="/admin">
//           {isLoggedIn ? <Admin /> : <Redirect to="/" />}
//         </Route>
//       </Switch>
//     </Router>
//   );
// }

// export default App;

// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import './App.css';
// import Login from './components/Login';
// import AdminLayout from './components/AdminLayout';
// import UserLayout from './components/UserLayout';

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const handleLogin = (status) => {
//     setIsLoggedIn(status);
//   };

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//   };

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={isLoggedIn ? <Navigate to="/admin/dashboard" /> : <Login onLogin={handleLogin} />} />
//         <Route path="/admin/*" element={isLoggedIn ? <AdminLayout onLogout={handleLogout} /> : <Navigate to="/" />} />
//         <Route path="/user/*" element={isLoggedIn ? <UserLayout onLogout={handleLogout} /> : <Navigate to="/" />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import AdminLayout from './components/AdminLayout';
import UserLayout from './components/UserLayout';
// import ViewCategory from './components/ViewCategory';
import ViewCategory from './components/Viewcategory';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [items, setItems] = useState([]);

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
        <Route path="/admin/*" element={isLoggedIn ? <AdminLayout onLogout={handleLogout} items={items} addItem={addItem} /> : <Navigate to="/" />} />
        <Route path="/user/*" element={isLoggedIn ? <UserLayout onLogout={handleLogout} items={items} /> : <Navigate to="/" />} />
        <Route path="/category" element={<ViewCategory />} /> {/* Add ViewCategory route */}
      </Routes>
    </Router>
  );
}

export default App;
