import { useEffect, useState } from "react";
import "./App.css";
import Task from "./Task";
import TaskForm from "./TaskForm";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getItems = async () => {
      const tasks = await JSON.parse(localStorage.getItem("tasks"));
      setTasks(tasks || []);
    };
    getItems();
  }, []);

  const handleAddTasks = (name) => {
    const allTasks = [...tasks, { name: name, done: false }];
    setTasks(allTasks);
    localStorage.setItem("tasks", JSON.stringify(allTasks));
  };
  const updateTaskDone = (taskIndex, newDone) => {
    const doneTasks = [...tasks];
    doneTasks[taskIndex].done = newDone;
    setTasks(doneTasks);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };
  const removeTask = (indexToRemove) => {
    const tmpTasks = tasks.filter(
      (taskObject, index) => index !== indexToRemove
    );
    setTasks(tmpTasks);
    const stringfy = JSON.stringify(tmpTasks);
    localStorage.setItem("tasks", stringfy);
  };

  const numberComplete = tasks.filter((t) => t.done).length;
  const numberTotal = tasks.length;
  const getMessage = () => {
    const percentage = (numberComplete / numberTotal) * 100;
    if (percentage === 0) {
      return "Try to do at least one";
    }
    if (percentage === 100) {
      return "Nice job for today ";
    }
    return "Keep it going";
  };
  const renameTasks = (index, newName) => {
    const renameTasks = [...tasks];
    renameTasks[index].name = newName;
    setTasks(renameTasks);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };
  return (
    <div className="main-container">
      <h1>
        {numberComplete}/{numberTotal} Complete
      </h1>
      <h2>{getMessage()}</h2>
      <TaskForm onAdd={handleAddTasks} />
      {tasks.map((task, index) => (
        <Task
          {...task}
          onToggle={(done) => updateTaskDone(index, done)}
          onTrash={() => removeTask(index)}
          onRename={(newName) => renameTasks(index, newName)}
        />
      ))}
    </div>
  );
}

export default App;
