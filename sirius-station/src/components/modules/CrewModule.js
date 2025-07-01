import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

const CrewModule = () => {
  const { data, updateCrewMember } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredCrew = data.crewMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusUpdate = (memberId, newStatus) => {
    updateCrewMember(memberId, { 
      status: newStatus, 
      lastUpdate: new Date().toISOString() 
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>
          Crew Management
        </h1>
        <p style={{ color: '#64748b' }}>Monitor and manage crew member status</p>
      </div>

      <div style={{ 
        display: 'flex', 
        gap: '20px', 
        marginBottom: '30px',
        flexWrap: 'wrap'
      }}>
        <input
          type="text"
          placeholder="Search crew members..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            background: 'rgba(30, 41, 59, 0.8)',
            border: '1px solid rgba(100, 116, 139, 0.3)',
            borderRadius: '8px',
            padding: '12px 16px',
            color: '#e2e8f0',
            fontSize: '14px',
            minWidth: '300px'
          }}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            background: 'rgba(30, 41, 59, 0.8)',
            border: '1px solid rgba(100, 116, 139, 0.3)',
            borderRadius: '8px',
            padding: '12px 16px',
            color: '#e2e8f0',
            fontSize: '14px'
          }}
        >
          <option value="all">All Status</option>
          <option value="healthy">Healthy</option>
          <option value="injured">Injured</option>
          <option value="resting">Resting</option>
        </select>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '20px'
      }}>
        {filteredCrew.map((member) => (
          <Card key={member.id} hover>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ 
                fontSize: '40px', 
                marginRight: '16px',
                background: 'rgba(59, 130, 246, 0.1)',
                borderRadius: '50%',
                width: '60px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {member.avatar}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px' }}>
                  {member.name}
                </h3>
                <p style={{ color: '#64748b', fontSize: '14px' }}>
                  {member.specialty}
                </p>
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#64748b' }}>Status:</span>
                <Badge status={member.status}>{member.status}</Badge>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#64748b' }}>Location:</span>
                <span>{member.location}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['healthy', 'injured', 'resting'].map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusUpdate(member.id, status)}
                  style={{
                    background: member.status === status 
                      ? 'rgba(59, 130, 246, 0.2)' 
                      : 'rgba(100, 116, 139, 0.1)',
                    border: `1px solid ${member.status === status ? '#3b82f6' : 'rgba(100, 116, 139, 0.3)'}`,
                    color: member.status === status ? '#3b82f6' : '#94a3b8',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    cursor: 'pointer',
                    textTransform: 'capitalize'
                  }}
                >
                  {status}
                </button>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CrewModule;
