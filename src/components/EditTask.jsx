import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit'; // Assuming this is the edit icon used

const EditTask = ({ task, editTask }) => {
  const [description, setDescription] = useState(task.description);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (e) => {
    e.preventDefault();
    if (!description.trim()) return;
    editTask(task._id, description);
    setIsEditing(false);
    setDescription(task.description); // Reset to original after edit
  };

  return (
    <>
      {isEditing ? (
        <form onSubmit={handleEdit} className="flex items-center">
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mr-2 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600"
          />
          <button type="submit" className="p-2 text-purple-600 hover:text-purple-800">
            <EditIcon />
          </button>
        </form>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="p-2 text-blue-500 hover:text-blue-700"
        >
          <EditIcon />
        </button>
      )}
    </>
  );
};

export default EditTask;