import React, { createContext, useReducer, useEffect, useContext } from "react";
import { loadTodos, saveTodos } from "../utils/storage";

// Types
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

type TodoAction =
  | { type: "ADD_TODO"; payload: string }
  | { type: "DELETE_TODO"; payload: number }
  | { type: "UPDATE_TODO"; payload: { id: number; title: string } }
  | { type: "TOGGLE_TODO"; payload: number }
  | { type: "INIT_TODOS"; payload: Todo[] };

// Reducer
const todoReducer = (state: Todo[], action: TodoAction): Todo[] => {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        { id: Date.now(), title: action.payload, completed: false },
      ];
    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.payload);
    case "UPDATE_TODO":
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, title: action.payload.title }
          : todo
      );
    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case "INIT_TODOS":
      return action.payload;
    default:
      return state;
  }
};

// Context
const TodoContext = createContext<{
  todos: Todo[];
  dispatch: React.Dispatch<TodoAction>;
}>({ todos: [], dispatch: () => null });

export const useTodos = () => useContext(TodoContext);

// Provider
interface TodoProviderProps {
  children: React.ReactNode;
}

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [todos, dispatch] = useReducer(todoReducer, loadTodos());

  useEffect(() => {
    const storedTodos = loadTodos();
    dispatch({ type: "INIT_TODOS", payload: storedTodos });
  }, []);

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};
