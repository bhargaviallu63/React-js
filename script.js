let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const text = document.getElementById("taskInput").value;
  const priority = document.getElementById("priority").value;

  if (!text.trim()) return;

  tasks.push({
    id: Date.now(),
    text,
    priority,
    done: false
  });

  document.getElementById("taskInput").value = "";
  save();
  render();
}

function toggleTask(id) {
  tasks = tasks.map(t =>
    t.id === id ? { ...t, done: !t.done } : t
  );
  save();
  render();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  save();
  render();
}

function setFilter(f) {
  filter = f;
  render();
}

function toggleDark() {
  document.body.classList.toggle("dark");
}

function render() {
  const list = document.getElementById("list");
  const search = document.getElementById("search").value.toLowerCase();

  let filtered = tasks.filter(t =>
    t.text.toLowerCase().includes(search)
  );

  if (filter === "active") filtered = filtered.filter(t => !t.done);
  if (filter === "done") filtered = filtered.filter(t => t.done);

  document.getElementById("count").innerText = filtered.length;

  list.innerHTML = "";

  filtered.forEach(t => {
    list.innerHTML += `
      <div class="task ${t.priority.toLowerCase()}">
        <span onclick="toggleTask(${t.id})"
          style="text-decoration:${t.done ? 'line-through' : 'none'}">
          ${t.text}
        </span>

        <button onclick="deleteTask(${t.id})">X</button>
      </div>
    `;
  });
}

render();
