import React, { useState } from 'react';

const Search = ({ setSearch, submitTask }) => {
  const [newTask, setNewTask] = useState('');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    submitTask(newTask);
    setNewTask('');
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Search Bar for Filtering Tasks */}
      <div className="mb-6">
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tasks..."
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 bg-white text-gray-700 placeholder-gray-400"
        />
      </div>

      {/* Form for Adding New Task */}
      <form onSubmit={handleAddTask} className="flex gap-4 items-center">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          className="flex-grow p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 bg-white text-gray-700 placeholder-gray-400"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 transition-colors duration-300"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default Search;