const TODOS_KEY = 'todos';

export const saveTodos = (todos: any[]) => {
    try {
        localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
    } catch (error) {
        console.error("Error saving todos to localStorage", error);
    }
};

export const loadTodos = (): any[] => {
    try {
        const savedTodos = localStorage.getItem(TODOS_KEY);
        return savedTodos ? JSON.parse(savedTodos) : [];
    } catch (error) {
        console.error("Error loading todos from localStorage", error);
        return [];
    }
};
