import React from 'react';
import type { FilterOptions, Status, Priority } from '../../types'

interface Props {
    filters: FilterOptions;
    setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
}

export const TaskFilter: React.FC<Props> = ({ filters, setFilters }) => {
    return (
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border:gray-100 dark:border-gray-700 space-y-4">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Filters & Search</h3>

            {/*search input*/}
            <input
                type="text"
                placeholder="Search Title or Description..."
                className="p-2.5 rounded-lg border dark:bg-gray-700 dark:text-white dark:border-gray-600 text.sm"
                value={filters.searchQuery}
                onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value as Status | 'All' })}
            />
            <div className="grid grid-cols-2 gap-3">
                <select
                className="p-2.5 rounded-lg border dark:bg-gray-700 dark:text-white dark:border-gray-600 text-sm"
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value as Status | 'All' })}
                >
                <option value="All">All Statuses</option>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
            </select>

            {/*priority dropdown*/}
            <select
                className="p-2.5 rounded-lg border dark:bg-gray-700 dark:text-white dark:border-gray-600 text-sm"
                value={filters.priority}
                onChange={(e) => setFilters({ ...filters, priority: e.target.value as Priority | 'All' })}
            >
                <option value="All">All Statuses</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>
            </div>
        </div>
    );
};