"use strict";

const STORAGE_KEY = "todo-app.items";

const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const counter = document.getElementById("counter");
const clearDoneBtn = document.getElementById("clear-done");
const filterButtons = document.querySelectorAll(".filter");

let todos = load();
let currentFilter = "all";

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function save() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch {
    /* bỏ qua nếu trình duyệt chặn localStorage */
  }
}

function addTodo(text) {
  todos.unshift({ id: Date.now(), text, done: false });
  save();
  render();
}

function toggleTodo(id) {
  const t = todos.find((x) => x.id === id);
  if (t) t.done = !t.done;
  save();
  render();
}

function deleteTodo(id) {
  todos = todos.filter((x) => x.id !== id);
  save();
  render();
}

function updateTodo(id, text) {
  const t = todos.find((x) => x.id === id);
  if (t && text.trim()) t.text = text.trim();
  save();
  render();
}

function startEdit(li, todo) {
  const textEl = li.querySelector(".text");
  const editor = document.createElement("input");
  editor.type = "text";
  editor.className = "edit-input";
  editor.value = todo.text;
  textEl.replaceWith(editor);
  editor.focus();
  editor.select();

  let finished = false;
  const finish = (commit) => {
    if (finished) return;
    finished = true;
    commit ? updateTodo(todo.id, editor.value) : render();
  };
  editor.addEventListener("blur", () => finish(true));
  editor.addEventListener("keydown", (e) => {
    if (e.key === "Enter") finish(true);
    if (e.key === "Escape") finish(false);
  });
}

function visibleTodos() {
  if (currentFilter === "active") return todos.filter((t) => !t.done);
  if (currentFilter === "done") return todos.filter((t) => t.done);
  return todos;
}

function render() {
  list.innerHTML = "";
  const items = visibleTodos();

  if (items.length === 0) {
    const empty = document.createElement("li");
    empty.className = "empty";
    empty.textContent = "Không có công việc nào";
    list.appendChild(empty);
  }

  for (const todo of items) {
    const li = document.createElement("li");
    if (todo.done) li.classList.add("done");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;
    checkbox.addEventListener("change", () => toggleTodo(todo.id));

    const text = document.createElement("span");
    text.className = "text";
    text.textContent = todo.text; // textContent để tránh XSS
    text.addEventListener("dblclick", () => startEdit(li, todo));

    const del = document.createElement("button");
    del.className = "delete";
    del.setAttribute("aria-label", "Xóa");
    del.textContent = "×";
    del.addEventListener("click", () => deleteTodo(todo.id));

    li.append(checkbox, text, del);
    list.appendChild(li);
  }

  const remaining = todos.filter((t) => !t.done).length;
  counter.textContent = todos.length
    ? `Còn ${remaining} việc chưa xong / ${todos.length} việc`
    : "Chưa có công việc nào";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  addTodo(text);
  input.value = "";
  input.focus();
});

filterButtons.forEach((btn) =>
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    filterButtons.forEach((b) => b.classList.toggle("active", b === btn));
    render();
  })
);

clearDoneBtn.addEventListener("click", () => {
  todos = todos.filter((t) => !t.done);
  save();
  render();
});

render();
