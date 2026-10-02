import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function WeeklyTrends({ healthData }) {
  const today = new Date();

  const data = [...healthData]
    .filter((item) => {
      const recordDate = new Date(`${item.date}T00:00:00`);

      const differenceInTime =
        today.getTime() - recordDate.getTime();

      const differenceInDays =
        differenceInTime / (1000 * 60 * 60 * 24);

      return differenceInDays >= 0 && differenceInDays < 7;
    })
    .sort(
      (a, b) =>
        new Date(a.date) - new Date(b.date)
    )
    .map((item) => ({
      date: item.date.slice(5),
      Intake: Number(item.calorieIntake),
      Burned: Number(item.calorieBurned),
    }));

  // Don't show Weekly Health Trends
  // when there is no data from the last 7 days.
  if (data.length === 0) {
    return null;
  }

  return (
    <section className="trends-section">
      <h2>Weekly Health Trends</h2>

      <div className="trends-chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 4,
              right: 4,
              left: -24,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="date"
              fontSize={8}
            />

            <YAxis fontSize={8} />

            <Tooltip />

            <Bar
              dataKey="Intake"
              fill="#8b1cfb"
              barSize={8}
              radius={[1, 1, 0, 0]}
            />

            <Bar
              dataKey="Burned"
              fill="#7fc89b"
              barSize={8}
              radius={[1, 1, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default WeeklyTrends;