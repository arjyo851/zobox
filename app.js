const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const dbPath = path.join(__dirname, 'db.json');

const readTasksFromDb = () => {
  const dbData = fs.readFileSync(dbPath);
  return JSON.parse(dbData);
};

const writeTasksToDb = (tasks) => {
  fs.writeFileSync(dbPath, JSON.stringify(tasks, null, 2));
};

// API endpoint to list all tasks
app.get('/api/tasks', (req, res) => {
  const tasks = readTasksFromDb();
  res.json(tasks);
});

// API endpoint to add a new task
app.post('/api/tasks', (req, res) => {
  const { title } = req.body;
  if (title) {
    const tasks = readTasksFromDb();
    const newTask = {
      id: tasks.length + 1,
      title,
    };
    tasks.push(newTask);
    writeTasksToDb(tasks);
    res.status(201).json(newTask);
  } else {
    res.status(400).json({ error: 'Title is required for a task.' });
  }
});

// API endpoint to update an existing task
app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const tasks = readTasksFromDb();
  const taskToUpdate = tasks.find((task) => task.id === parseInt(id));
  if (taskToUpdate) {
    taskToUpdate.title = title;
    writeTasksToDb(tasks);
    res.json(taskToUpdate);
  } else {
    res.status(404).json({ error: 'Task not found.' });
  }
});

// API endpoint to delete a task
app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  let tasks = readTasksFromDb();
  tasks = tasks.filter((task) => task.id !== parseInt(id));
  writeTasksToDb(tasks);
  res.json({ message: 'Task deleted successfully.' });
});

// API endpoint to copy a task
app.post('/api/tasks/:id/copy', (req, res) => {
  const { id } = req.params;
  const tasks = readTasksFromDb();
  const taskToCopy = tasks.find((task) => task.id === parseInt(id));
  if (taskToCopy) {
    const newTask = {
      id: tasks.length + 1,
      title: taskToCopy.title,
    };
    tasks.push(newTask);
    writeTasksToDb(tasks);
    res.status(201).json(newTask);
  } else {
    res.status(404).json({ error: 'Task not found.' });
  }
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
