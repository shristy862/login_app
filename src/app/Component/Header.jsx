import React, { useContext } from 'react';
import { UserContext } from '../Component/userContext';

const Header = () => {
  const { state } = useContext(UserContext); // Accessing the user state from context
  const email = state.email; // Get the email from the context

  return (
    <div 
      style={{ 
        width: '100%', 
        height: '100px', 
        background: '#001A28', 
        padding: '0 20px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        color: 'white' 
      }}
    >
      <h2 style={{ margin: '0' }}>Logo here</h2>
      <div style={{ fontSize: '1.2rem' }}>{email ? `Hello, ${email}` : 'Hello, User'}</div>
    </div>
  );
};

export default Header;
