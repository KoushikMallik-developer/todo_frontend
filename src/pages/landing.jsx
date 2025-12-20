import { CheckCircle, Mail, ArrowRight, Shield } from 'lucide-react'
import FeatureCard from '../components/FeatureCard.jsx'
import AnimatedBackground from '../components/AnimatedBackground.jsx'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Landing = () => {
    const { isLoggedIn, token } = useSelector((state) => state.auth)
    return (
        <div className="min-h-screen flex items-center justify-center p-4 pt-20 relative overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700">
            <AnimatedBackground />

            <div className="relative w-full max-w-6xl">
                <div className="text-center animate-fadeIn">
                    <h1 className="text-7xl font-bold text-white mb-6 tracking-tight">
                        {import.meta.env.VITE_APP_NAME || 'Task Master'}
                    </h1>
                    <p className="text-2xl text-white/80 mb-4">
                        Your productivity companion
                    </p>
                    <p className="text-lg text-white/60 mb-12 max-w-2xl mx-auto">
                        Organize your life, achieve your goals, and stay on top
                        of everything that matters.
                    </p>

                    {isLoggedIn && token ? (
                        <div className="flex flex-wrap gap-4 justify-center mb-16">
                            <Link
                                to="/dashboard"
                                className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-2xl font-semibold hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2"
                            >
                                Dashboard
                                <ArrowRight size={20} />
                            </Link>
                        </div>
                    ) : (
                        <div className="flex flex-wrap gap-4 justify-center mb-16">
                            <Link
                                to="register"
                                className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-2xl font-semibold hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2"
                            >
                                Get Started
                                <ArrowRight size={20} />
                            </Link>
                            <Link
                                to="/login"
                                className="px-8 py-4 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-2xl font-semibold hover:bg-white/30 hover:scale-105 active:scale-95 transition-all duration-200"
                            >
                                Sign In
                            </Link>
                        </div>
                    )}

                    <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        <FeatureCard
                            icon={<CheckCircle size={32} />}
                            title="Simple & Intuitive"
                            description="Clean interface designed for maximum productivity"
                        />
                        <FeatureCard
                            icon={<Shield size={32} />}
                            title="Secure & Private"
                            description="Your data is encrypted and protected"
                        />
                        <FeatureCard
                            icon={<Mail size={32} />}
                            title="Always Synced"
                            description="Access your tasks from anywhere, anytime"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Landing
