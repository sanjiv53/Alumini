import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Alumnireg from './alumni_reg';
import Gallery from './gallery';
import Home from './home';
import Meetup from './meetup';
import Profile from './profile';
import Emailaction from './emailaction';
import Login from './login';
import Sign from './Sign';
import Email from './email';
import './App.css';
import { FaUser,FaHome } from "react-icons/fa";
import { FaRegFileLines } from "react-icons/fa6";
import { GrGallery } from "react-icons/gr";

function App() {
  const [dropdown, setDropdown] = useState(false);

  return (
    <Router>
      <div>
        <div className='body'>
          <h1>Sri Ramakrishna Vivekananda Higher Secondary School - Alumni</h1>
          <nav>
            <div className='nav'>
              <button>
                <Link to="/" style={{ textDecoration: "none" }} ><FaHome /> Home</Link>
              </button>
              {/* <button>
                <Link to="/sign" style={{ textDecoration: "none" }} >Profile</Link>
              </button> */}
              <button>
                <Link to="/gallery" style={{ textDecoration: "none" }} ><GrGallery /> Gallery</Link>
              </button>
              <div className="dropdown" onMouseEnter={() => setDropdown(true)} onMouseLeave={() => setDropdown(false)}>
                <button className="dropbtn"><FaRegFileLines /> Alumni</button>
                {dropdown && (
                  <div className="dropdown-content">
                    {/* <Link to="/login">Login</Link>
                    <Link to="/sign">Sign</Link> */}
                    <Link to="/Profile">Profile</Link>
                    <Link to="/reg">Alumni Reg </Link>
                  </div>
                )}
              </div>
              <div className="dropdown" onMouseEnter={() => setDropdown(true)} onMouseLeave={() => setDropdown(false)}>
                <button className="dropbtn"><FaUser /> User</button>
                {dropdown && (
                  <div className="dropdown-content">
                    <Link to="/login">Login</Link>
                    <Link to="/sign">Sign</Link>
                    
                  </div>
                )}
              </div>
            </div>
          </nav>
        </div>
        <div className='detail_box'>
          <Routes>
            <Route path="/reg" element={<Alumnireg />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/" element={<Home />} />
            <Route path="/meetup" element={<Meetup />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/emailaction" element={<Emailaction />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign" element={<Sign/>} />
            <Route path="/email" element={<Email/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
