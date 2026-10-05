function AlertCard({ type, title, description, time }) {
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

      </div>

    </div>
  );
}

export default AlertCard;