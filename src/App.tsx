import { getTasks, createTask, updateTask, deleteTask } from "./services/taskService";
import { type Task } from "./services/taskService";
import { useState, useEffect, useRef, type ChangeEvent } from "react";




function App() {
  const [taskList, setTaskList] = useState<Task[]>(getTasks());
  const [editFlag, setEditFlag] = useState<Boolean>(false);
  const [editedTaskID, setEditedTaskID] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');
  const [newTaskInputValue, setNewTaskInputValue] = useState<string>('');

  function updateTaskList() {
    setTaskList(getTasks());
  }
  const handleInputValueChange = function (event: ChangeEvent): void {
    const target = event.target as HTMLInputElement;
    setInputValue(target.value);
  }
  const handleNewTaskInputValueChange = function (event: ChangeEvent): void {
    const target = event.target as HTMLInputElement;
    setNewTaskInputValue(target.value);
  }

  return (
    <>
      <h1>Your Tasks</h1>
      <label>
        <div>
          <input
            placeholder="Add new task here"
            onChange={(event: ChangeEvent) => { handleNewTaskInputValueChange(event) }}

            onKeyDown={
              (event) => {
                if ((event.key) === "Enter") {
                  event.preventDefault();
                  const newTask = createTask(newTaskInputValue);
                  setTaskList(taskList.concat(newTask));
                }
              }
            }
          />
        </div>
      </label>

      {
        editFlag &&
        <form>
          <label>Edit your task here:
            <div>
              <input
                onChange={(event: ChangeEvent) => { handleInputValueChange(event) }}
                onKeyDown={
                  (event) => {
                    if ((event.key) === "Enter") {
                      event.preventDefault();
                      setEditFlag(false);

                      updateTask(editedTaskID, inputValue);
                      updateTaskList();

                    }
                  }
                }
              />
            </div>
          </label>
        </form>
      }

      <ul>
        {
          taskList.map(
            (TaskObject: Task) => {
              return (
                <li key={TaskObject.id}>
                  {TaskObject.task}

                  <button onClick={
                    () => {
                      setEditFlag(true);
                      setEditedTaskID(TaskObject.id);
                    }
                  }>Edit Task</button>
                  <button onClick={() => {
                    deleteTask(TaskObject.id)
                    updateTaskList();
                  }}>Delete</button>
                </li>

              )
            })
        }
      </ul>


    </>
  )
}

export default App;