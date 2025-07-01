import React from 'react';

const Card = ({ children, className = '', onClick, hover = false }) => {
  return (
    <div 
      className={`card ${hover ? 'hover-effect' : ''} ${className}`}
      onClick={onClick}
      style={{
        background: 'rgba(30, 41, 59, 0.8)',
        border: '1px solid rgba(100, 116, 139, 0.2)',
        borderRadius: '12px',
        padding: '24px',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s ease',
        cursor: onClick ? 'pointer' : 'default'
      }}
    >
      {children}
    </div>
  );
};

export default Card;
