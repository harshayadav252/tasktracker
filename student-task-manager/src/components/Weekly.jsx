import "./Weekly.css";
function Weekly({ openDay, goBack }) {
  const today = new Date();
  function getWeek() {
    const start = new Date(today);
    start.setDate(today.getDate() - today.getDay());
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
  }
  const week = getWeek();
  function getKey(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }
  function getDayName(date) {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
    });
  }
  function getStats(date) {
    const tasks =
      JSON.parse(localStorage.getItem("task_" + getKey(date))) || [];
    const completed = tasks.filter((t) => t.done).length;
    const progress =
      tasks.length === 0
        ? 0
        : Math.round((completed / tasks.length) * 100);
    return {
      total: tasks.length,
      completed,
      progress,
    };
  }
  return (
    <div className="page">
      <h2>This Week</h2>
      {week.map((date, i) => {
        const stats = getStats(date);
        return (
          <div
            key={i}
            className="weekCard"
            onClick={() => openDay(getKey(date))}
          >
            <div style={{ width: "100%" }}>
              <h4>{getDayName(date)}</h4>
              <p>
                {stats.completed}/{stats.total} Tasks
              </p>
              <div className="progressBar">
                <div
                  className="progressFill"
                  style={{
                    width: `${stats.progress}%`,
                  }}
                ></div>
              </div>
              <small>{stats.progress}% Completed</small>
            </div>
          </div>
        );
      })}
     <button className="btn" onClick={goBack}>
        Back
      </button>
    </div>
  );
}
export default Weekly;