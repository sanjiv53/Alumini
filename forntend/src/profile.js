import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

export default function App() {
  const [items, setItems] = useState([]);

  // Fetch items when the component mounts
  useEffect(() => {
    axios.get('http://localhost:5000/items')
      .then(response => {
        setItems(response.data); // Set the items in state
        console.log(response.data); // Log the data to check the imagePath
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div >
      <h1>User <span style={{ color: 'red' }}>List</span></h1>
  
      <div className='profile'> 
        {items.map((item) => (
      
            <div className='profile_box'>
              <div className='img_box'>
            <img
              src={`http://localhost:5000/image/${item.imagePath}`}
              alt="User  Preview"
              style={{ width: '100px', height: '100px' }} />
            </div>
            <div className='profile_details'>
            <strong>Name:</strong> {item.name}<br />
            <strong>Phone:</strong> {item.phone}<br />
            <strong>Email:</strong> {item.email}<br />
            </div>
            {/* Construct the full image URL */}
            
            </div>
        
          
        ))}
       
       </div>
    </div>
  );
}