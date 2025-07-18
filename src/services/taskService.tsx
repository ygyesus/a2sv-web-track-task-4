import { v4 as uuidv4 } from 'uuid';

interface Task {
    id: string,
    task: string,
}

let tasks: string[] = [
    "Eat",
    "Sleep",
    "Watch movie",
    "Study"
];

let taskList: Task[] = [];

tasks.forEach(task => {
    const newTask: Task = {
        id: uuidv4(),
        task: task
    };
    taskList.push(newTask);

});
console.log(taskList);
const getTasks = () => taskList;
const createTask = (task: string) => {
    const newTask: Task = {
        id: uuidv4(),
        task: task
    }
    return newTask;
};

const updateTask = (updatedTaskID: String, newTask: string) => {
    for (const TaskObject of taskList) {
        if (TaskObject.id === updatedTaskID) {
            TaskObject.task = newTask;
            return;
        }
    }
}

const deleteTask = (deletedTaskID: string) => {
    taskList = taskList.filter(TaskObject => TaskObject.id != deletedTaskID);
}

export { getTasks, createTask, updateTask, deleteTask };
export type { Task };