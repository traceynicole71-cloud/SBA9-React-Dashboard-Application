import React from 'react';
import type { Task, Status } from '../../types/index.ts';
import { formatDate } from '../../utils/taskUtils.ts';
import { Trash2, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface Props {
    task: Task;
    onDelete: (id: string) => void;
    onStatusChange: (id: string, status: Status) => void;
}

export const TaskItem: React.FC<Props> = ({ task, onDelete, onStatusChange }) => {

    //priority badge styling
    const getPriorityStyles = () => {
        switch (task.priority) {
            case 'High':
                return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
            case 'Medium':
                return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
            case 'Low':
                return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-200">
            {/*task content section */}
            <div className="flex-1 pr-4">
                <div className="flex items-center gap-3 mb-1">
                    <h3 className={`font-bold text-gray-800 dark:text-white transition-all ${task.status === 'Completed' ? 'line-through text-gray-400 dark:text-gray-500' : ''
                        }`}>
                        {task.title}
                    </h3>
                    <span className={`text-[10px] uppercase px-2 py-0.5 rounded-full font-bold tracking-wider ${getPriorityStyles()}`}>
                        {task.priority}
                    </span>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {task.description || "No Description Provided."}
                </p>

                {/*dates and status*/}
                <div className="flex items-center gap-4 mt-3 text-[11px] texy-gray-400 font-medium">
                    <div className="flex items-center gap-1">
                        <Clock size={12} />
                        {formatDate(task.createdAt)}
                    </div>
                    <div className="flex item-center gap-1">
                        <AlertCircle size={12} />
                        {task.status}
                    </div>
                </div>
            </div>

            {/*task actions*/}
            <div className="flex items-center gap-2 mt-4 sm:mt-0 opacity sm:opacity-0 group-hover:opacity-100 transition-opacity">
                {task.status !== 'Completed' && (
                    <button
                        onClick={() => onStatusChange(task.id, 'Completed')}
                        className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                        title="Mark As Completed"
                    >
                        <CheckCircle size={20} />
                    </button>
                )}

                <button
                    onClick={() => onDelete(task.id)}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    title="Delete Task"
                >
                    <Trash2 size={20} />
                </button>
            </div>
        </div>
    );
};