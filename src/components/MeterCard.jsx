import { Gauge, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

function MeterCard({ meter }) {
  return (
    <div className="meter-card">

      <div className="meter-header">

        <div className="meter-icon">
          <Gauge size={24} />
        </div>

        <span className={meter.status === "Online" ? "online" : "offline"}>
          ● {meter.status}
        </span>

      </div>

      <h3>{meter.id}</h3>

      <p className="location">
        <MapPin size={15} />
        {meter.location}
      </p>

      <div className="meter-usage">

        <span>Current Usage</span>

        <strong>{meter.usage} kW</strong>

      </div>

      <Link to={`/meters/${meter.id}`} className="view-button">
        View Details
      </Link>

    </div>
  );
}

export default MeterCard;