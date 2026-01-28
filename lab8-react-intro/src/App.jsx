import React, { useState, useEffect } from 'react';
import AddTaskForm from './AddTaskForm';
import ToDoList from './ToDoList';
import './App.css';

function App() {
  // Инициализация состояния с загрузкой из localStorage
  const [tasks, setTasks] = useState(() => {
    // Получаем сохранённые задачи из localStorage
    const savedTasks = localStorage.getItem('todoAppTasks');
    
    // Если есть сохранённые задачи, парсим их, иначе используем начальный список
    if (savedTasks) {
      try {
        return JSON.parse(savedTasks);
      } catch (error) {
        console.error('Ошибка при чтении из localStorage:', error);
        return [
          { id: 1, text: 'Изучить React' },
          { id: 2, text: 'Создать ToDo приложение' },
          { id: 3, text: 'Разобраться с хуками' }
        ];
      }
    }
    
    // Начальный список задач
    return [
      { id: 1, text: 'Изучить React' },
      { id: 2, text: 'Создать ToDo приложение' },
      { id: 3, text: 'Разобраться с хуками' }
    ];
  });

  // Эффект для сохранения задач в localStorage при их изменении
  useEffect(() => {
    try {
      localStorage.setItem('todoAppTasks', JSON.stringify(tasks));
      console.log('Задачи сохранены в localStorage:', tasks.length);
    } catch (error) {
      console.error('Ошибка при сохранении в localStorage:', error);
    }
  }, [tasks]); // Запускается при каждом изменении tasks

  // Функция для добавления новой задачи
  const addTask = (text) => {
    if (text.trim() === '') return;
    
    const newTask = {
      id: Date.now(), // Используем timestamp как уникальный ID
      text: text.trim(),
      createdAt: new Date().toISOString() // Добавляем дату создания
    };
    
    setTasks([...tasks, newTask]);
  };

  // Функция для удаления задачи
  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="App">
      <h1>📝 Список задач</h1>
      
      {/* Индикатор сохранения */}
      <div className="save-indicator">
        💾 Автосохранение включено
        <span className="save-status">Задачи сохраняются автоматически</span>
      </div>
      
      <AddTaskForm addTask={addTask} />
      
      {/* Информация о количестве задач */}
      <div className="tasks-info">
        <div className="tasks-count">
          Всего задач: <strong>{tasks.length}</strong>
        </div>
        <div className="storage-info">
          Данные сохраняются в вашем браузере
        </div>
      </div>
      
      <ToDoList tasks={tasks} removeTask={removeTask} />
      
      {/* Кнопка для очистки localStorage */}
      <div className="storage-controls">
        <button 
          onClick={() => {
            if (window.confirm('Вы уверены? Это удалит ВСЕ задачи и очистит историю.')) {
              localStorage.removeItem('todoAppTasks');
              setTasks([]);
            }
          }}
          className="clear-storage-btn"
        >
          🗑️ Очистить все данные
        </button>
        <small className="storage-hint">
          Нажмите, чтобы полностью очистить сохранённые задачи
        </small>
      </div>
    </div>
  );
}

export default App;