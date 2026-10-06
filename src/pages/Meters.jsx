import { useState } from "react";
import { Plus, Search } from "lucide-react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import MeterCard from "../components/MeterCard";
import { getPortalUsage } from "../Services/usageService";

function Meters() {

  const [search, setSearch] = useState("");

  const meters = getPortalUsage()?.meters ?? [
    {
      id: "MTR-001",
      location: "Residential Building A",
      status: "Online",
      usage: "4.82",
    },
    {
      id: "MTR-002",
      location: "Industrial Plant",
      status: "Online",
      usage: "12.80",
    },
    {
      id: "MTR-003",
      location: "Office Building",
      status: "Offline",
      usage: "0.00",
    },
    {
      id: "MTR-004",
      location: "Warehouse",
      status: "Online",
      usage: "6.35",
    },
  ];

  const filteredMeters = meters.filter((meter) =>
    meter.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app-layout">

      <Sidebar />

      <main className="main-content">

        <Navbar />

        <div className="page-content">

          <div className="page-heading">

            <div>
              <h1>Smart Meters</h1>
              <p>Manage and monitor registered energy meters.</p>
            </div>

            <button className="primary-button">
              <Plus size={18} />
              Register Meter
            </button>

          </div>

          <div className="search-large">

            <Search size={20} />

            <input
              placeholder="Search meter ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

          <div className="meter-grid">

            {filteredMeters.map((meter) => (
              <MeterCard
                key={meter.id}
                meter={meter}
              />
            ))}

          </div>

        </div>

      </main>

    </div>
  );
}

export default Meters;
