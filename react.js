import React, { useState } from "react";

export default function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim() === "") return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: task,
        completed: false,
      },
    ]);

    setTask("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        padding: "20px",
        fontFamily: "Arial"
      }}
    >
      <h1>Smart Task Manager</h1>

      <div style={{ display: "flex", gap: "10px" }}>
        <input
          type="text"
          placeholder="Enter task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          style={{
            flex: 1,
            padding: "10px"
          }}
        />

        <button onClick={addTask}>
          Add Task
        </button>
      </div>

      <h3>Total Tasks: {tasks.length}</h3>

      {tasks.length === 0 ? (
        <p>No tasks added yet.</p>
      ) : (
        <ul>
          {tasks.map((item) => (
            <li
              key={item.id}
              style={{
                margin: "10px 0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <span
                onClick={() => toggleTask(item.id)}
                style={{
                  cursor: "pointer",
                  textDecoration: item.completed
                    ? "line-through"
                    : "none"
                }}
              >
                {item.text}
              </span>

              <button
                onClick={() => deleteTask(item.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
