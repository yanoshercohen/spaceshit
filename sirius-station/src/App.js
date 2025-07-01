import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './components/modules/Dashboard';
import CrewModule from './components/modules/CrewModule';
import ExperimentsModule from './components/modules/ExperimentsModule';
import CommunicationsModule from './components/modules/CommunicationsModule';
import ResourcesModule from './components/modules/ResourcesModule';
import MaintenanceModule from './components/modules/MaintenanceModule';
import NotFoundPage from './components/modules/NotFoundPage';
import './styles/globals.css';

function App() {
  return (
    <AppProvider>
      <Router>
        <div style={{ display: 'flex', minHeight: '100vh' }}>
          <Sidebar />
          <main style={{ 
            flex: 1, 
            marginLeft: '250px',
            background: 'linear-gradient(135deg, #0a0e1a 0%, #1a1f3a 100%)',
            minHeight: '100vh'
          }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/crew" element={<CrewModule />} />
              <Route path="/experiments" element={<ExperimentsModule />} />
              <Route path="/communications" element={<CommunicationsModule />} />
              <Route path="/resources" element={<ResourcesModule />} />
              <Route path="/maintenance" element={<MaintenanceModule />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
