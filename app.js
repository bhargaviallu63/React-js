import React, { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [dark, setDark] = useState(false);

  // Load from storage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks"));
    if (saved) setTasks(saved);
  }, []);

  // Save to storage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!input.trim()) return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: input,
        priority,
        done: false
      }
    ]);

    setInput("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const filteredTasks = tasks
    .filter((t) =>
      t.text.toLowerCase().includes(search.toLowerCase())
    )
    .filter((t) => {
      if (filter === "active") return !t.done;
      if (filter === "done") return t.done;
      return true;
    });

  return (
    <div className={dark ? "app dark" : "app"}>
      
      <div className="header">
        <h1>⚡ React Productivity Pro</h1>
        <button onClick={() => setDark(!dark)}>
          {dark ? "☀️" : "🌙"}
        </button>
      </div>

      {/* INPUT SECTION */}
      <div className="row">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter task..."
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <button onClick={addTask}>Add</button>
      </div>

      {/* SEARCH + FILTER */}
      <input
        className="search"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="filters">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("done")}>Completed</button>
      </div>

      <p>Total Tasks: {filteredTasks.length}</p>

      {/* TASK LIST */}
      {filteredTasks.map((t) => (
        <div key={t.id} className={`task ${t.priority}`}>
          <span
            onClick={() => toggleTask(t.id)}
            style={{
              textDecoration: t.done ? "line-through" : "none"
            }}
          >
            {t.text}
          </span>

          <button onClick={() => deleteTask(t.id)}>X</button>
        </div>
      ))}
    </div>
  );
}
