import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import UsageChart from "../components/UsageChart";
import { getPortalUsage } from "../Services/usageService";

function UsageAnalytics() {
  const usage = getPortalUsage();
  return (
    <div className="app-layout">

      <Sidebar />

      <main className="main-content">

        <Navbar />

        <div className="page-content">

          <div className="page-heading">

            <div>
              <h1>Usage Analytics</h1>
              <p>Analyze your electricity consumption patterns.</p>
            </div>

            <select className="period-select">
              <option>This Month</option>
              <option>This Week</option>
              <option>Today</option>
            </select>

          </div>

          <UsageChart data={usage?.chart} />

          <div className="analytics-grid">

            <div className="analytics-card">
              <span>Average Daily Usage</span>
              <strong>{usage?.averageDaily ?? "32.4"} kWh</strong>
            </div>

            <div className="analytics-card">
              <span>Peak Consumption</span>
              <strong>{usage?.peak ?? "8.7"} kW</strong>
            </div>

            <div className="analytics-card">
              <span>Lowest Consumption</span>
              <strong>{usage?.lowest ?? "1.2"} kW</strong>
            </div>

            <div className="analytics-card">
              <span>Monthly Consumption</span>
              <strong>{usage?.monthlyUsage ?? "842"} kWh</strong>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default UsageAnalytics;
