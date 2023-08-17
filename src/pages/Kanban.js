import React, { useState } from "react";
import TodoForm from "../components/Kanban/TodoForm";
import Lane from "../components/Kanban/Lane";
import "../components/Kanban/kanban.css";
import { useTranslation } from "react-i18next";

const Kanban = () => {
  const { t } = useTranslation();

  // Kanban görevleri farklı kulvarlara bölmek için kullanılan state
  const [lanes, setLanes] = useState([
    [t('pages.Kanban.task1'), t('pages.Kanban.task2'), t('pages.Kanban.task3'), t('pages.Kanban.task4')],
    [t('pages.Kanban.task5'), t('pages.Kanban.task6')],
    [t('pages.Kanban.task7'), t('pages.Kanban.task8')],
    [t('pages.Kanban.task9'), t('pages.Kanban.task10'), t('pages.Kanban.task11'), t('pages.Kanban.task12')],
  ]);

  // Belirli bir kulvara yeni bir görev eklemek için kullanılan işlev.
  const addTaskToLane = (laneIndex, task) => {
    setLanes((prevLanes) => {
      const updatedLanes = [...prevLanes];
      updatedLanes[laneIndex] = [...prevLanes[laneIndex], task];
      return updatedLanes;
    });
  };
  

  // Görevleri taşımak için kullanılan işlev.
  const moveTask = (task, fromLane, fromIndex, toLane, toIndex) => {
    // Aynı kulvarda, aynı sıradan yukarı veya aşağı taşındığında sadece yer değiştiriyoruz.
    if (fromLane === toLane && fromIndex !== toIndex) {
      const updatedLanes = [...lanes];
      const movedTask = updatedLanes[fromLane].splice(fromIndex, 1)[0];
      updatedLanes[toLane].splice(toIndex, 0, movedTask);
      setLanes(updatedLanes);
    }

    // Başka bir kulvara taşındığında, görevi o kulvara ekler ve eski kulvardan kaldırır.
    if (fromLane !== toLane) {
      const updatedLanes = lanes.map((laneTasks, index) =>
        index === toLane ? [...laneTasks, task] : laneTasks.filter((t) => t !== task)
      );
      setLanes(updatedLanes);
    }
  };

  // Fare sürükleme işlemi başladığında çağrılan işlev.
  const handleDragStart = (e, task, index, lane) => {
    // Sürüklenen görev, taşıma işlemi sırasında veriyi saklamak için kullanılan veri aktarımına eklenir.
    e.dataTransfer.setData("task", JSON.stringify(task));
    // Görevin taşındığı kulvarı ve görevin sırasını tutmak için veri aktarımına eklenir.
    e.dataTransfer.setData("fromLane", JSON.stringify(lane));
    e.dataTransfer.setData("fromIndex", JSON.stringify(index));
  };

  // Fare sürükleme işlemi sırasında çağrılan işlev, varsayılan davranışı devre dışı bırakır.
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Fare bırakıldığında çağrılan işlev, görevleri taşımayı başlatır.
  const handleDrop = (e, laneIndex) => {
    e.preventDefault();
    // Sürüklenen görev ve taşınan kulvarın bilgilerini veri aktarımından alırız.
    const task = JSON.parse(e.dataTransfer.getData("task"));
    const fromLane = JSON.parse(e.dataTransfer.getData("fromLane"));
    const fromIndex = JSON.parse(e.dataTransfer.getData("fromIndex"));
    // Görevleri taşıyan işlevi çağırırız.
    moveTask(task, fromLane, fromIndex, laneIndex, e.target.dataset.taskIndex);
  };

  return (
    <div className="kanban">
      {/* Yeni görev ekleme bileşeni */}
      <TodoForm addTask={addTaskToLane} />

      <div className="board">
        <div className="lanes">
          {/* Her bir kulvar için Lane bileşenini oluşturur */}
          {lanes.map((laneTasks, index) => (
            <Lane
              key={index}
              laneIndex={index}
              tasks={laneTasks}
              handleDragStart={handleDragStart}
              handleDragOver={handleDragOver}
              handleDrop={handleDrop}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Kanban;
