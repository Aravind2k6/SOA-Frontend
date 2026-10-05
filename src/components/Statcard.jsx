function StatCard({ title, value, unit, change, icon, type }) {
  return (
    <div className="stat-card">

      <div className={`stat-icon ${type}`}>
        {icon}
      </div>

      <div className="stat-content">
        <p>{title}</p>

        <h2>
          {value} <span>{unit}</span>
        </h2>

        <small className={change?.startsWith("-") ? "negative" : "positive"}>
          {change}
        </small>
      </div>

    </div>
  );
}

export default StatCard;