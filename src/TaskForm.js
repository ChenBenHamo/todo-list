import React, { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [taskName, setTaskName] = useState("");
  const handleChangeTaskName = (event) => {
    setTaskName(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    onAdd(taskName);
    setTaskName("");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <button>+</button>
        <input
          type="text"
          placeholder="Your next task"
          value={taskName}
          onChange={handleChangeTaskName}
        />
      </form>
    </div>
  );
}
