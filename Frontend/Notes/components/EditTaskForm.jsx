// components/EditTaskForm.js
// components/EditTaskForm.js
import React, { useState } from 'react';

const EditTaskForm = ({ taskId, onEdit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onEdit(taskId, { title, description });
    };

    return (
        <form onSubmit={handleUpdateTask} className="edit-task-form">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What Gotta Be Done?"
                className="bg-yellow-100 border border-gray-300 rounded-lg py-4 px-3 my-5 w-full"
            />
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                className="bg-yellow-100 border border-gray-300 rounded-lg py-4 px-3 my-5 w-full"
            />

            <div className="flex justify-center ">
                <button type="submit" className="bg-slate-900 rounded-lg my-5 px-2 py-1">
                    Update Task
                </button>
            </div> 

        </form>
    );
};

export default EditTaskForm;
