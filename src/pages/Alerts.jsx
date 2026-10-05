import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import AlertCard from "../components/AlertCard";

function Alerts() {
  return (
    <div className="app-layout">

      <Sidebar />

      <main className="main-content">

        <Navbar />

        <div className="page-content">

          <div className="page-heading">

            <div>
              <h1>Alerts</h1>
              <p>Monitor energy threshold violations.</p>
            </div>

          </div>

          <div className="alert-filters">
            <button className="filter-active">All</button>
            <button>Critical</button>
            <button>Warning</button>
            <button>Resolved</button>
          </div>

          <div className="alerts-list">

            <AlertCard
              type="critical"
              title="Maximum power exceeded"
              description="MTR-002 consumed 12.8 kW. Maximum allowed is 10 kW."
              time="2 minutes ago"
            />

            <AlertCard
              type="warning"
              title="Daily limit approaching"
              description="MTR-001 has consumed 28.6 kWh out of 30 kWh."
              time="10 minutes ago"
            />

            <AlertCard
              type="warning"
              title="Budget threshold approaching"
              description="Monthly energy cost reached 90% of the budget."
              time="1 hour ago"
            />

            <AlertCard
              type="success"
              title="Alert resolved"
              description="MTR-003 returned to normal consumption."
              time="2 hours ago"
            />

          </div>

        </div>

      </main>

    </div>
  );
}

export default Alerts;