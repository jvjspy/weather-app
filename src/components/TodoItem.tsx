import { showEditForm, Todo, TodoContext } from "context/TodoContext";
import moment from "moment";
import { useContext } from "react";

interface Props {
  todo: Todo;
}
export default function TodoItem({ todo }: Props) {
  const { dispatch } = useContext(TodoContext);
  return (
    <li className="todo-item" onClick={() => dispatch(showEditForm(todo))}>
      <span
        className={`badge rounded-pill bg-${
          todo.active ? "primary" : "success"
        }`}
      >
        {todo.time == 0 ? "--:--" : moment.unix(todo.time).format("HH:mm")}
      </span>
      <span className="todo-label">{todo.label}</span>
    </li>
  );
}
