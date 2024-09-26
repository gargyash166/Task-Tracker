
import { createSlice, nanoid } from "@reduxjs/toolkit";

// Helper functions for local storage
const loadTodosFromLocalStorage = () => {
    const todos = localStorage.getItem('todos');
    return todos ? JSON.parse(todos) : [];
};

const saveTodosToLocalStorage = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
};

// Agr local storage is empty ho tho initial msg show
const initialState = {
    todos: loadTodosFromLocalStorage().length > 0 ? loadTodosFromLocalStorage() : [{ id: 1, text: "Hello Yash", completed: false }],
};

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                text: action.payload,
                completed: false, // Set default completion state
            };
            state.todos.push(todo);
            saveTodosToLocalStorage(state.todos);
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
            saveTodosToLocalStorage(state.todos);
        },
        updatetodo: (state, action) => {
            const { id, text, completed } = action.payload;
            const todo = state.todos.find((todo) => todo.id === id);
            if (todo) {
                todo.text = text !== undefined ? text : todo.text; // Only update text if provided
                todo.completed = completed !== undefined ? completed : todo.completed; // Only update completion if provided
            }
            saveTodosToLocalStorage(state.todos);
        },
    },
});

export const { addTodo, removeTodo, updatetodo } = todoSlice.actions;

export default todoSlice.reducer;
