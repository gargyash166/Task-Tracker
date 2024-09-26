import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTodo, updatetodo } from '../features/Todo/TodoSlice';

function Todos() {
    const todos = useSelector(state => state.todos);
    const dispatch = useDispatch();

    const [editTodoId, setEditTodoId] = useState(null);
    const [editText, setEditText] = useState('');
    const [showCompleted, setShowCompleted] = useState(true); // State to toggle visibility of completed todos

    const handleEditClick = (todo) => {
        setEditTodoId(todo.id);
        setEditText(todo.text);
    };

    const handleUpdate = (e, id) => {
        e.preventDefault();
        if (editText.trim() && editText !== todos.find(todo => todo.id === id).text) {
            dispatch(updatetodo({ id, text: editText }));
        }
        setEditTodoId(null);
        setEditText('');
    };

    const toggleComplete = (id) => {
        const todo = todos.find(todo => todo.id === id);
        dispatch(updatetodo({ id, text: todo.text, completed: !todo.completed }));
    };

    const toggleShowCompleted = () => {
        setShowCompleted(!showCompleted);
    };

    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <div className='text-lg text-yellow-100'>Your List of Saved Tasks</div>
                <button 
                    onClick={toggleShowCompleted} 
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    {showCompleted ? "Hide Completed" : "Show Completed 😇"}
                </button>
            </div>
            <ul className="list-none">
                {todos.filter(todo => showCompleted || !todo.completed).map((todo) => (
                    <li
                        className="mt-4 flex justify-between items-center bg-zinc-800 px-4 py-2 rounded"
                        key={todo.id}
                    >
                        {editTodoId === todo.id ? (
                            <form onSubmit={(e) => handleUpdate(e, todo.id)} className="flex items-center">
                                <input
                                    type="text"
                                    className="bg-gray-700 text-white px-2 py-1 rounded"
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                />
                                <button type="submit" className="ml-2 text-white bg-green-500 px-4 py-1 rounded" disabled={!editText.trim()}>✔</button>
                            </form>
                        ) : (
                            <>
                                <div 
                                    className={`text-white cursor-pointer ${todo.completed ? 'line-through' : ''}`} 
                                    onClick={() => toggleComplete(todo.id)}
                                >
                                    {todo.text}
                                </div>
                                <div className="flex items-center">
                                    <button
                                        onClick={() => handleEditClick(todo)}
                                        className="text-white bg-blue-500 border-0 py-1 px-2 mx-2 focus:outline-none hover:bg-blue-600 rounded"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path d="M15.586 4.586a2 2 0 010 2.828l-9 9A2 2 0 013 14.414V12a2 2 0 012-2h2.414l9-9a2 2 0 012.828 0z" />
                                            <path d="M5 15a2 2 0 001.414.586l9-9a2 2 0 00-2.828-2.828l-9 9A2 2 0 005 15z" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => dispatch(removeTodo(todo.id))}
                                        className="text-white bg-red-500 border-0 py-1 px-2 focus:outline-none hover:bg-red-600 rounded"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M9 6V4a2 2 0 012-2h2a2 2 0 012 2v2m-4 0h4M3 6l1 12a2 2 0 002 2h12a2 2 0 002-2l1-12H3z" />
                                        </svg>
                                    </button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </>
    );
}

export default Todos;
