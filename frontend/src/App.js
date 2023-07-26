import React from 'react';
import TaskList from './components/TaskList/TaskList'; // Update the import path
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <TaskList />
    </div>
  );
};

export default App;
