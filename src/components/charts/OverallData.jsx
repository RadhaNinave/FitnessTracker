import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

function OverallData({ healthData }) {
  const intake = healthData.reduce((sum, item) => sum + Number(item.calorieIntake || 0), 0);
  const burned = healthData.reduce((sum, item) => sum + Number(item.calorieBurned || 0), 0);
  const data = [
    { name: 'Intake', value: intake },
    { name: 'Burned', value: burned },
  ];

  return (
    <section className="overall-section">
      <h2>Overall Data:</h2>
      <div className="pie-area">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={38} innerRadius={0}>
              <Cell fill="#8b1cfb" />
              <Cell fill="#f3a229" />
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-legend">
        <span><i className="legend-dot intake" />Intake</span>
        <span><i className="legend-dot burned" />Burned</span>
      </div>
    </section>
  );
}

export default OverallData;
