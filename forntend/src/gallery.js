import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
// import meetup from './meetup';
import banner from './img/WhatsApp Image 2024-11-07 at 12.20.00_c349ae86.jpg'
export default function gallery() {
 

  return (
    <div>
      
      
      <div className='gallery_box'>
      {/* <Navpar />  */}
      <Link to='/Meetup'><img src={banner} alt='' /></Link>
      

        
      </div>
    </div>
  );
}


