import React, { useState } from 'react'
import AnimatedBackground from '../components/AnimatedBackground.jsx'
import InputField from '../components/InputField.jsx'
import { Link } from 'react-router-dom'
import { Mail } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { sendPasswordResetEmail } from '../store/slices/authSlice.js'

const ForgetPassword = () => {
    const [email, setEmail] = useState('')
    const dispatch = useDispatch()

    const handleSubmit = () => {
        dispatch(
            sendPasswordResetEmail({
                email: email,
            })
        )
    }
    return (
        <div className="min-h-screen flex items-center justify-center p-4 pt-20 relative overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700">
            <AnimatedBackground />

            <div className="relative w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 animate-fadeIn">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                        <Mail size={32} className="text-white" />
                    </div>
                    <h2 className="text-4xl font-bold text-white mb-2">
                        Forgot Password?
                    </h2>
                    <p className="text-white/70">
                        No worries, we'll send you reset instructions
                    </p>
                </div>

                <div className="space-y-4">
                    <InputField
                        icon={<Mail size={20} />}
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <button
                        onClick={handleSubmit}
                        className="w-full px-6 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-2xl font-semibold hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
                    >
                        Send Reset Code
                    </button>

                    <div className="text-center">
                        <Link
                            to="/login"
                            className="text-white/70 hover:text-white text-sm transition-colors"
                        >
                            ← Back to login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ForgetPassword
