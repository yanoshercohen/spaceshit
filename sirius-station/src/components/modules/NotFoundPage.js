import React from 'react';

const NotFoundPage = () => (
  <div style={{
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'radial-gradient(circle, #232946 60%, #121629 100%)',
    color: '#fff'
  }}>
    <div style={{ fontSize: 120, marginBottom: 20 }}>🪐</div>
    <h1 style={{ fontSize: 64, marginBottom: 10 }}>404</h1>
    <h2 style={{ fontWeight: 400, marginBottom: 20 }}>Lost in Space</h2>
    <p style={{ color: '#94a3b8', fontSize: 18 }}>The page you are looking for does not exist.</p>
  </div>
);

export default NotFoundPage;
