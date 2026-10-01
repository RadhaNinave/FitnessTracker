import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

function WeeklyTrends({ healthData }) {
  const data = [...healthData]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(-7)
    .map((item) => ({
      date: item.date.slice(5),
      Intake: Number(item.calorieIntake),
      Burned: Number(item.calorieBurned),
    }));

  return (
    <section className="trends-section">
      <h2>Weekly Health Trends</h2>
      <div className="trends-chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" fontSize={8} />
            <YAxis fontSize={8} />
            <Tooltip />
            <Bar dataKey="Intake" fill="#8b1cfb" barSize={8} radius={[1, 1, 0, 0]} />
            <Bar dataKey="Burned" fill="#7fc89b" barSize={8} radius={[1, 1, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default WeeklyTrends;
