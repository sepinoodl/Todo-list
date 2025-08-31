const inputElem = document.getElementById("input-box");
const todoListElem = document.getElementById("todoList");
const addButton = document.getElementById("addButton");

let todosArray = [];

window.addEventListener("load", () => {
  const savedTodos = JSON.parse(localStorage.getItem("todos"));
  if (savedTodos) {
    todosArray = savedTodos;
    renderTodos(todosArray);
  }
});

addButton.addEventListener("click", addNewTodo);
inputElem.addEventListener("keydown", (event) => {
  if (event.code === "Enter") addNewTodo();
});

function addNewTodo() {
  const title = inputElem.value.trim();
  if (!title) return;

  const newTodo = {
    id: Date.now(),
    title,
    complete: false,
  };

  todosArray.push(newTodo);
  updateLocalStorage();
  renderTodos(todosArray);
  inputElem.value = "";
  inputElem.focus();
}

function renderTodos(todos) {
  todoListElem.innerHTML = "";

  todos.forEach((todo) => {
    const li = document.createElement("li");
    if (todo.complete) li.classList.add("checked");

    // Custom checkbox
    const checkboxLabel = document.createElement("label");
    checkboxLabel.className = "custom-checkbox";

    const checkboxInput = document.createElement("input");
    checkboxInput.type = "checkbox";
    checkboxInput.checked = todo.complete;
    checkboxInput.onchange = () => toggleComplete(todo.id);

    const checkmark = document.createElement("span");
    checkmark.className = "checkmark";

    checkboxLabel.append(checkboxInput, checkmark);

    // Task text
    const taskText = document.createElement("span");
    taskText.className = "task-text";
    taskText.textContent = todo.title;

    // Delete icon
    const deleteBtn = document.createElement("span");
    deleteBtn.innerHTML = "×";
    deleteBtn.className = "delete-icon";
    deleteBtn.onclick = () => deleteTodo(todo.id);

    li.append(checkboxLabel, taskText, deleteBtn);
    todoListElem.appendChild(li);
  });
}

function toggleComplete(id) {
  todosArray = todosArray.map((todo) =>
    todo.id === id ? { ...todo, complete: !todo.complete } : todo
  );
  updateLocalStorage();
  renderTodos(todosArray);
}

function deleteTodo(id) {
  todosArray = todosArray.filter((todo) => todo.id !== id);
  updateLocalStorage();
  renderTodos(todosArray);
}

function updateLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todosArray));
}
