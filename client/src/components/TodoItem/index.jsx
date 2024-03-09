import React from "react";

const TodoItem = ({ todo, onDelete, onComplete }) => {
  return (
    <div>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onComplete(todo.id)}
      />
      <span
        style={{ textDecoration: todo.completed ? "line-through" : "none" }}
      >
        {todo.content}
      </span>
      <button onClick={() => onDelete(todo.id)}>X</button>
    </div>
  );
};

export default TodoItem;
