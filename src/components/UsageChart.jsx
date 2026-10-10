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

function UsageChart({ data = defaultData, subtitle = "Today's electricity usage", showPeriodSelect = true, onPointClick, selectedPoint } = {}) {
  return (
    <div className="chart-card">

      <div className="card-header">
        <div>
          <h3>Energy Consumption</h3>
          <p>{subtitle}</p>
        </div>

        {showPeriodSelect && <select aria-label="Chart time period" defaultValue="Today">
          <option>Today</option>
          <option>This Week</option>
          <option>This Month</option>
        </select>}
      </div>

      <ResponsiveContainer width="100%" height={320}>

        <AreaChart data={data} onClick={(state) => {
          const point = state?.activePayload?.[0]?.payload;
          if (point) onPointClick?.(point);
        }}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="time" />

          <YAxis unit=" kWh" width={64} />

          <Tooltip formatter={(value) => [`${value} kWh`, "Usage"]} />

          <Area
            type="monotone"
            dataKey="usage"
            stroke="#16a34a"
            fill="#bbf7d0"
            activeDot={{ r: 7 }}
          />

        </AreaChart>

      </ResponsiveContainer>

      {selectedPoint ? (
        <p className="chart-selection" aria-live="polite">
          <strong>{selectedPoint.time}</strong>: {selectedPoint.usage} kWh in this interval
        </p>
      ) : (
        <p className="chart-hint">Select a point on the chart to inspect that interval.</p>
      )}

    </div>
  );
}

export default UsageChart;
