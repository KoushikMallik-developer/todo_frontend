import React, { useEffect } from 'react'
import InsightCard from '../components/InsightCard.jsx'
import StatCard from '../components/StatCard.jsx'
import AnimatedBackground from '../components/AnimatedBackground.jsx'
import {
    CheckCircle,
    Calendar,
    TrendingUp,
    BarChart3,
    Clock,
} from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import {
    getInsights,
    getLastDaysTodos,
    getStats,
} from '../store/slices/todoSlice.js'
import { formatDateTimeForEveryday } from '../utils/helpers.js'

const History = () => {
    // Mock data for demonstration
    // const mockHistory = [
    //   {
    //     date: "2024-12-11",
    //     tasks: [
    //       { id: 1, title: "Complete project documentation", completed: true, completedAt: "10:30 AM" },
    //       { id: 2, title: "Review pull requests", completed: true, completedAt: "2:15 PM" },
    //       { id: 3, title: "Team standup meeting", completed: true, completedAt: "9:00 AM" },
    //       { id: 4, title: "Update design mockups", completed: false },
    //     ]
    //   },
    //   {
    //     date: "2024-12-10",
    //     tasks: [
    //       { id: 5, title: "Client presentation", completed: true, completedAt: "11:00 AM" },
    //       { id: 6, title: "Code review session", completed: true, completedAt: "3:30 PM" },
    //       { id: 7, title: "Prepare weekly report", completed: true, completedAt: "4:45 PM" },
    //     ]
    //   },
    //   {
    //     date: "2024-12-09",
    //     tasks: [
    //       { id: 8, title: "Database optimization", completed: true, completedAt: "1:20 PM" },
    //       { id: 9, title: "Bug fixes", completed: true, completedAt: "10:00 AM" },
    //       { id: 10, title: "Deploy to staging", completed: false },
    //       { id: 11, title: "Testing new features", completed: true, completedAt: "5:15 PM" },
    //     ]
    //   },
    // ];
    const { lastDaysTodos, historyTodos, stats, insights, todos } = useSelector(
        (state) => state.todo
    )
    const { is_logged_in, token } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getStats())
        dispatch(getInsights())
        dispatch(getLastDaysTodos())
    }, [todos, is_logged_in, token])
    debugger
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

                {Object.entries(lastDaysTodos).map(([day, todos]) => (
                    <div
                        key={day.date}
                        className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20 animate-fadeIn"
                        // style={{ animationDelay: `${dayIndex * 0.1}s` }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-white/20 rounded-lg">
                                <Calendar className="text-white" size={24} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white">
                                    {day}
                                </h3>
                                <p className="text-white/60 text-sm">
                                    {todos.filter((t) => t.completed).length} of{' '}
                                    {todos.length} completed
                                </p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {todos.map((task, taskIndex) => (
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
                                    {task.completed && task.completed_at && (
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
                ))}

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
