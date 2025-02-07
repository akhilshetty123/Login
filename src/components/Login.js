import React, { useState } from 'react';
import './Login.css'; 
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    const adminCredentials = { username: 'admin', password: '123', role: 'admin' };

    if (username === adminCredentials.username && password === adminCredentials.password) {
      setMessage('Admin login successful!');
      onLogin(true, true); 
      localStorage.setItem('currentUser', JSON.stringify(adminCredentials));
      navigate('/admin');
    } else {
      setMessage('User login successful!');
      const user = { username, password, role: 'user' };
      onLogin(true, false); 
      localStorage.setItem('currentUser', JSON.stringify(user));
      navigate('/user');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <header className="login-header">
        <h1>Login</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input 
              type="text" 
              id="username"
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              className="form-control"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <div className="password-input">
              <input 
                type={showPassword ? 'text' : 'password'} 
                id="password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="form-control"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className={`toggle-password ${showPassword ? 'active' : ''}`}
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <button type="submit" className="btn-login">Login</button>
        </form>
        {message && <p className="login-message">{message}</p>}
      </header>
    </div>
  );
}

export default Login;
