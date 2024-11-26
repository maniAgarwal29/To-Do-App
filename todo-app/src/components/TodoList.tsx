import React from "react";
import { useTodos } from "../context/TodoContext";
import TodoItem from "./TodoItem";

const TodoList: React.FC = () => {
  const { todos } = useTodos();

  return (
    <div className="space-y-2">
      {todos.length ? (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
          />
        ))
      ) : (
        <p className="text-gray-500">No tasks available.</p>
      )}
    </div>
  );
};

export default TodoList;
