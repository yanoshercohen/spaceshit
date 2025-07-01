import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

const Dashboard = () => {
  const { data } = useApp();

  const getStatusCounts = () => {
    const counts = { healthy: 0, injured: 0, resting: 0 };
    data.crewMembers.forEach(member => {
      counts[member.status]++;
    });
    return counts;
  };

  const statusCounts = getStatusCounts();

  const StatCard = ({ title, value, icon, color, link }) => (
    <Link to={link} style={{ textDecoration: 'none' }}>
      <Card hover>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '8px' }}>
              {title}
            </p>
            <p style={{ fontSize: '32px', fontWeight: 'bold', color }}>
              {value}
            </p>
          </div>
          <div style={{ fontSize: '48px', opacity: 0.7 }}>
            {icon}
          </div>
        </div>
      </Card>
    </Link>
  );

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '8px' }}>
          Mission Control Dashboard
        </h1>
        <p style={{ color: '#64748b', fontSize: '16px' }}>
          Welcome to Sirius Station Command Center
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <StatCard
          title="Total Crew"
          value={data.crewMembers.length}
          icon="👨‍🚀"
          color="#3b82f6"
          link="/crew"
        />
        <StatCard
          title="Active Experiments"
          value={data.experiments.filter(exp => exp.status === 'active').length}
          icon="🧪"
          color="#10b981"
          link="/experiments"
        />
        <StatCard
          title="System Alerts"
          value="2"
          icon="⚠️"
          color="#f59e0b"
          link="/maintenance"
        />
        <StatCard
          title="Resource Status"
          value="NOMINAL"
          icon="📊"
          color="#22c55e"
          link="/resources"
        />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '20px'
      }}>
        <Card>
          <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px' }}>
            Crew Status Overview
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Badge status="healthy">Healthy</Badge>
                <span>Crew Members</span>
              </span>
              <span style={{ fontSize: '18px', fontWeight: '600' }}>{statusCounts.healthy}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Badge status="injured">Injured</Badge>
                <span>Crew Members</span>
              </span>
              <span style={{ fontSize: '18px', fontWeight: '600' }}>{statusCounts.injured}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Badge status="resting">Resting</Badge>
                <span>Crew Members</span>
              </span>
              <span style={{ fontSize: '18px', fontWeight: '600' }}>{statusCounts.resting}</span>
            </div>
          </div>
        </Card>

        <Card>
          <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px' }}>
            Recent Activity
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{
              padding: '12px',
              background: 'rgba(59, 130, 246, 0.1)',
              borderRadius: '8px',
              borderLeft: '4px solid #3b82f6'
            }}>
              <p style={{ fontSize: '14px', marginBottom: '4px' }}>
                <strong>Experiment Update</strong>
              </p>
              <p style={{ color: '#64748b', fontSize: '12px' }}>
                Protein Crystal Growth - 75% complete
              </p>
            </div>
            <div style={{
              padding: '12px',
              background: 'rgba(34, 197, 94, 0.1)',
              borderRadius: '8px',
              borderLeft: '4px solid #22c55e'
            }}>
              <p style={{ fontSize: '14px', marginBottom: '4px' }}>
                <strong>System Status</strong>
              </p>
              <p style={{ color: '#64748b', fontSize: '12px' }}>
                All life support systems operational
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
