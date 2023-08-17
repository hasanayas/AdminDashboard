import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./kanban.css"; 

const TodoForm = ({ addTask }) => {
  const { t } = useTranslation();
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    
    addTask(0, value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="formContainer">
      <input
        type="text"
        placeholder={t("components.Kanban.TodoForm.newTodo")}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="todoInput"
      />
      <button type="submit" className="addButton">{t("components.Kanban.TodoForm.addButton")}</button>
    </form>
  );
};

export default TodoForm;
