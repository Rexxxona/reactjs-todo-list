import React, { useState } from 'react';

function TaskItem({ task, onDelete, onToggle }) {
  return (
      <div>
        <h3 style={{ textDecoration: task.completed ? 'line-through' : '' }}>
          {task.description}
        </h3>
        <p>Važi do: {task.dueDate}</p>
        <button onClick={() => onToggle(task.id)}>
          {task.completed ? 'Undo' : 'Završeno'}
        </button>
        <button onClick={() => onDelete(task.id)}>Izbriši</button>
      </div>
  );
}

function TaskList({ tasks, onDelete, onToggle }) {
  return (
      <div>
        {tasks.map((task) => (
            <TaskItem
                key={task.id}
                task={task}
                onDelete={onDelete}
                onToggle={onToggle}
            />
        ))}
      </div>
  );
}

function TaskForm({ onAdd }) {
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim() || !dueDate.trim()) {
      return;
    }
    onAdd(description, dueDate);
    setDescription('');
    setDueDate('');
  };

  return (
      <form onSubmit={handleSubmit}>
        <input
            type="text"
            placeholder="Dodaj zadatak"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
        />
        <input
            type="date"
            placeholder="Do"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
        />
        <button type="submit">Dodaj</button>
      </form>
  );
}

function App() {
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (description, dueDate) => {
    const newTask = {
      id: Math.random(),
      description: description,
      dueDate: dueDate,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleToggleTask = (id) => {
    setTasks(
        tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
        )
    );
  };

  return (
      <div>
        <h1>To-Do Lista</h1>
        <TaskForm onAdd={handleAddTask} />
        <TaskList
            tasks={tasks}
            onDelete={handleDeleteTask}
            onToggle={handleToggleTask}
        />
      </div>
  );
}

export default App;