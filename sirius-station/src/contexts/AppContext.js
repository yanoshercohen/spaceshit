import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

const initialData = {
  crewMembers: [
    {
      id: 1,
      name: "Commander Sarah Chen",
      specialty: "Mission Command",
      status: "healthy",
      avatar: "👩‍🚀",
      location: "Command Center",
      lastUpdate: "2025-07-01T14:30:00Z"
    },
    {
      id: 2,
      name: "Dr. Alex Novak",
      specialty: "Astrophysics",
      status: "resting",
      avatar: "👨‍🔬",
      location: "Research Lab",
      lastUpdate: "2025-07-01T13:45:00Z"
    }
  ],
  experiments: [
    {
      id: 1,
      title: "Protein Crystal Growth",
      researcher: "Dr. Alex Novak",
      status: "active",
      progress: 75,
      duration: "14 days",
      startDate: "2025-06-20"
    }
  ],
  resources: {
    oxygen: { current: 82, capacity: 100, status: "good" },
    water: { current: 65, capacity: 100, status: "good" },
    food: { current: 45, capacity: 100, status: "low" }
  }
};

export const AppProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('sirius-station-data');
    return saved ? JSON.parse(saved) : initialData;
  });

  useEffect(() => {
    localStorage.setItem('sirius-station-data', JSON.stringify(data));
  }, [data]);

  const updateCrewMember = (id, updates) => {
    setData(prev => ({
      ...prev,
      crewMembers: prev.crewMembers.map(member =>
        member.id === id ? { ...member, ...updates } : member
      )
    }));
  };

  const addExperiment = (experiment) => {
    setData(prev => ({
      ...prev,
      experiments: [...prev.experiments, { ...experiment, id: Date.now() }]
    }));
  };

  return (
    <AppContext.Provider value={{
      data,
      updateCrewMember,
      addExperiment,
      setData
    }}>
      {children}
    </AppContext.Provider>
  );
};
