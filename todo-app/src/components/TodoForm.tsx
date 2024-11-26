import React, { useState } from "react";
import { useTodos } from "../context/TodoContext";

const TodoForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const { dispatch } = useTodos();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch({ type: "ADD_TODO", payload: title });
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex space-x-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-4 py-2 border rounded-md"
        placeholder="Add a new task..."
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Add
      </button>
    </form>
  );
};

export default TodoForm;
