import React from "react";

const Task = ({ task, onDragStart }) => {
  return (
    <p className="task" draggable onDragStart={onDragStart}>
      {task}
    </p>
  );
};

export default Task;
