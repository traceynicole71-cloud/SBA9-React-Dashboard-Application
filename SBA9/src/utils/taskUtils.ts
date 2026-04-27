import type { Task } from '../types/index.ts';
import type { FilterOptions } from '../types/index.ts';

//check to see if tasks match status, priority and search
export const filterTasks = (tasks: Task[], filters: FilterOptions): Task[] => {
    return tasks.filter((task) => {
        const matchesStatus = filters.status === 'All' || task.status == filters.status;
        const matchesPriority = filters.priority === 'All' || task.priority ==filters.priority;
        const matchesSearch =
        task.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(filters.searchQuery.toLowerCase());

        return matchesStatus && matchesPriority && matchesSearch;
    });
};

//sort tasks by newest first
export const sortTaskByDate = (tasks: Task[]): Task[] => {
    return [...tasks].sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
);
};

//date formatting
export const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
};