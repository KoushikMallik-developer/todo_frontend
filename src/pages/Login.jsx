import React, { useEffect, useState } from 'react'
import AnimatedBackground from '../components/AnimatedBackground.jsx'
import InputField from '../components/InputField.jsx'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../store/slices/authSlice.js'

const Login = () => {
    const { isLoggedIn, token } = useSelector((state) => state.auth)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = () => {
        console.log('Login:', { email, password })
        dispatch(
            loginUser({
                email: email,
                password: password,
            })
        )
    }

    useEffect(() => {
        if (isLoggedIn && token) {
            navigate('/dashboard')
        }
    }, [isLoggedIn, token])
    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700">
            <AnimatedBackground />

            <div className="relative w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 animate-fadeIn">
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-bold text-white mb-2">
                        Welcome Back
                    </h2>
                    <p className="text-white/70">
                        Sign in to continue to Task Master
                    </p>
                </div>

                <div className="space-y-4">
                    <InputField
                        icon={<Mail size={20} />}
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <div className="relative">
                        <InputField
                            icon={<Lock size={20} />}
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                        >
                            {showPassword ? (
                                <EyeOff size={20} />
                            ) : (
                                <Eye size={20} />
                            )}
                        </button>
                    </div>

                    <div className="text-right">
                        <button
                            to="/forgot-password"
                            className="text-white/70 hover:text-white text-sm transition-colors"
                        >
                            Forgot password?
                        </button>
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="w-full px-6 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-2xl font-semibold hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
                    >
                        Sign In
                    </button>

                    <div className="text-center text-white/70 text-sm">
                        Don't have an account?{' '}
                        <Link
                            to="/register"
                            className="text-white font-semibold hover:underline"
                        >
                            Sign up
                        </Link>
                    </div>

                    <div className="text-center">
                        <Link
                            to="/"
                            className="text-white/50 hover:text-white/70 text-sm transition-colors"
                        >
                            ← Back to home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login
