// services/taskService.js
const API_URL = 'http://localhost:1323/tasks';

export const fetchTasks = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch tasks');
    }
    return response.json();
};

export const addTask = async (task) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
    });
    if (!response.ok) {
        throw new Error('Failed to add task');
    }
    return response.json();
};

export const deleteTask = async (taskId) => {
    const response = await fetch(`${API_URL}/${taskId}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete task');
    }
    return response.ok;
};

export const updateTask = async (taskId, task) => {
    const response = await fetch(`${API_URL}/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
    });
    if (!response.ok) {
        throw new Error('Failed to update task');
    }
    return response.json();
};
