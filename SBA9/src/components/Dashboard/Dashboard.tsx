import React, { useState, useEffect } from 'react';
import type { Task, TaskFormData, FilterOptions, Status } from '../../types/index';
import { TaskForm } from '../TaskForm/TaskForm';
import { TaskFilter } from '../TaskFilter/TaskFilter';
import  { TaskList }from '../TaskList/TaskList';
import { filterTasks, sortTaskByDate } from '../../utils/taskUtils';

export const Dashboard: React.FC = ()=> {
    //local storage
const [tasks, setTasks] = useState<Task[]>(() => {
    try {
        const saved = localStorage.getItem('app_tasks');
        if (saved && saved != "undefined") {
    return JSON.parse(saved);
}
return [];
    } catch (error) {
        console.error("Failed to parese tasks from localStorage:" , error);
        return [];
    }
});
const [filters, setFilters] = useState<FilterOptions>({
    status: 'All',
    priority: 'All',
    searchQuery: '',
});

//syncing tasks to local storage
useEffect(() => {
    localStorage.setItem('app_tasks', JSON.stringify(tasks));
}, [tasks]);

//define event handlers
const handleAddTask = (data: TaskFormData) => {
    const newTask: Task = {
        ...data,
        id: typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : Math.random().toString(36).substring(2,9),
        status: 'To Do',
        createdAt: new Date().toISOString(),
    };
    setTasks([newTask, ...tasks]);
};

const handleUpdateStatus = (id: string, status: Status) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status } : t));
};

const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
};

const visibleTasks = filterTasks(tasks, filters);
const sortedTasks = sortTaskByDate(visibleTasks);

return (
    <div className="max-w-6xl mx-auto px-4 py-10">
        <header className="mb-10 text-center">
<h1 className="text-4xl font-extrabold text-white-900 dark:text-white">Task Dashboard</h1>
<p className="text-gray-500 mt-2 text-lg">Keep Track of Your Productivity Here</p>
        </header>
{/*add sidebar*/}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <aside className="lg:col-span-4 space-y-6">
        <TaskForm onAddTask={handleAddTask} />
        <TaskFilter filters={filters} setFilters={setFilters} />
    </aside>

    {/*main content area*/}
    <main className="lg:col-span-8">
        <h2 className="text-xl font-bold mb-4 dark:text-white"> Your Tasks ({sortedTasks.length})</h2>
<TaskList
tasks={sortedTasks}
onDelete={handleDeleteTask}
onStatusChange={handleUpdateStatus}
/>
    </main>
</div>
    </div>
);
};