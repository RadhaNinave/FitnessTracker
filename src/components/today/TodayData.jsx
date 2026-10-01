function TodayData({ healthData, onAdd }) {
  const today = new Date().toISOString().slice(0, 10);
  const todayRecord = [...healthData].reverse().find((item) => item.date === today);

  return (
    <div className="today-card">
      <h2>Update Today's Data</h2>
      {todayRecord && (
        <div className="today-values">
          <span>Intake: {todayRecord.calorieIntake} kcal</span>
          <span>Burned: {todayRecord.calorieBurned} kcal</span>
        </div>
      )}
      <button className="add-button" onClick={onAdd}>+ Add data</button>
    </div>
  );
}

export default TodayData;
