import React, { useState, useEffect, useCallback } from 'react';

import './App.css';
import TaskList from './components/TaskList';
import NewTask from './components/NewTask';

// Replace this with the URL returned by minikube service --url
const BACKEND_URL = 'http://YOUR-CURRENT-SERVICE-URL';

function App() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = useCallback(function () {
    fetch(`${BACKEND_URL}/tasks`, {
      headers: {
        Authorization: 'Bearer abc',
      },
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }

        return response.json();
      })
      .then(function (jsonData) {
        setTasks(jsonData.tasks);
      })
      .catch(function (error) {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  useEffect(
    function () {
      fetchTasks();
    },
    [fetchTasks]
  );

  function addTaskHandler(task) {
    fetch(`${BACKEND_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer abc',
      },
      body: JSON.stringify(task),
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Failed to add task');
        }

        return response.json();
      })
      .then(function (resData) {
        console.log(resData);
        fetchTasks();
      })
      .catch(function (error) {
        console.error('Error adding task:', error);
      });
  }

  return (
    <div className="App">
      <section>
        <NewTask onAddTask={addTaskHandler} />
      </section>

      <section>
        <button onClick={fetchTasks}>Fetch Tasks</button>
        <TaskList tasks={tasks} />
      </section>
    </div>
  );
}

export default App;