import React, { useEffect, useState } from 'react'
import { api } from '../api.js'
import { Check, Clock, Plus, Trash2 } from 'lucide-react'
import {
    createTodo,
    deleteTodo,
    fetchTodos,
    toggleTodo,
} from '../store/slices/todoSlice.js'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { formatDateTimeForEveryday } from '../utils/helpers.js'

const Dashboard = () => {
    const { todos, isLoading } = useSelector((state) => state.todo)

    const dispatch = useDispatch()

    const [title, setTitle] = useState('')

    useEffect(() => {
        dispatch(fetchTodos())
    }, [])

    const handleAdd = async (e) => {
        e.preventDefault()
        if (!title.trim()) {
            toast.error('Please enter a task title')
        }
        dispatch(createTodo({ title: title.trim() }))
        setTitle('')
    }

    const handleToggle = async (id) => {
        dispatch(toggleTodo({ todo_id: id }))
    }

    const handleDelete = async (id) => {
        dispatch(deleteTodo({ todo_id: id }))
    }
    return (
        <div className="min-h-screen flex items-center justify-center p-4 pt-20 relative overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            {/* Main card with glassmorphism */}
            <div className="relative w-full max-w-2xl bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-5xl font-bold text-white mb-2 tracking-tight">
                        Tasks
                    </h1>
                    <p className="text-white/70 text-sm">
                        Stay organized, stay productive
                    </p>
                </div>

                {/* Input section */}
                <div className="mb-6">
                    <div className="relative flex items-center gap-3">
                        <div className="flex-1 relative group">
                            <input
                                type="text"
                                placeholder="What needs to be done?"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault()
                                        handleAdd(e)
                                    }
                                }}
                                className="w-full px-6 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/25 transition-all duration-300"
                            />
                        </div>
                        <button
                            onClick={handleAdd}
                            className="px-6 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-2xl font-semibold hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2"
                        >
                            <Plus size={20} />
                            <span>Add</span>
                        </button>
                    </div>
                </div>

                {/* Loading state */}
                {isLoading && (
                    <div className="text-center py-8">
                        <div className="inline-block w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                    </div>
                )}

                {/* Todo list */}
                <div className="space-y-3">
                    {todos?.map((todo, index) => (
                        <div
                            key={todo.id}
                            className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 hover:bg-white/15 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                            style={{
                                animation: `slideIn 0.3s ease-out ${index * 0.05}s both`,
                            }}
                        >
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-4 flex-1 min-w-0">
                                    <button
                                        onClick={() => handleToggle(todo.id)}
                                        className={`flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${
                                            todo.completed
                                                ? 'bg-gradient-to-r from-green-400 to-emerald-500 border-green-400'
                                                : 'border-white/40 hover:border-white/60'
                                        }`}
                                    >
                                        {todo.completed && (
                                            <Check
                                                size={16}
                                                className="text-white"
                                            />
                                        )}
                                    </button>
                                    <span
                                        className={`text-white flex-1 transition-all duration-300 cursor-pointer ${
                                            todo.completed
                                                ? 'line-through opacity-50'
                                                : 'opacity-100'
                                        }`}
                                        onClick={() => handleToggle(todo.id)}
                                    >
                                        {todo.title}
                                    </span>
                                </div>
                                {todo.completed && todo.created_at && (
                                    <span className="text-white/50 text-sm flex items-center gap-1">
                                        <Clock size={14} />
                                        {formatDateTimeForEveryday(
                                            todo.completed_at
                                        )}
                                    </span>
                                )}
                                <button
                                    onClick={() => handleDelete(todo.id)}
                                    className="flex-shrink-0 p-2 text-white/60 text-red-400 bg-red-500/20 rounded-lg"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}

                    {!isLoading && todos?.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-white/40 text-lg mb-2">
                                No tasks yet
                            </div>
                            <div className="text-white/30 text-sm">
                                Add your first task to get started!
                            </div>
                        </div>
                    )}
                </div>

                {/* Stats footer */}
                {todos?.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between text-white/60 text-sm">
                        <span>
                            {todos.filter((t) => !t.completed).length} active
                        </span>
                        <span>
                            {todos.filter((t) => t.completed).length} completed
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}
export default Dashboard
