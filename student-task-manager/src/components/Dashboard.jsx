import "./Dashboard.css";
function Dashboard({ user, logout, goWeek, goCalendar }) {
  const today = new Date();
  return (
    <div className="page">
      <h1>Hello {user.name} </h1>
      <p>{today.toDateString()}</p>
      <div className="card" onClick={goWeek}>
         Today's Tasks
      </div>
      <div className="card" onClick={goCalendar}>
         Open Calendar
      </div>
      <button className="btn btn-danger" onClick={logout}>
        Logout
      </button>
    </div>
  );
}
export default Dashboard;