"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const AddTaskPage = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:1323/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      });

      if (!response.ok) {
        throw new Error('Failed to add task');
      }

      // Clear form fields after successful submission
      setTitle('');
      setDescription('');

      // Navigate back to homepage
      router.push('/'); 
    } catch (error) {
      console.error('Error adding task:', error);
      console.log(error);

    }
  };

  return (
    <form onSubmit={handleSubmit} className="justify-center px-3">
      <input
        className="bg-yellow-100 border border-gray-300 rounded-lg py-4 px-3 my-5 w-full"
        type="text"
        placeholder="What Gotta Be Done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        className="bg-yellow-100 border border-gray-300 rounded-lg py-4 px-3 w-full"
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      
      <div className="flex justify-center">
        <button type="submit" className="bg-slate-900 rounded-lg my-5 px-2 py-1">
          Add Task
        </button>
      </div>
    </form>
  );
};

export default AddTaskPage;
