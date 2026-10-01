import { useEffect, useState } from 'react';
import Dashboard from './pages/Dashboard';
import { STORAGE_KEY } from './utils/constants';

function loadInitialData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
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
    localStorage.setItem(STORAGE_KEY, JSON.stringify(healthData));
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
