import React from 'react';

function ToDoItem({ task, removeTask }) {
  return (
    <li className="todo-item">
      <span className="task-text">{task.text}</span>
      <button 
        onClick={() => removeTask(task.id)}
        className="delete-button"
      >
        Удалить
      </button>
    </li>
  );
}

export default ToDoItem;