import React, { useState, useEffect } from 'react';
import { useApp } from '../../contexts/AppContext';
import Card from '../ui/Card';

const ResourcesModule = () => {
  const { data, setData } = useApp();
  const [resources, setResources] = useState(data.resources);

  useEffect(() => {
    const interval = setInterval(() => {
      setResources(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(key => {
          if (updated[key].current > 0) {
            const consumption = Math.random() * 0.5;
            updated[key].current = Math.max(0, updated[key].current - consumption);
            
            if (updated[key].current > 70) {
              updated[key].status = 'good';
            } else if (updated[key].current > 30) {
              updated[key].status = 'medium';
            } else {
              updated[key].status = 'low';
            }
          }
        });
        return updated;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'good': return '#22c55e';
      case 'medium': return '#f59e0b';
      case 'low': return '#ef4444';
      default: return '#64748b';
    }
  };

  const ResourceGauge = ({ name, resource, icon }) => (
    <Card>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div style={{ fontSize: '48px', marginBottom: '10px' }}>{icon}</div>
        <h3 style={{ fontSize: '24px', fontWeight: '600', textTransform: 'capitalize' }}>
          {name}
        </h3>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <div style={{
          width: '100%',
          height: '20px',
          background: 'rgba(100, 116, 139, 0.2)',
          borderRadius: '10px',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <div style={{
            width: `${resource.current}%`,
            height: '100%',
            background: `linear-gradient(90deg, ${getStatusColor(resource.status)}, ${getStatusColor(resource.status)}aa)`,
            borderRadius: '10px',
            transition: 'width 0.5s ease'
          }} />
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <div style={{ 
          fontSize: '32px', 
          fontWeight: 'bold', 
          color: getStatusColor(resource.status),
          marginBottom: '5px'
        }}>
          {Math.round(resource.current)}%
        </div>
        <div style={{ color: '#64748b', fontSize: '14px' }}>
          Status: <span style={{ color: getStatusColor(resource.status), textTransform: 'uppercase' }}>
            {resource.status}
          </span>
        </div>
      </div>

      <button
        onClick={() => {
          const newLevel = Math.min(100, resource.current + 20);
          setResources(prev => ({
            ...prev,
            [name]: { ...prev[name], current: newLevel }
          }));
        }}
        style={{
          width: '100%',
          marginTop: '15px',
          background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
          border: 'none',
          color: 'white',
          padding: '10px',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500'
        }}
      >
        Replenish {name}
      </button>
    </Card>
  );

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>
          Resource Monitoring
        </h1>
        <p style={{ color: '#64748b' }}>Real-time station resource levels</p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <ResourceGauge name="oxygen" resource={resources.oxygen} icon="🫁" />
        <ResourceGauge name="water" resource={resources.water} icon="💧" />
        <ResourceGauge name="food" resource={resources.food} icon="🍎" />
      </div>

      <Card>
        <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px' }}>
          Resource Alert System
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {Object.entries(resources).map(([name, resource]) => {
            if (resource.current < 50) {
              return (
                <div key={name} style={{
                  background: resource.current < 30 ? 'rgba(239, 68, 68, 0.1)' : 'rgba(251, 191, 36, 0.1)',
                  border: `1px solid ${resource.current < 30 ? '#ef4444' : '#f59e0b'}`,
                  borderRadius: '8px',
                  padding: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ textTransform: 'capitalize', fontWeight: '500' }}>
                    {name} Level Alert
                  </span>
                  <span style={{ 
                    color: resource.current < 30 ? '#ef4444' : '#f59e0b',
                    fontWeight: 'bold'
                  }}>
                    {Math.round(resource.current)}%
                  </span>
                </div>
              );
            }
            return null;
          })}
        </div>
      </Card>
    </div>
  );
};

export default ResourcesModule;
