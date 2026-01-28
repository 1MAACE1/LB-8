import React, { useState } from 'react';

function AddTaskForm({ addTask }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(inputValue);
    setInputValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="add-task-form">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Введите новую задачу..."
        className="task-input"
      />
      <button type="submit" className="add-button">
        Добавить задачу
      </button>
    </form>
  );
}

export default AddTaskForm;