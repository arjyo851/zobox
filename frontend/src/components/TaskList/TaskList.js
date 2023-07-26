import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';
import './TaskList.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get('http://localhost:3001/api/tasks');
    setTasks(response.data);
  };

  const handleAddTask = async () => {
    if (newTaskTitle) {
      await axios.post('http://localhost:3001/api/tasks', {
        title: newTaskTitle,
      });
      setNewTaskTitle('');
      fetchTasks();
    }
  };

  const handleDeleteTask = async (id) => {
    await axios.delete(`http://localhost:3001/api/tasks/${id}`);
    fetchTasks();
  };

  const handleCopyTask = async (id) => {
    await axios.post(`http://localhost:3001/api/tasks/${id}/copy`);
    fetchTasks();
  };

  const handleUpdateTask = async (id, updatedTitle) => {
    await axios.put(`http://localhost:3001/api/tasks/${id}`, {
      title: updatedTitle,
    });
    fetchTasks();
  };

  return (
    <div className="task-list-container">
      <h1>To-Do List</h1>
      <div className="task-input">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Enter a new task"
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <table className="task-table">
        {/* <thead>
          <tr>
            <th>Task</th>
            <th>Actions</th>
          </tr>
        </thead> */}
        <tbody>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={handleDeleteTask}
              onCopy={handleCopyTask}
              onUpdate={handleUpdateTask}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
