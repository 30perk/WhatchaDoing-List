import React from 'react';
import { HiOutlineTrash } from 'react-icons/hi';

const Deletebtn = ({ taskId, onDelete }) => {
    const handleDelete = async () => {
        const deleted = await onDelete(taskId);
        if (!deleted) {
            console.error('Failed to delete task');
        }
    };

    return (
        <button onClick={handleDelete} className="text-red-400">
            <HiOutlineTrash size={24} />
        </button>
    );



};

export default Deletebtn;