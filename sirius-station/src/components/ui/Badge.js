import React from 'react';

const Badge = ({ status, children }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy':
      case 'operational':
      case 'good':
        return { bg: 'rgba(34, 197, 94, 0.2)', color: '#22c55e' };
      case 'injured':
      case 'needs-attention':
      case 'low':
        return { bg: 'rgba(251, 191, 36, 0.2)', color: '#fbbf24' };
      case 'resting':
        return { bg: 'rgba(59, 130, 246, 0.2)', color: '#3b82f6' };
      case 'critical':
        return { bg: 'rgba(239, 68, 68, 0.2)', color: '#ef4444' };
      default:
        return { bg: 'rgba(100, 116, 139, 0.2)', color: '#64748b' };
    }
  };

  const colors = getStatusColor(status);

  return (
    <span
      style={{
        background: colors.bg,
        color: colors.color,
        padding: '4px 12px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: '600',
        textTransform: 'uppercase'
      }}
    >
      {children}
    </span>
  );
};

export default Badge;
