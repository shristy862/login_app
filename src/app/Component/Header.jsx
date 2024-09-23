import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ email }) => {
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
      <h2 style={{ margin: '0' }}>Logo here </h2>
      <div style={{ fontSize: '1.2rem' }}>{email ? `Hello, ${email}` : 'Hello, User'}</div>
    </div>
  );
};

// Optional: defining prop types
Header.propTypes = {
  email: PropTypes.string, 
};

export default Header;
