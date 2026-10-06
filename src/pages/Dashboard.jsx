import {
  Gauge,
  Zap,
  Activity,
  AlertTriangle,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/Statcard";
import UsageChart from "../components/UsageChart";
import AlertCard from "../components/AlertCard";
import { getPortalUsage } from "../Services/usageService";

function Dashboard() {
  const usage = getPortalUsage();
  return (
    <div className="app-layout">

      <Sidebar />

      <main className="main-content">

        <Navbar />

        <div className="page-content">

          <div className="page-heading">
            <div>
              <h1>Good Evening 👋</h1>
              <p>Here's your energy overview for today.</p>
            </div>

            <span className="system-status">
              ● System Operational
            </span>
          </div>

          <div className="stats-grid">

            <StatCard
              title="Total Meters"
              value={usage?.totalMeters ?? "12"}
              unit=""
              change="+2.4% this month"
              icon={<Gauge size={24} />}
              type="blue"
            />

            <StatCard
              title="Today's Usage"
              value={usage?.todayUsage ?? "248"}
              unit="kWh"
              change="-8.2% from yesterday"
              icon={<Zap size={24} />}
              type="green"
            />

            <StatCard
              title="Current Load"
              value={usage?.currentLoad ?? "4.82"}
              unit="kW"
              change="Normal"
              icon={<Activity size={24} />}
              type="purple"
            />

            <StatCard
              title="Active Alerts"
              value={usage?.activeAlerts ?? "3"}
              unit=""
              change="2 warnings"
              icon={<AlertTriangle size={24} />}
              type="orange"
            />

          </div>

          <div className="dashboard-grid">

            <UsageChart data={usage?.chart} />

            <div className="alerts-panel">

              <div className="card-header">
                <div>
                  <h3>Recent Alerts</h3>
                  <p>Latest threshold events</p>
                </div>

                <a href="/alerts">View All</a>
              </div>

              <AlertCard
                type="critical"
                title="Power threshold exceeded"
                description="MTR-002 exceeded 10 kW."
                time="2 minutes ago"
              />

              <AlertCard
                type="warning"
                title="Daily limit approaching"
                description="MTR-001 reached 95% of limit."
                time="10 minutes ago"
              />

              <AlertCard
                type="success"
                title="Meter back to normal"
                description="MTR-003 returned below limit."
                time="30 minutes ago"
              />

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Dashboard;
