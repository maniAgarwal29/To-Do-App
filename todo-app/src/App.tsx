// src/App.tsx

import React from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { TodoProvider } from "./context/TodoContext";

const App: React.FC = () => {
  return (
    <TodoProvider>
      <div className="max-w-xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-4">TODO App</h1>
        <TodoForm />
        <TodoList />
      </div>
    </TodoProvider>
  );
};

export default App;
