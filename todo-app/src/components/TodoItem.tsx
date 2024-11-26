import React, { useState } from "react";
import { useTodos } from "../context/TodoContext";
import { FaEdit, FaTrash } from "react-icons/fa";

interface TodoItemProps {
  id: number;
  title: string;
  completed: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, title, completed }) => {
  const { dispatch } = useTodos();
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleUpdate = () => {
    dispatch({ type: "UPDATE_TODO", payload: { id, title: newTitle } });
    setIsEditing(false);
  };

  return (
    <div
      className={`flex justify-between items-center p-2 ${
        completed ? "bg-green-100" : "bg-gray-100"
      } rounded-md`}
    >
      {isEditing ? (
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="w-full px-2 py-1 border rounded-md"
        />
      ) : (
        <span className={completed ? "line-through" : ""}>{title}</span>
      )}

      <div className="flex space-x-2">
        <button
          onClick={() => dispatch({ type: "TOGGLE_TODO", payload: id })}
          className={`px-2 py-1 ${
            completed ? "bg-yellow-500" : "bg-green-500"
          } text-white rounded-md`}
        >
          {completed ? "Undo" : "Done"}
        </button>

        {isEditing ? (
          <button
            onClick={handleUpdate}
            className="px-2 py-1 bg-blue-500 text-white rounded-md"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-2 py-1 bg-blue-500 text-white rounded-md"
          >
            <FaEdit />
          </button>
        )}

        <button
          onClick={() => dispatch({ type: "DELETE_TODO", payload: id })}
          className="px-2 py-1 bg-red-500 text-white rounded-md"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
