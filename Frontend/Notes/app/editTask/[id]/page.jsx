// pages/editTask/[id].js
"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchTaskById, updateTask } from '/services/taskService';

const EditTaskPage = ({ params }) => {
    const router = useRouter();
    const { id } = params;
    const [task, setTask] = useState({ title: '', description: '' });

    useEffect(() => {
        const getTask = async () => {
            try {
                const fetchedTask = await fetchTaskById(id);
                setTask(fetchedTask);
            } catch (error) {
                console.error('Failed to fetch task:', error);
            }
        };

        getTask();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateTask(id, task);
            router.push('/');
        } catch (error) {
            console.error('Failed to update task:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="justify-center px-3">
            <input
                className="bg-yellow-100 border border-gray-300 rounded-lg py-4 px-3 my-5 w-full"
                type="text"
                placeholder="Title"
                value={task.title}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
                required
            />
            <input
                className="bg-yellow-100 border border-gray-300 rounded-lg py-4 px-3 w-full"
                type="text"
                placeholder="Description"
                value={task.description}
                onChange={(e) => setTask({ ...task, description: e.target.value })}
            />
            
            <div className="flex justify-center">
                <button type="submit" className="bg-slate-900 rounded-lg my-5 px-2 py-1 text-white">
                    Save Task
                </button>
            </div>
        </form>
    );
};

export default EditTaskPage;
