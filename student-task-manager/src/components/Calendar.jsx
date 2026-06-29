import "./Calendar.css";
function Calendar({ openDate, goBack }) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  function getDateKey(day) {
    const date = new Date(year, month, day);
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }
  function getStats(day) {
    const tasks =
      JSON.parse(localStorage.getItem("task_" + getDateKey(day))) || [];
    const completed = tasks.filter((t) => t.done).length;
    const progress =
      tasks.length === 0
        ? 0
        : Math.round((completed / tasks.length) * 100);
    return {
      total: tasks.length,
      progress,
    };
  }
  function getDayName(day) {
    return new Date(year, month, day).toLocaleDateString("en-US", {
      weekday: "short",
    });
  }
  return (
    <div className="page">
      <h2>
        {today.toLocaleString("default", {
          month: "long",
        })}{" "}
        {year}
      </h2>
      <div className="calGrid">
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={i}></div>
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const key = getDateKey(day);
          const stats = getStats(day);
          return (
            <div
              key={day}
              className="calBox"
              onClick={() => openDate(key)}
              >
              <small>{getDayName(day)}</small>
              <br />
              <b>{day}</b>
              {stats.total > 0 && (
                <>
                  <span className="dot">
                    {stats.total}
                  </span>
                  <div className="miniBar">
                    <div
                      className="miniFill"
                      style={{
                        width: `${stats.progress}%`,
                      }}
                    ></div>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
      <button className="btn" onClick={goBack}>
        Back
      </button>
    </div>
  );
}
export default Calendar;