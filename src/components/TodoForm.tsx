import {
  addTodo,
  deleteTodo,
  hideForm,
  Todo,
  TodoContext,
  updateTodo,
} from "context/TodoContext";
import React, { FormEvent, ReactElement } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { MdDelete, MdSave } from "react-icons/md";
import TimePicker from "./TimePicker";
import { v4 } from "uuid";

export default function TodoForm(): ReactElement {
  const { state, dispatch } = useContext(TodoContext);
  const [todo, setTodo] = useState<Todo>({
    id: "",
    time: 0,
    active: false,
    label: "",
  });
  useEffect(() => {
    if (state.selectedTodo) setTodo(state.selectedTodo);
  }, [state.selectedTodo]);
  function handleSave(e: FormEvent) {
    e.preventDefault();
    if (state.selectedTodo) {
      dispatch(updateTodo(todo));
    } else {
      const newTodo = { ...todo };
      newTodo.id = v4();
      if (newTodo.label == "") newTodo.label = "Unknown todo";
      dispatch(addTodo(newTodo));
    }
    dispatch(hideForm());
  }
  function handleDelete() {
    if (state.selectedTodo) {
      dispatch(deleteTodo(state.selectedTodo.id));
      dispatch(hideForm());
    }
  }
  return (
    <form className="todo-form" method="post" onSubmit={handleSave}>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          id="done"
          name="done"
          checked={todo.active}
          onChange={(e) => setTodo({ ...todo, active: e.target.checked })}
        />
        <label htmlFor="done" className="form-check-label text-secondary">
          {todo.active ? "Active" : "Deactive"}
        </label>
      </div>
      <input
        type="text"
        name="label"
        placeholder="Todo..."
        value={todo.label}
        onChange={(e) => setTodo({ ...todo, label: e.target.value })}
      />
      <div className="todo-form-footer">
        <TimePicker
          initialValue={todo.time}
          onChange={(time) => setTodo({ ...todo, time })}
        />
        <div className="todo-form-actions">
          <button className="btn-icon" type="submit">
            <MdSave />
          </button>
          {state.selectedTodo && (
            <button className="btn-icon">
              <MdDelete onClick={handleDelete} />
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
