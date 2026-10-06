import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const defaultData = [
  { time: "00:00", usage: 120 },
  { time: "04:00", usage: 180 },
  { time: "08:00", usage: 280 },
  { time: "12:00", usage: 390 },
  { time: "16:00", usage: 320 },
  { time: "20:00", usage: 450 },
  { time: "24:00", usage: 360 },
];

function UsageChart({ data = defaultData } = {}) {
  return (
    <div className="chart-card">

      <div className="card-header">
        <div>
          <h3>Energy Consumption</h3>
          <p>Today's electricity usage</p>
        </div>

        <select>
          <option>Today</option>
          <option>This Week</option>
          <option>This Month</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={320}>

        <AreaChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="time" />

          <YAxis />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="usage"
            stroke="#16a34a"
            fill="#bbf7d0"
          />

        </AreaChart>

      </ResponsiveContainer>

    </div>
  );
}

export default UsageChart;
