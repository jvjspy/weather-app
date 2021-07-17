import { TodoContext } from "context/TodoContext";
import React, { ReactElement, useContext } from "react";
import TodoItem from "./TodoItem";

export default function TodoList(): ReactElement {
  const { state } = useContext(TodoContext);
  const todos = state.todos.sort((a, b) => a.time - b.time);
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
