import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css';

// Import Material-UI Icons
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const [loginCredentials, setLoginCredentials] = useState({ email: '', password: '' }); // Track login credentials
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Track if password should be shown
  const navigate = useNavigate();

  // Handle login form submission
  const handleLogin = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/login', loginCredentials)  // Send login credentials to the backend
      .then(response => {
        setIsLoggedIn(true); // Set logged in state to true
        setLoginError('');  // Clear any previous login errors
        navigate('/'); // Redirect to items page after successful login
      })
      .catch(error => {
        setLoginError('Invalid credentials');
        console.error('Login error:', error);
      });
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Show login form if not logged in
  if (!isLoggedIn) {
    return (
      <div className='box'>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email"
            value={loginCredentials.email}
            onChange={(e) => setLoginCredentials({ ...loginCredentials, email: e.target.value })}
          />
          
          {/* Wrap the password input and toggle button */}
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"} // Toggle between text and password type
              placeholder="Password"
              value={loginCredentials.password}
              onChange={(e) => setLoginCredentials({ ...loginCredentials, password: e.target.value })}
            />
            
            <button type="button" onClick={togglePasswordVisibility} className="toggle-button">
              {showPassword ? <VisibilityOff /> : <Visibility />}  {/* Use Material-UI icons for visibility toggle */}
            </button>
          </div>

          <br />
          <button type="submit">Login</button>
        </form>
        
        {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
      </div>
    );
  }

  // Render other UI for logged-in users
  return (
    <div>
      <h1>Welcome</h1>
    </div>
  );
}
