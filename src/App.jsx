import { useEffect, useState } from 'react';
import './App.css';
import Search from './components/Search';
import TaskPage from './components/TaskPage';
import { createTodo, fetchTodo } from './axios';
import axiosInstance from './axios';

function App() {
  const [search, setSearch] = useState('');
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getTasks = async () => {
      try {
        setIsLoading(true);
        const data = await fetchTodo();
        setTasks(data);
        console.log('Tasks:', data);
        setIsLoading(false);
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    getTasks();
  }, []);

  const submitTask = async (newTask) => {
    if (!newTask.trim()) return;

    try {
      const newTaskData = await createTodo(newTask);
      setTasks([...tasks, newTaskData]);
    } catch (err) {
      console.error('Error creating task:', err);
    }
  };

  const completeTask = async (id) => {
    try {
      console.log('Completing Task ID:', id);
      const task = tasks.find(t => t._id === id);
      const updatedTask = { ...task, completed: !task.completed };
      await axiosInstance.put(`/${id}`, updatedTask);
      setTasks(tasks.map(t => (t._id === id ? updatedTask : t)));
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  const deleteTask = async (id) => {
    try {
      console.log('Deleting Task ID:', id);
      await axiosInstance.delete(`/${id}`);
      setTasks(tasks.filter(t => t._id !== id));
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  const editTask = async (id, newDescription) => {
    try {
      console.log('Editing Task ID:', id);
      const updatedTask = { description: newDescription };
      await axiosInstance.put(`/${id}`, updatedTask);
      setTasks(tasks.map(t => (t._id === id ? { ...t, description: newDescription } : t)));
    } catch (err) {
      console.error('Error editing task:', err);
    }
  };

  // Filter tasks based on search input
  const filteredTasks = tasks.filter(task =>
    task.description.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) return 'Loading';

  return (
    <div>
      <header className="text-4xl text-black text-center py-4">📝TODO-MERN</header>
      <Search setSearch={setSearch} submitTask={submitTask} />
      <TaskPage
        tasks={filteredTasks}
        completeTask={completeTask}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    </div>
  );
}

export default App;