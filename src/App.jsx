import { useEffect, useState } from 'react';
import Dashboard from './pages/Dashboard';
import { healthAndFitness } from './utils/constants';

function loadInitialData() {
  try {
    const saved = localStorage.getItem(healthAndFitness);
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function App() {
  const [healthData, setHealthData] = useState(loadInitialData);

  useEffect(() => {
    localStorage.setItem(healthAndFitness, JSON.stringify(healthData));
  }, [healthData]);

  const addHealthData = (data) => {
    setHealthData((prev) => [...prev, { ...data, id: Date.now() }]);
  };

  const updateHealthData = (id, data) => {
    setHealthData((prev) => prev.map((item) => item.id === id ? { ...item, ...data } : item));
  };

  const deleteHealthData = (id) => {
    setHealthData((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <Dashboard
      healthData={healthData}
      onAdd={addHealthData}
      onUpdate={updateHealthData}
      onDelete={deleteHealthData}
    />
  );
}

export default App;
