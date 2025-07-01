import React, { useState } from 'react';
import Card from '../ui/Card';

const initialFacilities = [
  { id: 1, name: 'Life Support', status: 'operational' },
  { id: 2, name: 'Solar Array', status: 'needs-attention' }
];

const MaintenanceModule = () => {
  const [facilities, setFacilities] = useState(initialFacilities);

  const updateStatus = (id, status) => {
    setFacilities(facilities.map(fac =>
      fac.id === id ? { ...fac, status } : fac
    ));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 20 }}>Maintenance</h1>
      <div>
        {facilities.map(fac => (
          <Card key={fac.id} style={{ marginBottom: 10 }}>
            <div style={{ fontWeight: 600 }}>{fac.name}</div>
            <div>Status: {fac.status}</div>
            <button onClick={() => updateStatus(fac.id, 'operational')} className="btn-primary" style={{ marginRight: 10 }}>Operational</button>
            <button onClick={() => updateStatus(fac.id, 'needs-attention')} className="btn-primary">Needs Attention</button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MaintenanceModule;
