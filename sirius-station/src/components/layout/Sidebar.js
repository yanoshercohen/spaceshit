import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: '🏠', label: 'Dashboard' },
    { path: '/crew', icon: '👨‍🚀', label: 'Crew' },
    { path: '/experiments', icon: '🧪', label: 'Experiments' },
    { path: '/communications', icon: '📡', label: 'Communications' },
    { path: '/resources', icon: '⛽', label: 'Resources' },
    { path: '/maintenance', icon: '🔧', label: 'Maintenance' }
  ];

  return (
    <div style={{
      width: '250px',
      background: 'rgba(15, 23, 42, 0.9)',
      backdropFilter: 'blur(10px)',
      borderRight: '1px solid rgba(100, 116, 139, 0.2)',
      padding: '20px 0',
      position: 'fixed',
      height: '100vh',
      overflowY: 'auto'
    }}>
      <div style={{ padding: '0 20px', marginBottom: '30px' }}>
        <h1 style={{ 
          color: '#3b82f6', 
          fontSize: '24px', 
          fontWeight: 'bold',
          marginBottom: '5px'
        }}>
          SIRIUS
        </h1>
        <p style={{ color: '#64748b', fontSize: '14px' }}>Space Station Control</p>
      </div>

      <nav>
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px 20px',
              color: location.pathname === item.path ? '#3b82f6' : '#94a3b8',
              textDecoration: 'none',
              background: location.pathname === item.path 
                ? 'rgba(59, 130, 246, 0.1)' 
                : 'transparent',
              borderRight: location.pathname === item.path 
                ? '3px solid #3b82f6' 
                : '3px solid transparent',
              transition: 'all 0.3s ease'
            }}
          >
            <span style={{ marginRight: '12px', fontSize: '18px' }}>
              {item.icon}
            </span>
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
