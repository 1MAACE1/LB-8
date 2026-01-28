import React from 'react';
import ToDoItem from './ToDoItem';

function ToDoList({ tasks, removeTask }) {
  return (
    <div className="todo-list">
      {tasks.length === 0 ? (
        <p>Список задач пуст. Добавьте первую задачу!</p>
      ) : (
        <ul>
          {tasks.map(task => (
            <ToDoItem 
              key={task.id} 
              task={task} 
              removeTask={removeTask} 
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default ToDoList;