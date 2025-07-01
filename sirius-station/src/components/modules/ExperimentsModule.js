import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import Card from '../ui/Card';

const ExperimentsModule = () => {
  const { data, addExperiment } = useApp();
  const [title, setTitle] = useState('');
  const [researcher, setResearcher] = useState('');

  const handleAdd = () => {
    if (title && researcher) {
      addExperiment({
        title,
        researcher,
        status: 'active',
        progress: 0,
        duration: '7 days',
        startDate: new Date().toISOString().slice(0, 10)
      });
      setTitle('');
      setResearcher('');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 20 }}>Experiments</h1>
      <Card>
        <input
          placeholder="Experiment title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          style={{ marginRight: 10, padding: 8, borderRadius: 6, border: '1px solid #333', background: '#232946', color: '#fff' }}
        />
        <input
          placeholder="Researcher"
          value={researcher}
          onChange={e => setResearcher(e.target.value)}
          style={{ marginRight: 10, padding: 8, borderRadius: 6, border: '1px solid #333', background: '#232946', color: '#fff' }}
        />
        <button onClick={handleAdd} className="btn-primary">Add Experiment</button>
      </Card>
      <div style={{ marginTop: 30 }}>
        {data.experiments.map(exp => (
          <Card key={exp.id} style={{ marginBottom: 10 }}>
            <div style={{ fontWeight: 600 }}>{exp.title}</div>
            <div>Researcher: {exp.researcher}</div>
            <div>Status: {exp.status}</div>
            <div>Progress: {exp.progress}%</div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExperimentsModule;
