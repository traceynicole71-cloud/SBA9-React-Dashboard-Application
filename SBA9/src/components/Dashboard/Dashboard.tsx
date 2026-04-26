import React, { useState, useEffect } from 'react';
import { Task, TaskFormData, FilterOptions, Status } from '../../types/index.ts';
import { TaskForm } from '../TaskForm/TaskForm.tsx';
import { TaskFilter } from '../TaskFilter/TaskFilter.tsx';
import  { TaskList }from '../TaskList/TaskList.tsx';
import { filterTasks, sortTaskByDate } from '../../utils/taskUtils.ts';

export const Dashboard: React.FC = ()=> {
    //local storage
const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('app_tasks');
    return saved ? JSON.parse(saved) : [];
});

const [filter, setFilters] = useState<FilterOptions>({
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
        id: crypto.randomUUID(),
        status: 'To Do',
        createdAt: new Date().toISOString(),
    };
    setTasks([newTask, ...tasks]);
};

const handleUpdateStatus = (id: string, status: Status) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status } : t));
};

return (
    <div className="max-w-6xl mx-auto px-4 py-10">
        <header className="mb-10 text-center">
<h1 className="text-4xl font-extrabold text-gray-900 dark: text-white">Task Dashboard</h1>
<p className="text-gray-500 mt-2 text-lg">Keep Track of Your Productivty Here</p>
        </header>
//add sidebar
<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <aside className="lg:col-span-4 space-y-6">
        <TaskForm onAddTask={handleAddTask} />
        <TaskFilter filters={filters} setFilters={setFilters} />
    </aside>

    //main content area
    <main className="lg:col-span-8">
        <h2 className="text-xl font-bold mb-4 dark:text-white"> Your Tasks ({visibleTasks.length})</h2>
<TaskList
tasks={visibleTasks}
onDelete={handleDeleteTask}
onStatusChange={handleUpdateStatus}
/>
    </main>
</div>
    </div>
);
};