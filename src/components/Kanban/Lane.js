import React from "react";
import Task from "./Task";
import { useTranslation } from 'react-i18next';

const Lane = ({
  laneIndex,
  tasks,
  handleDragStart,
  handleDragOver,
  handleDrop,
}) => {
  const { t } = useTranslation();

  const laneTitles = [t('components.Kanban.Lane.toDo'), t('components.Kanban.Lane.doing'), t('components.Kanban.Lane.inTest'), t('components.Kanban.Lane.done')];
  const laneColors = ["#37306B", "#66347F", "#9E4784", "#D27685"];
  const laneStyle = {
    backgroundColor: laneColors[laneIndex],
  };

  return (
    <div
      className="swim-lane"
      onDragOver={(e) => handleDragOver(e)}
      onDrop={(e) => handleDrop(e, laneIndex)}
      style={laneStyle}
    >
      <h3 className="heading">{laneTitles[laneIndex]}</h3>
       {/* Kulvar içindeki her görev için Task bileşenini oluşturuyoruz. */}
      {tasks.map((task, taskIndex) => (
        <Task
          key={taskIndex}
          task={task}
          onDragStart={(e) => handleDragStart(e, task, taskIndex, laneIndex)}
        />
      ))}
    </div>
  );
};

export default Lane;
