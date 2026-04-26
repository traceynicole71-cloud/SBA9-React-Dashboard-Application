export type Priority = 'Low' | 'Mediuim' | 'High';
export type Status = 'To Do' | 'In Progress' | 'Completed';
export type Theme = 'light' |'dark';

//Main interface for tasks
export interface Task {
    id: string;
    title: string;
    description: string;
    status: Status;
    priority: Priority;
    createdAt: string;
}

//Interface for creating a new task
export interface TaskFormData {
    title: string;
    description: string;
    priority: Priority;
}

//Interface for serch and drop down filters
export interface FilterOptions {
    status: Status | 'All';
    priority: Priority | 'All';
    searchQuery: string;
}