import { TodoContext, showAddForm, hideForm } from "context/TodoContext";
import React, { ReactElement } from "react";
import { useContext } from "react";
import { MdAdd, MdClose } from "react-icons/md";

export default function AddTodoButton(): ReactElement {
  const { state, dispatch } = useContext(TodoContext);
  const formActive = state.formActive;
  function handleClick() {
    if (formActive) {
      dispatch(hideForm());
    } else {
      dispatch(showAddForm());
    }
  }
  return (
    <div className="todo-add-btn">
      <button className="btn-icon" onClick={handleClick}>
        {formActive ? <MdClose /> : <MdAdd />}
      </button>
    </div>
  );
}
