import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import InputField from '../components/InputField.jsx'
import AnimatedBackground from '../components/AnimatedBackground.jsx'
import { Lock, Eye, EyeOff } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updatePassword } from '../store/slices/authSlice.js'
import { arePasswordsMatching } from '../utils/helpers.js'

const PasswordReset = () => {
    const { emailtoken } = useParams()

    const { isLoading, status_code, isLoggedIn, token } = useSelector(
        (state) => state.auth
    )

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const handleResetPassword = () => {
        if (arePasswordsMatching(password1, password2)) {
            localStorage.setItem('access_token', emailtoken)
            dispatch(
                updatePassword({
                    password1,
                    password2,
                })
            )
        } else {
            alert('Passwords do not match')
        }
    }
    useEffect(() => {
        if (isLoggedIn && token) {
            navigate('/dashboard')
        }
        if (status_code === 200) {
            localStorage.removeItem('access_token')
            navigate('/login')
        }
    }, [isLoggedIn, token, status_code])
    return (
        <div className="min-h-screen flex items-center justify-center p-4 pt-20 relative overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700">
            <AnimatedBackground />

            <div className="relative w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 animate-fadeIn">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                        <Lock size={32} className="text-white" />
                    </div>
                    <h2 className="text-4xl font-bold text-white mb-2">
                        Reset Password
                    </h2>
                    <p className="text-white/70">
                        Create a new secure password
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="relative">
                        <InputField
                            icon={<Lock size={20} />}
                            type={showPassword ? 'text' : 'password'}
                            placeholder="New password"
                            value={password1}
                            onChange={(e) => setPassword1(e.target.value)}
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

                    <InputField
                        icon={<Lock size={20} />}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Confirm new password"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                    />

                    <button
                        disabled={isLoading}
                        onClick={handleResetPassword}
                        className="w-full px-6 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-2xl font-semibold hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
                    >
                        Reset Password
                    </button>

                    <div className="text-center">
                        <Link
                            to="/forgot-password"
                            className="text-white/70 hover:text-white text-sm transition-colors"
                        >
                            ← Back
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PasswordReset
