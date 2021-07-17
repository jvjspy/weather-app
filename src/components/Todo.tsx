import { TodoContext } from "context/TodoContext";
import React, { ReactElement } from "react";
import { useContext } from "react";
import { Collapse } from "react-bootstrap";
import AddTodoButton from "./AddTodoButton";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

export default function Todo(): ReactElement {
  const { state } = useContext(TodoContext);
  const formActive = state.formActive;
  return (
    <div>
      <AddTodoButton />
      <Collapse in={formActive} unmountOnExit>
        <TodoForm />
      </Collapse>
      <TodoList />
    </div>
  );
}
