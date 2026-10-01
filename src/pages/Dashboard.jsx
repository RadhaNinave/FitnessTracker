import { useState } from 'react';
import TodayData from '../components/today/TodayData';
import RecentStatistics from '../components/statistics/RecentStatistics';
import OverallData from '../components/charts/OverallData';
import WeeklyTrends from '../components/charts/WeeklyTrends';
import HealthDataModal from '../components/forms/HealthDataModal';

function Dashboard({ healthData, onAdd, onUpdate, onDelete }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  const openAdd = () => {
    setEditingRecord(null);
    setModalOpen(true);
  };

  const openEdit = (record) => {
    setEditingRecord(record);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingRecord(null);
  };

  const handleSubmit = (data) => {
    if (editingRecord) onUpdate(editingRecord.id, data);
    else onAdd(data);
    closeModal();
  };

  return (
    <main className="page-shell">
      <section className="tracker">
        <h1>Health And Fitness Tracker</h1>

        <div className="today-panel">
          <TodayData healthData={healthData} onAdd={openAdd} />
          {healthData.length > 0 && <WeeklyTrends healthData={healthData} />}
          {healthData.length === 0 && <p className="no-data-message">No data available</p>}
        </div>

        <div className="bottom-grid">
          <RecentStatistics
            healthData={healthData}
            onEdit={openEdit}
            onDelete={onDelete}
          />
          <OverallData healthData={healthData} />
        </div>
      </section>

      <HealthDataModal
        isOpen={modalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        editingRecord={editingRecord}
      />
    </main>
  );
}

export default Dashboard;
