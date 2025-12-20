import React, { useEffect, useState } from 'react'
import InsightCard from '../components/InsightCard.jsx'
import StatCard from '../components/StatCard.jsx'
import AnimatedBackground from '../components/AnimatedBackground.jsx'
import {
    CheckCircle,
    Calendar,
    TrendingUp,
    BarChart3,
    Clock,
    Search,
} from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import {
    getInsights,
    getLastDaysTodos,
    getStats,
    getTodosForDate,
} from '../store/slices/todoSlice.js'
import { formatDateTimeForEveryday } from '../utils/helpers.js'

const History = () => {
    const { lastDaysTodos, historyTodos, stats, insights, todos } = useSelector(
        (state) => state.todo
    )
    const { is_logged_in, token } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const [selectedDate, setSelectedDate] = useState('')
    const [showDateSearch, setShowDateSearch] = useState(false)
    useEffect(() => {
        dispatch(getStats())
        dispatch(getInsights())
        dispatch(getLastDaysTodos())
    }, [todos, is_logged_in, token])
    const handleDateSearch = () => {
        if (selectedDate) {
            debugger
            dispatch(getTodosForDate({ todo_date: selectedDate }))
            setShowDateSearch(true)
        }
    }

    const handleClearSearch = () => {
        setSelectedDate('')
        setShowDateSearch(false)
    }

    const displayTodos = showDateSearch ? historyTodos : lastDaysTodos

    return (
        <div className="min-h-screen p-4 pt-20 pb-8 relative overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700">
            <AnimatedBackground />

            <div className="relative max-w-6xl mx-auto">
                <div className="text-center mb-8 animate-fadeIn">
                    <h1 className="text-5xl font-bold text-white mb-2 tracking-tight">
                        Task History
                    </h1>
                    <p className="text-white/70 text-lg">
                        Track your productivity over time
                    </p>
                </div>

                {/* Date Search Section */}
                <div className="mb-8 bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20">
                    <div className="flex flex-col sm:flex-row gap-4 items-center">
                        <div className="flex-1 w-full">
                            <label className="block text-white mb-2 font-medium">
                                Search by Date
                            </label>
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) =>
                                    setSelectedDate(e.target.value)
                                }
                                max={new Date().toISOString().split('T')[0]}
                                className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                                style={{ colorScheme: 'dark' }}
                            />
                        </div>
                        <div className="flex gap-2 self-end">
                            <button
                                onClick={handleDateSearch}
                                disabled={!selectedDate}
                                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-medium hover:from-blue-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2 shadow-lg"
                            >
                                <Search size={20} />
                                Search
                            </button>
                            {showDateSearch && (
                                <button
                                    onClick={handleClearSearch}
                                    className="px-6 py-3 bg-white/20 text-white rounded-xl font-medium hover:bg-white/30 transition-all duration-300 shadow-lg"
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                    </div>
                    {showDateSearch && (
                        <p className="mt-3 text-white/70 text-sm">
                            Showing results for:{' '}
                            {new Date(selectedDate).toLocaleDateString(
                                'en-US',
                                {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                }
                            )}
                        </p>
                    )}
                </div>

                {/* Analytics Section */}
                <div className="grid md:grid-cols-4 gap-4 mb-8">
                    <StatCard
                        icon={<CheckCircle size={28} />}
                        label="Total Tasks"
                        value={stats.total_todos_count}
                        color="from-blue-500 to-cyan-500"
                    />
                    <StatCard
                        icon={<TrendingUp size={28} />}
                        label="Completed"
                        value={stats.completed_todos_count}
                        color="from-green-500 to-emerald-500"
                    />
                    <StatCard
                        icon={<BarChart3 size={28} />}
                        label="Completion Rate"
                        value={`${stats.completion_rate}%`}
                        color="from-purple-500 to-pink-500"
                    />
                    <StatCard
                        icon={<Clock size={28} />}
                        label="Avg per Day"
                        value={stats.average_completion_per_day}
                        color="from-orange-500 to-red-500"
                    />
                </div>

                {/*History Timeline*/}
                {Object.keys(displayTodos).length === 0 ? (
                    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 text-center shadow-2xl border border-white/20">
                        <Calendar
                            className="mx-auto text-white/50 mb-4"
                            size={48}
                        />
                        <p className="text-white/70 text-lg">
                            No tasks found for the selected date
                        </p>
                    </div>
                ) : (
                    Object.entries(displayTodos).map(([day, todos]) => (
                        <div
                            key={day}
                            className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 mt-8 shadow-2xl border border-white/20 animate-fadeIn"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-white/20 rounded-lg">
                                    <Calendar
                                        className="text-white"
                                        size={24}
                                    />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white">
                                        {day}
                                    </h3>
                                    <p className="text-white/60 text-sm">
                                        {
                                            todos.filter((t) => t.completed)
                                                .length
                                        }{' '}
                                        of {todos.length} completed
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {todos.map((task) => (
                                    <div
                                        key={task.id}
                                        className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300"
                                    >
                                        <div className="flex items-center gap-3 flex-1">
                                            <div
                                                className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                                                    task.completed
                                                        ? 'bg-gradient-to-r from-green-400 to-emerald-500'
                                                        : 'border-2 border-white/40'
                                                }`}
                                            >
                                                {task.completed && (
                                                    <CheckCircle
                                                        size={16}
                                                        className="text-white"
                                                    />
                                                )}
                                            </div>
                                            <span
                                                className={`text-white ${
                                                    task.completed
                                                        ? 'opacity-70 line-through'
                                                        : 'opacity-100'
                                                }`}
                                            >
                                                {task.title}
                                            </span>
                                        </div>
                                        {task.completed &&
                                            task.completed_at && (
                                                <span className="text-white/50 text-sm flex items-center gap-1">
                                                    <Clock size={14} />
                                                    {formatDateTimeForEveryday(
                                                        task.completed_at
                                                    )}
                                                </span>
                                            )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                )}

                {/* Insights Section */}
                <div className="mt-8 bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20">
                    <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                        <TrendingUp size={24} />
                        Productivity Insights
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <InsightCard
                            title="Most Productive Day"
                            value={
                                insights.last_fully_completed_todo_date
                                    ? insights.last_fully_completed_todo_date
                                    : 'N/A'
                            }
                            description="All tasks completed"
                        />
                        <InsightCard
                            title="This Month"
                            value={
                                insights.total_todos_completed_this_month
                                    ? `${insights.total_todos_completed_this_month} tasks`
                                    : 'N/A'
                            }
                            description="Completed successfully"
                        />
                        <InsightCard
                            title="Peak Hours"
                            value={
                                insights.overall_peak_completion_hour
                                    ? insights.overall_peak_completion_hour
                                    : 'N/A'
                            }
                            description="Most tasks completed"
                        />
                        <InsightCard
                            title="This Week"
                            value={
                                insights.total_todos_completed_this_week
                                    ? `${insights.total_todos_completed_this_week} tasks`
                                    : 'N/A'
                            }
                            description="Completed successfully"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default History
