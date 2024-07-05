// components/TaskList.js
import React from 'react';
import Deletebtn from './Deletebtn';
import Link from 'next/link';
import { HiPencilAlt } from 'react-icons/hi';

const TaskList = ({ tasks, onDeleteTask, onEditTask }) => {
    return (
        <div>
            {tasks.map(task => (
                <div key={task.id} className="bg-yellow-100 border border-gray-300 rounded-lg py-4 px-3 my-5 w-full flex justify-between">
                    <div>
                        <h2 className="font-bold text-black text-2xl">{task.title}</h2>
                        <p className="text-gray-700">{task.description}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Deletebtn taskId={task.id} onDelete={onDeleteTask} />
                        <Link className="text-black" href={`/${task.id}`}>
                                <HiPencilAlt size={24} />
                        </Link>
                        
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TaskList;
