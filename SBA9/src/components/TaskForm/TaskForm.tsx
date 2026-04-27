import React, { useState } from 'react';
import type { TaskFormData, Priority } from '../../types/index.ts';

interface Props {
    onAddTask: (data: TaskFormData) => void;
}

//state for form input
export const TaskForm: React.FC<Props> = ({ onAddTask }) => {
    const [formData, setFormData] = useState<TaskFormData>({
        title: '',
        description: '',
        priority: 'Medium' as Priority,
    });

    //state for validation feedback
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        //title entry validation
        if (!formData.title.trim()) {
            setError('Task Title Is Required');
            return;
        }

        //send data to parent Dashboard
        onAddTask(formData);

        //state to reset form
        setFormData({ title: '', description: '', priority: 'Medium' as Priority });
        setError('');
    };

    return (
        <form onSubmit={handleSubmit} className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-lg font-bold mb-4 dark:text-white">Create New Task</h2>
            <div className="space-y-4">
                <div>
                    <input
                        type="text"
                        placeholder="What needs to be done?"
                        className="w-full p-2.5 rounded-lg border dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                </div>

                <textarea
                    placeholder="Detailed Description"
                    className="w-full p-2.5 rounded-lg border dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />

                <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-gray-500 uppercase">Priority</label>
                    <select
                        className="w-full p-2.5 rounded-lg border dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        value={formData.priority}
                        onChange={(e) => setFormData({ ...formData, priority: e.target.value as Priority })}
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>

                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg transition-colors">
                    Add Task
                </button>
            </div>
        </form>
    );
};