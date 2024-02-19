import { useState } from "react";

function App() {
  const [toDos, setToDos] = useState([]);
  return (
    <div className="app">
      <h2 className="header">Simple To-Do App ⚛️</h2>
      <ToDoList setTasks={setToDos} tasks={toDos} />
      <AddTask setTasks={setToDos} />
    </div>
  );
}

function ToDoList({ setTasks, tasks }) {
  return (
    <ul className="sidebar">
      {tasks.map((el) => (
        <ToDo setTasks={setTasks} task={el} key={el.id} />
      ))}
    </ul>
  );
}

function ToDo({ setTasks, task }) {
  const [checked, setChecked] = useState(task.finished);

  function handleClick() {
    setTasks((tasks) => tasks.filter((el) => el.id !== task.id));
  }

  return (
    <li className={checked ? "selected" : ""}>
      <input
        type="checkbox"
        onChange={() => setChecked((val) => !val)}
        checked={checked}
        name="check"
      />
      <label
        htmlFor="check"
        style={{
          color:
            task.priority === "1"
              ? "#722F37"
              : task.priority === "2"
              ? "#ed9260"
              : "blue",
          textDecoration: checked ? "line-through" : "none",
        }}
      >
        {`${
          task.priority === "1"
            ? "I must"
            : task.priority === "2"
            ? "I should"
            : "I may"
        } ${task.task}`}
      </label>

      <button onClick={handleClick} className="button">
        <i className="fa-solid fa-trash-can"></i>
      </button>
    </li>
  );
}

function AddTask({ setTasks }) {
  const [name, setName] = useState("");
  const [priority, setPriority] = useState("1");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name) return;
    const id = crypto.randomUUID();

    const newTask = { task: name, priority, finished: false, id };

    setTasks((tasks) => [...tasks, newTask]);
    setName("");
    setPriority("1");
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <label htmlFor="name">Task Name: </label>
      <input
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="priority">Priority: </label>
      <select
        name="priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="1">Must</option>
        <option value="2">Should</option>
        <option value="3">May</option>
      </select>
      <button className="button" type="submit">
        Add The Task
      </button>
    </form>
  );
}

export default App;
