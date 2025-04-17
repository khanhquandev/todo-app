import React from "react";
import "./TodoItem.css";
const TodoItem = (props) => {
  return (
    <div
      className="todo-item"
      onClick={() => props.handleTodoItemClick(props.id)}
    >
      <div className="todo-item-left">
        <input
          type="checkbox"
          checked={props.isCompleted}
          onClick={(e) => e.stopPropagation()}
          onChange={() => {
            props.handleCompleteCheckBox(props.id);
          }}
        />
        <p className="todo-item-text">{props.name}</p>
      </div>
      {props.isImportant && <img src="./important.svg" />}
    </div>
  );
};

export default TodoItem;
