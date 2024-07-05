// pages/index.js
"use client";

import React, { useEffect, useState } from 'react';
import { fetchTasks, addTask, deleteTask, updateTask } from '../services/taskService';
import Addbtn from '../components/Addbtn';
import TaskList from '../components/TaskList';

const Home = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const getTasks = async () => {
            try {
                const tasksFromServer = await fetchTasks();
                setTasks(tasksFromServer || []); // Ensure tasksFromServer is an array
            } catch (error) {
                console.error('Failed to fetch tasks:', error);
            }
        };

        getTasks();
    }, []);

    const handleAddTask = async () => {
        try {
            const addedTask = await addTask(newTask);
            setTasks([...tasks, addedTask]);
        } catch (error) {
            console.error('Failed to add task:', error);
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            const deleted = await deleteTask(taskId);
            if (deleted) {
                setTasks(tasks.filter(task => task.id !== taskId));
            }
        } catch (error) {
            console.error('Failed to delete task:', error);
        }
    };

    const handleEditTask = async (taskId) => {
        try {
            const updated = await updateTask(taskId, updateTask);
            setTasks(tasks.map(task => (task.id === taskId ? updated : task)));
        } catch (error) {
            console.error('Failed to update task:', error);
        }
    };

    return (
        <div className="container">
            <Addbtn onAdd={handleAddTask} />
            <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} onEditTask={handleEditTask} />

            <div>
                {tasks.length === 0 ? (
                    <p className='flex justify-center'>No Tasks</p>
                ) : (
                    <ul>
                        {tasks.map(task => (
                            <li key={task.id}></li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Home;
