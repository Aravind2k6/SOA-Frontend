import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import UsageChart from "../components/UsageChart";
import { getPortalUsage } from "../Services/usageService";

function MeterDetails() {

  const { id } = useParams();
  const usage = getPortalUsage();
  const meter = usage?.meters.find((item) => item.id === id);

  if (usage && !meter) {
    return <div className="app-layout"><Sidebar /><main className="main-content"><Navbar /><div className="page-content"><div className="page-heading"><div><h1>Meter unavailable</h1><p>This meter is not assigned to your account.</p></div></div></div></main></div>;
  }

  return (
    <div className="app-layout">

      <Sidebar />

      <main className="main-content">

        <Navbar />

        <div className="page-content">

          <div className="page-heading">

            <div>
              <h1>{id}</h1>
              <p>Smart meter detailed information</p>
            </div>

            <span className="online">
              ● Online
            </span>

          </div>

          <div className="detail-stats">

            <div className="detail-card">
              <span>Current Consumption</span>
              <strong>{meter?.usage ?? "4.82"} kW</strong>
            </div>

            <div className="detail-card">
              <span>Today's Usage</span>
              <strong>{meter?.todayUsage ?? "28.6"} kWh</strong>
            </div>

            <div className="detail-card">
              <span>Monthly Usage</span>
              <strong>{meter?.monthlyUsage ?? "742"} kWh</strong>
            </div>

            <div className="detail-card">
              <span>Daily Limit</span>
              <strong>{meter?.dailyLimit ?? "30"} kWh</strong>
            </div>

          </div>

          <UsageChart data={meter?.chart ?? usage?.chart} />

          <div className="threshold-card">

            <h3>Consumption Threshold</h3>

            <div className="progress-bar">
              <div style={{ width: `${Math.min(100, (Number(meter?.todayUsage ?? 28.6) / Number(meter?.dailyLimit ?? 30)) * 100)}%` }}></div>
            </div>

            <p>
              {meter?.todayUsage ?? "28.6"} kWh / {meter?.dailyLimit ?? "30"} kWh
            </p>

            <span className="warning-text">
              ⚠ Approaching daily consumption limit
            </span>

          </div>

        </div>

      </main>

    </div>
  );
}

export default MeterDetails;
