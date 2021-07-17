import React, { createContext, ReactElement, useReducer } from "react";
import { v4 } from "uuid";
export interface Todo {
  id: string;
  label: string;
  active: boolean;
  time: number;
}
enum ActionTypes {
  ADD,
  DELETE,
  UPDATE,
  SHOW_ADD_FORM,
  SHOW_EDIT_FORM,
  HIDE_FORM,
}
interface Action<T, P = {}> {
  type: T;
  payload: P;
}
type AddAction = Action<ActionTypes.ADD, Todo>;
type DeleteAction = Action<ActionTypes.DELETE, string>;
type UpdateAction = Action<ActionTypes.UPDATE, Todo>;
type ShowAddForm = Omit<Action<ActionTypes.SHOW_ADD_FORM>, "payload">;
type ShowEditForm = Action<ActionTypes.SHOW_EDIT_FORM, Todo>;
type HideForm = Omit<Action<ActionTypes.HIDE_FORM>, "payload">;
type Actions =
  | AddAction
  | DeleteAction
  | UpdateAction
  | ShowAddForm
  | ShowEditForm
  | HideForm;
export function addTodo(todo: Todo): AddAction {
  return {
    type: ActionTypes.ADD,
    payload: todo,
  };
}
function updateTodosInLocalStorage(todos: Todo[]) {
  window.localStorage.setItem("todos", JSON.stringify(todos));
}
function createDefaultTodos(): Todo[] {
  return [
    {
      id: v4(),
      active: true,
      label: "Welcome! 👋",
      time: 0,
    },
    {
      id: v4(),
      active: false,
      label: "Click + to add new todo 🚀",
      time: 0,
    },
    {
      id: v4(),
      active: true,
      label: "Enjoy it! 😍",
      time: 0,
    },
  ];
}
function getTodosInLocalStorage(): Todo[] {
  const todosJson = window.localStorage.getItem("todos");
  return todosJson == null ? createDefaultTodos() : JSON.parse(todosJson);
}
export function deleteTodo(id: string): DeleteAction {
  return {
    type: ActionTypes.DELETE,
    payload: id,
  };
}
export function updateTodo(todo: Todo): UpdateAction {
  return {
    type: ActionTypes.UPDATE,
    payload: todo,
  };
}
export function showAddForm(): ShowAddForm {
  return {
    type: ActionTypes.SHOW_ADD_FORM,
  };
}
export function showEditForm(todo: Todo): ShowEditForm {
  return {
    type: ActionTypes.SHOW_EDIT_FORM,
    payload: todo,
  };
}
export function hideForm(): HideForm {
  return {
    type: ActionTypes.HIDE_FORM,
  };
}
interface InitialState {
  todos: Todo[];
  selectedTodo?: Todo;
  formActive: boolean;
}
const initialState: InitialState = {
  todos: getTodosInLocalStorage(),
  formActive: false,
};
function reducer(state: InitialState, action: Actions): InitialState {
  let todos: Todo[];
  switch (action.type) {
    case ActionTypes.ADD:
      todos = [...state.todos, action.payload];
      updateTodosInLocalStorage(todos);
      return { ...state, todos };
    case ActionTypes.DELETE:
      todos = [...state.todos.filter((todo) => todo.id != action.payload)];
      updateTodosInLocalStorage(todos);
      return {
        ...state,
        todos,
      };
    case ActionTypes.UPDATE:
      todos = [
        ...state.todos.map((todo) =>
          todo.id == action.payload.id ? action.payload : todo
        ),
      ];
      updateTodosInLocalStorage(todos);
      return {
        ...state,
        todos,
      };
    case ActionTypes.SHOW_ADD_FORM:
      return { ...state, formActive: true };
    case ActionTypes.SHOW_EDIT_FORM:
      return {
        ...state,
        formActive: true,
        selectedTodo: action.payload,
      };
    case ActionTypes.HIDE_FORM:
      return {
        ...state,
        formActive: false,
        selectedTodo: undefined,
      };
    default:
      return state;
  }
}
type ContextType = {
  state: InitialState;
  dispatch: React.Dispatch<Actions>;
};
export const TodoContext = createContext<ContextType>({
  state: initialState,
  dispatch: () => undefined,
});
interface Props {
  children: ReactElement;
}
export default function TodoProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}
