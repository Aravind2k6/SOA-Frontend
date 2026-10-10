function AlertCard({ type, title, description, time, acknowledged = false, onAcknowledge }) {
  return (
    <div className={`alert-card ${type}`}>

      <div className="alert-status">
        {type === "critical" && "🔴"}
        {type === "warning" && "🟠"}
        {type === "success" && "🟢"}
      </div>

      <div className="alert-content">

        <h4>{title}</h4>

        <p>{description}</p>

        <small>{time}</small>

        {onAcknowledge && (
          <button
            type="button"
            className="alert-acknowledge"
            onClick={onAcknowledge}
            disabled={acknowledged}
          >
            {acknowledged ? "Acknowledged" : "Acknowledge"}
          </button>
        )}

      </div>

    </div>
  );
}

export default AlertCard;
