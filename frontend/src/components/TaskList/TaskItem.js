import React, { useState } from 'react';

const TaskItem = ({ task, onDelete, onCopy, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(task.title);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = () => {
    onUpdate(task.id, updatedTitle);
    setIsEditing(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(task.title);
    alert('Task title copied to clipboard!');
  };

  return (
    <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', backgroundColor: '#d1d5db', marginBottom: '10px', borderRadius: '5px' }}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
            style={{ flex: 1, padding: '10px', fontSize: '16px', border: 'none', borderRadius: '5px', backgroundColor: '#fff' }}
          />
          <div style={{ display: 'flex', gap: '5px' }}>
            <button onClick={handleUpdate} style={{ padding: '5px 10px', backgroundColor: '#ef4444', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Save</button>
          </div>
        </>
      ) : (
        <>
          {task.title}
          <div style={{ display: 'flex', gap: '5px' }}>
            <button onClick={handleEdit} style={{ padding: '5px 10px',color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Edit</button>
            <button onClick={handleCopy} style={{ padding: '5px 10px', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Copy</button>
            <button onClick={() => onDelete(task.id)} style={{ padding: '5px 10px', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Delete</button>
          </div>
        </>
      )}
    </li>
  );
};

export default TaskItem;
