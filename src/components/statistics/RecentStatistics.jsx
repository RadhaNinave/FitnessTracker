import { FaEdit, FaTrash } from 'react-icons/fa';

function RecentStatistics({ healthData, onEdit, onDelete }) {
  const records = [...healthData].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <section className="recent-section">
      <h2>Recent Health Statistics.</h2>
      {records.length === 0 ? (
        <p className="empty-text">No Progress to show</p>
      ) : (
        <div className="statistics-list">
          {records.slice(0, 5).map((record) => (
            <article className="stat-row" key={record.id}>
              <div className="stat-main">
                <strong>{record.date}</strong>
                <span>Intake: {record.calorieIntake} kcal</span>
                <span>Burned: {record.calorieBurned} kcal</span>
                {record.description && <small>{record.description}</small>}
              </div>
              <div className="row-actions">
                <button className="edit-action" title="Edit" onClick={() => onEdit(record)}><FaEdit /></button>
                <button className="delete-action" title="Delete" onClick={() => onDelete(record.id)}><FaTrash /></button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default RecentStatistics;
