import React, { useEffect, useState } from "react";
import "./Todo.css";

const Todo = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);


  const fetchTasks = async () => {
    const res = await fetch("http://localhost:3002/todos");
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddOrUpdate = async () => {
    if (!task.trim()) return;

    if (editId) {
      // update task
      await fetch(`http://localhost:3002/update/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task }),
      });
      setEditId(null);
    } else {
      // add new task
      await fetch("http://localhost:3002/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task }),
      });
    }
    setTask("");
    fetchTasks();
  };


    const handleDelete = async (id) => {
      await fetch(`http://localhost:3002/delete/${id}`, { method: "DELETE" });
      fetchTasks();
    };

  const handleEdit = (t) => {
    setTask(t.task);
    setEditId(t._id);
  };

  return (
  <div className="todo-container">
    <h2>Todo App</h2>
    <input
      value={task}
      onChange={(e) => setTask(e.target.value)}
      placeholder="Add a task"
    />
    <button onClick={handleAddOrUpdate}>
      {editId ? "Update" : "Add"}
    </button>

  <ul>
    {tasks.map((t) => (
      <li key={t._id}>
        {t.task}
        <button onClick={() => handleEdit(t)}>✏️</button>
        <button onClick={() => handleDelete(t._id)}>❌</button>
      </li>
    ))}
  </ul>
  </div>
);

};

export default Todo;
