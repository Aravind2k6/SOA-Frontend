import { useMemo, useState } from "react";
import {
  Gauge,
  Zap,
  Activity,
  AlertTriangle,
} from "lucide-react";
import { Link } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/Statcard";
import UsageChart from "../components/UsageChart";
import AlertCard from "../components/AlertCard";
import { getPortalUsage } from "../Services/usageService";

const meters = [
  { id: "MTR-001", label: "Residential Building A", load: 4.82, usage: 248 },
  { id: "MTR-002", label: "Industrial Plant", load: 12.8, usage: 386 },
  { id: "MTR-003", label: "Office Building", load: 0, usage: 164 },
  { id: "MTR-004", label: "Warehouse", load: 6.35, usage: 292 },
];

const periods = {
  today: { label: "Today", times: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "24:00"], multiplier: 1 },
  week: { label: "Last 7 days", times: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], multiplier: 7 },
  month: { label: "Last 30 days", times: ["1", "5", "10", "15", "20", "25", "30"], multiplier: 30 },
};

const sampleReadings = [120, 180, 280, 390, 320, 450, 360];

function Dashboard() {
  const usage = getPortalUsage();
  const [period, setPeriod] = useState("today");
  const [meterId, setMeterId] = useState("all");
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [alerts, setAlerts] = useState([
    { id: "a1", meterId: "MTR-002", type: "critical", title: "Power threshold exceeded", description: "MTR-002 exceeded 10 kW.", time: "2 minutes ago", acknowledged: false },
    { id: "a2", meterId: "MTR-001", type: "warning", title: "Daily limit approaching", description: "MTR-001 reached 95% of limit.", time: "10 minutes ago", acknowledged: false },
    { id: "a3", meterId: "MTR-004", type: "warning", title: "Unexpected evening usage", description: "MTR-004 is using more energy than usual.", time: "30 minutes ago", acknowledged: false },
  ]);
  const selectedMeter = meters.find((meter) => meter.id === meterId);
  const periodInfo = periods[period];
  const chartData = useMemo(() => {
    const factor = selectedMeter ? selectedMeter.usage / 300 : 1;
    return periodInfo.times.map((time, index) => ({
      time,
      usage: Math.round(sampleReadings[index] * factor * (period === "today" ? 1 : period === "week" ? 5.6 : 23.4)),
    }));
  }, [meterId, period, periodInfo.times, selectedMeter]);
  const usageTotal = selectedMeter ? selectedMeter.usage : 248;
  const displayedUsage = Math.round(usageTotal * periodInfo.multiplier);
  const meterCount = selectedMeter ? 1 : (usage?.totalMeters ?? 12);
  const currentLoad = selectedMeter ? selectedMeter.load : Number(usage?.currentLoad ?? 4.82);
  const visibleAlerts = alerts.filter((alert) => meterId === "all" || alert.meterId === meterId);
  const alertCount = usage?.activeAlerts ?? visibleAlerts.filter((alert) => !alert.acknowledged).length;
  const selectedMeterLabel = selectedMeter ? `${selectedMeter.id} · ${selectedMeter.label}` : "All meters";

  return (
    <div className="app-layout">

      <Sidebar />

      <main className="main-content">

        <Navbar />

        <div className="page-content">

          <div className="page-heading dashboard-heading">
            <div>
              <h1>Energy overview</h1>
              <p>Explore usage by meter and time period.</p>
            </div>

            <div className="dashboard-filters">
              <label>
                <span>Time period</span>
                <select value={period} onChange={(event) => { setPeriod(event.target.value); setSelectedPoint(null); }}>
                  <option value="today">Today</option>
                  <option value="week">Last 7 days</option>
                  <option value="month">Last 30 days</option>
                </select>
              </label>
              <label>
                <span>Meter</span>
                <select value={meterId} onChange={(event) => { setMeterId(event.target.value); setSelectedPoint(null); }}>
                  <option value="all">All meters</option>
                  {meters.map((meter) => <option key={meter.id} value={meter.id}>{meter.id} · {meter.label}</option>)}
                </select>
              </label>
            </div>
          </div>

          {!usage && <p className="sample-data-note">Sample dashboard data · connect the API to show live readings.</p>}

          <div className="stats-grid">

            <StatCard
              title="Total Meters"
              value={meterCount}
              unit=""
              change={selectedMeter ? selectedMeter.id : "+2.4% this month"}
              icon={<Gauge size={24} />}
              type="blue"
            />

            <StatCard
              title={`${periodInfo.label} usage`}
              value={displayedUsage}
              unit="kWh"
              change={selectedMeter ? selectedMeter.id : "-8.2% from previous period"}
              icon={<Zap size={24} />}
              type="green"
            />

            <StatCard
              title="Current Load"
              value={currentLoad.toFixed(2)}
              unit="kW"
              change="Normal"
              icon={<Activity size={24} />}
              type="purple"
            />

            <StatCard
              title="Active Alerts"
              value={alertCount}
              unit=""
              change="2 warnings"
              icon={<AlertTriangle size={24} />}
              type="orange"
            />

          </div>

          <div className="dashboard-grid">

            <UsageChart
              data={usage?.chart ?? chartData}
              subtitle={`${periodInfo.label} · ${selectedMeterLabel}`}
              showPeriodSelect={false}
              selectedPoint={selectedPoint}
              onPointClick={setSelectedPoint}
            />

            <div className="alerts-panel">

              <div className="card-header">
                <div>
                  <h3>Recent Alerts</h3>
                  <p>Latest threshold events</p>
                </div>

                <Link to="/alerts">View All</Link>
              </div>

              {visibleAlerts.map((alert) => (
                <AlertCard
                  key={alert.id}
                  {...alert}
                  onAcknowledge={() => setAlerts((previous) => previous.map((item) => item.id === alert.id ? { ...item, acknowledged: true } : item))}
                />
              ))}

              {visibleAlerts.length === 0 && <p className="no-alerts">No recent alerts for this meter.</p>}

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Dashboard;
