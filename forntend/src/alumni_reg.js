import React, { useState, useEffect } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import nodemailer from 'nodemailer';
const App = () => {
  // State to track the active tab
  const [activeTab, setActiveTab] = useState("tab1");

  // State to hold the dynamically generated years
  const [years, setYears] = useState([]);
  const [file, setFile] = useState(null); 
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', phone: '', email: '',from:'',to:'',pass:'' });
  const navigate = useNavigate();


  useEffect(() => {
    // Generate an array of years from 1985 to the current year
    const currentYear = new Date().getFullYear();
    const yearOptions = [];
    for (let year = 1975; year <= currentYear; year++) {
      yearOptions.push(year);
    }
    setYears(yearOptions);
  }, []);

  // Handle tab clicks
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };
  const handleChange = (e) => {
    setFile(e.target.files[0]); // Store the file
  };
 // Handle form submit to add a new item with an image\\

 const sendEmail = async () => {
  const emailData = {
    name: newItem.name,
    email: newItem.email,
  };

  try {
    const response = await axios.post('http://localhost:5000/send-email', emailData);
    console.log('Email sent successfully:', response.data);
    alert('Email sent successfully!');
  } catch (error) {
    // Check if there's a response from the backend or just a network error
    if (error.response) {
      console.error('Error sending email:', error.response.data);
      alert('Failed to send email. Server error.');
    } else {
      console.error('Network or connection error:', error.message);
      alert('Failed to send email. Network error.');
    }
  }
};




 const handleSubmit = (e) => {
  e.preventDefault();

  // Create a new FormData object
  const formData = new FormData();
  formData.append('name', newItem.name);
  formData.append('phone', newItem.phone);
  formData.append('email', newItem.email);
  formData.append('from', newItem.from);
  formData.append('to', newItem.to);
  formData.append('pass', newItem.pass);
  formData.append('image', file); // Append the file to the form data

  // Send formData to the backend
  axios.post('http://localhost:5000/reg', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then(response => {
      setItems([...items, response.data]); // Add new item to the list
      setNewItem({name: '', phone: '', email: '',from:'',to:'',pass:'' }); // Reset form
      setFile(null); // Clear file input
      navigate('/sign');
    })
    .catch(error => {
      console.error('Error posting data:', error);
    });
   
   
};

  return (
    <div>
      {/* Tab buttons */}
      <div className="tabs">
        <ul>
          <li 
            data-tab="tab1" 
            className={activeTab === "tab1" ? "current" : ""}
            onClick={() => handleTabClick("tab1")}
          >
           Staff Registration
          </li>
          <li 
            data-tab="tab2" 
            className={activeTab === "tab2" ? "current" : ""}
            onClick={() => handleTabClick("tab2")}
          >
            Student Registration
          </li>
        </ul>
      </div>

      {/* Tab content */}
      <div className="tab-content">
        <div id="tab1" className={activeTab === "tab1" ? "current" : ""}>
          <h3>Staff Registration</h3>
          <div className='box'>
          <form onSubmit={handleSubmit}>
            
           <h1>Reg. Form  <span style={{ color: '#fb744b' }}>- Staff</span></h1>
           <label>Name</label> <br/>
          <input type="text" placeholder="Name"  value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}/><br/>
           <label>Email</label> <br/>
          <input type="email"  placeholder="Email"  value={newItem.email}
            onChange={(e) => setNewItem({ ...newItem, email: e.target.value })}/><br/>
          <label>Phone</label> <br/>
         <input type="tel" placeholder="phone"  value={newItem.phone}
            onChange={(e) => setNewItem({ ...newItem, phone: e.target.value })}/><br />
        <div className='select_box'>
            <select  
            onChange={(e) => setNewItem({ ...newItem, from: e.target.value })}>
                <option> From</option>
            {years.map((year, index) => (
              <option key={index} value={year}>{year}</option>
            ))}
          </select>
          <select  
            onChange={(e) => setNewItem({ ...newItem, to: e.target.value })}>
          <option>To</option>
            {years.map((year, index) => (
              <option key={index} value={year}>{year}</option>
            ))}
          </select>
         </div>
         <div className="img">
            <h2>Add Image:</h2>
            <input type="file" onChange={handleChange} />
            {file && <img src={URL.createObjectURL(file)} alt="Preview" />} {/* Preview selected image */}
          </div>
           <button  type="submit" onClick={sendEmail}>Submit</button>
          </form>
          </div>
      </div>

        <div id="tab2" className={activeTab === "tab2" ? "current" : ""}>
          <h3>Student Registration</h3>
          <div className='box'>
          <form onSubmit={handleSubmit}>
            
           <h1>Reg. Form <span style={{ color: '#fb744b' }}>- Student</span></h1>
           <label>Name</label> <br/>
          <input type="text" placeholder="Name"  value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}/><br/>
           <label>Email</label> <br/>
          <input type="email"  placeholder="Email"  value={newItem.email}
            onChange={(e) => setNewItem({ ...newItem, email: e.target.value })}/><br/>
          <label>Phone</label> <br/>
         <input type="tel" placeholder="phone"  value={newItem.phone}
            onChange={(e) => setNewItem({ ...newItem, phone: e.target.value })}/><br />
        <div className='select_box'>
            
          <select  
            onChange={(e) => setNewItem({ ...newItem, pass: e.target.value })}>
          <option>Year </option>
            {years.map((year, index) => (
              <option key={index} value={year}>{year}</option>
            ))}
          </select>
         </div>
         <div className="img">
            <h2>Add Image:</h2>
            <input type="file" onChange={handleChange} />
            {file && <img src={URL.createObjectURL(file)} alt="Preview" />} {/* Preview selected image */}
          </div>
           <button type="submit" onClick={sendEmail}>Submit</button>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
