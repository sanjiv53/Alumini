


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css';
// Import Material-UI Icons
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
function Profile() {
  return (
   
    <h5>Login Details</h5>
  );
}
export default function App () {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '',email:'', password: '' });
  // const [loginCredentials, setLoginCredentials] = useState({ email: '', password: '' }); 
  const [showPassword, setShowPassword] = useState(false); 
  const navigate = useNavigate();
  // Fetch items when the component mounts
  // useEffect(() => {
  //   axios.get('http://localhost:5000/sign')
  //     .then(response => {
  //       setItems(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);

  // Handle form submit to add a new item
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/sign', newItem)
      .then(response => {
        setItems([...items, response.data]); // Add new item to list
        setNewItem({ name: '',email:'', password: '' }); // Reset form
        navigate('/login');
      })
      .catch(error => {
        console.error('Error posting data:', error);
      });
  };
 // Toggle password visibility
 const togglePasswordVisibility = () => {
  setShowPassword(!showPassword);
};
  return (
    <div>
     
      {/* <div className='detail_box'>
      <h1>User<span style={{color:'red'}}> List</span></h1>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            Name:{item.name}<br/>
             Age:{item.age}<br/>Email:{item.email}
             <Profile />
          </li>
        ))}
      </ul>
      </div> */}
 
      <div className='box'>
      <form onSubmit={handleSubmit}>
        <h1>Sign <span style={{color:'red'}}>in</span></h1>
        <input
          type="text"
          placeholder="Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="email"
          value={newItem.email}
          onChange={(e) => setNewItem({ ...newItem, email: e.target.value })}
        />
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"} // Toggle between text and password type
              placeholder="Password"
              value={newItem.password}
              onChange={(e) => setNewItem({ ...newItem, password: e.target.value })}
            />
            
            <button type="button" onClick={togglePasswordVisibility} className="toggle-button">
              {showPassword ? <VisibilityOff /> : <Visibility />}  {/* Use Material-UI icons for visibility toggle */}
            </button>
          </div><br/>
        <button type="submit">submit</button>
      </form>
      </div>
    </div>
  );
}


