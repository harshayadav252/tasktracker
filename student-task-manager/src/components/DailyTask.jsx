import { useState, useEffect } from "react";
import "./Weekly.css";
function DailyTask({ date, goBack }) {
  const key = "task_" + date;
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem(key)) || [];
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(tasks));
  }, [tasks, key]);
  function addTask() {
    if (!task.trim()) return;
    setTasks([
      ...tasks,
      {
        text: task,
        done: false,
      },
    ]);
    setTask("");
  }
  function toggle(i) {
    const copy = [...tasks];
    copy[i].done = !copy[i].done;
    setTasks(copy);
  }
  function del(i) {
    setTasks(tasks.filter((_, idx) => idx !== i));
  }
  const completed = tasks.filter((t) => t.done).length;
  const progress =
    tasks.length === 0
      ? 0
      : Math.round((completed / tasks.length) * 100);
  return (
    <div className="page">
      <h2>{date}</h2>
      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter task"
      />
      <button className="btn" onClick={addTask}>
        Add Task
      </button>
      <div className="progressContainer">
        <div className="progressHeader">
          <span>
            {completed}/{tasks.length} Completed
          </span>
          <span>{progress}%</span>
        </div>

        <div className="progressBar">
          <div
            className="progressFill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
{tasks.map((t, i) => (
  <div className="card taskCard" key={i}>
    <div
      className="taskLeft"
      onClick={() => toggle(i)}
    >
      <div className={`checkBox ${t.done ? "checked" : ""}`}>
        {t.done && "✓"}
      </div>
      <span
        className={t.done ? "completedTask" : ""}
      >
        {t.text}
      </span>
    </div>
    <button
      className="btn btn-danger"
      onClick={() => del(i)}
    >
      Delete
    </button>
  </div>
))}
      <button className="btn" onClick={goBack}>
        Back
      </button>
    </div>
  );
}
export default DailyTask;