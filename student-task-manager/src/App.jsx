import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Weekly from "./components/Weekly";
import Calendar from "./components/Calendar";
import DailyTask from "./components/DailyTask";
function App() {
  const [page, setPage] = useState("login");
  const [selectedDate, setSelectedDate] = useState("");
  const savedName = localStorage.getItem("name");
  const savedEmail = localStorage.getItem("email");
  const [user, setUser] = useState(
    savedName && savedEmail
      ? { name: savedName, email: savedEmail }
      : null
  );
  function login(name, email) {
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    setUser({ name, email });
    setPage("dashboard");
  }
  function logout() {
    localStorage.removeItem("name");
    localStorage.removeItem("email");

    setUser(null);
    setPage("login");
  }
  if (!user) {
    if (page === "login") {
      return (
        <Login
          login={login}
          goToRegister={() => setPage("register")}
        />
      );
    }

    return (
      <Register
        goToLogin={() => setPage("login")}
      />
    );
  }
  if (page === "dashboard") {
    return (
      <Dashboard
        user={user}
        logout={logout}
        goWeek={() => setPage("week")}
        goCalendar={() => setPage("calendar")}
      />
    );
  }
  if (page === "week") {
    return (
      <Weekly
        openDay={(d) => {
          setSelectedDate(d);
          setPage("daily");
        }}
        goBack={() => setPage("dashboard")}
        goCalendar={() => setPage("calendar")}
      />
    );
  }
if (page === "calendar") {
    return (
      <Calendar
        openDate={(d) => {
          setSelectedDate(d);
          setPage("daily");
        }}
        goBack={() => setPage("dashboard")}
      />
    );
  }
  return (
    <DailyTask
      date={selectedDate}
      goBack={() => setPage("week")}
    />
  );
}
export default App;