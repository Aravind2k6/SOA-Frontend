import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import UsageChart from "../components/UsageChart";

function MeterDetails() {

  const { id } = useParams();

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
              <strong>4.82 kW</strong>
            </div>

            <div className="detail-card">
              <span>Today's Usage</span>
              <strong>28.6 kWh</strong>
            </div>

            <div className="detail-card">
              <span>Monthly Usage</span>
              <strong>742 kWh</strong>
            </div>

            <div className="detail-card">
              <span>Daily Limit</span>
              <strong>30 kWh</strong>
            </div>

          </div>

          <UsageChart />

          <div className="threshold-card">

            <h3>Consumption Threshold</h3>

            <div className="progress-bar">
              <div style={{ width: "95%" }}></div>
            </div>

            <p>
              28.6 kWh / 30 kWh
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