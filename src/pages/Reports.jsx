import { FileText, Download } from "lucide-react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Reports() {

  const generateReport = () => {
    alert("Report generated successfully!");
  };

  return (
    <div className="app-layout">

      <Sidebar />

      <main className="main-content">

        <Navbar />

        <div className="page-content">

          <div className="page-heading">

            <div>
              <h1>Energy Reports</h1>
              <p>Generate and download energy consumption reports.</p>
            </div>

          </div>

          <div className="report-box">

            <FileText size={45} />

            <h2>Generate Energy Report</h2>

            <p>
              Select your required period and meter.
            </p>

            <div className="report-options">

              <div>
                <label>Period</label>

                <select>
                  <option>September 2026</option>
                  <option>August 2026</option>
                  <option>July 2026</option>
                </select>
              </div>

              <div>
                <label>Meter</label>

                <select>
                  <option>All Meters</option>
                  <option>MTR-001</option>
                  <option>MTR-002</option>
                </select>
              </div>

            </div>

            <button
              className="primary-button"
              onClick={generateReport}
            >
              Generate Report
            </button>

          </div>

          <div className="report-summary">

            <h3>Latest Report</h3>

            <div className="report-row">

              <div>
                <strong>September Energy Report</strong>
                <p>Generated on October 1, 2026</p>
              </div>

              <button className="download-button">
                <Download size={18} />
                Download
              </button>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Reports;