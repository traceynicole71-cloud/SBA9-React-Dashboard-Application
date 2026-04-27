import React from 'react';
import type { Task, Status } from '../../types/index.ts'
import { TaskItem } from './TaskItem.tsx';

interface Props {
    tasks: Task[];
    onDelete: (id: string) => void;
    onStatusChange: (id: string, status: Status) => void;
}

export const TaskList: React.FC<Props> = ({ tasks, onDelete, onStatusChange }) => {

    //response to an empty state
    if (tasks.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 bg-gray-50 dark:bg-gray-800/40 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700">
                <div className="text-gray-400 dark:text-gray-500 mb-2">
                </div>
                <p className="text-gray-500 dark: text-gray-400 font-medium">
                    No Task Matching Your Criteria.
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500">
                    Try Adjusting Your Filters or Add A New Task To Get Started!
                </p>
            </div>
        );
    }

//render the list
    return (
        <div className="space-y-4">
{tasks.map((task) => (
    <TaskItem
    key={task.id}
    task={task}
    onDelete={onDelete}
    onStatausChange={onStatusChange}
    />
))}
        </div>
    );
};