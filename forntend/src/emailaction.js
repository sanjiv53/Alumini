import React, { useEffect, useState } from 'react';
import './App.css';

export default function App() {
  // State to store the email
  const [email, setEmail] = useState(null);

  // useEffect to get the email query parameter when the component mounts
  useEffect(() => {
    // Get the current URL search parameters
    const queryParams = new URLSearchParams(window.location.search);
    
    // Extract the email parameter from the query string
    const emailParam = queryParams.get('email');
    
    // If email exists, update the state
    if (emailParam) {
      setEmail(emailParam);
    }
  }, []); // Empty dependency array means this runs only once when the component mounts

  return (
    <div>
      <div>
        {/* <Navpar />  */}
        <h3>Email Activation</h3>
        
        {email ? (
          <div>
            <h5>Welcome! To activate your account, click the link below:{email}</h5>
            <a href={`http://localhost:5000/emailaction?email=${email}`} className='email_act_button'>
           Click
            </a>
          </div>
        ) : (
          <p>No email found in URL.</p>
        )}
        
      </div>
    </div>
  );
}
