import React, { useEffect, useState } from 'react'
import AnimatedBackground from '../components/AnimatedBackground.jsx'
import InputField from '../components/InputField.jsx'
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser, verifyOTP } from '../store/slices/authSlice.js'
import {
    arePasswordsMatching,
    isValidEmail,
    isValidName,
} from '../utils/helpers.js'
import toast from 'react-hot-toast'

const Register = () => {
    const { isLoading, status_code, isLoggedIn, token } = useSelector(
        (state) => state.auth
    )

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showOTP, setShowOTP] = useState(false)
    const [otp, setOtp] = useState(['', '', '', '', '', ''])
    useEffect(() => {
        if (isLoggedIn && token) {
            navigate('/dashboard')
        }
        if (status_code === 201) {
            setShowOTP(true)
        }
    }, [status_code, token, isLoggedIn])

    const handleRegister = () => {
        console.log('Register:', { name, email, password, confirmPassword })
        if (
            isValidName(name) &&
            isValidEmail(email) &&
            arePasswordsMatching(password, confirmPassword)
        ) {
            dispatch(
                registerUser({
                    name: name,
                    email: email,
                    password: password,
                })
            )
        }
        // setShowOTP(true)
    }

    const handleOTPChange = (index, value) => {
        if (value.length > 1) return
        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)

        if (value && index < 5) {
            document.getElementById(`reg-otp-${index + 1}`)?.focus()
        }
    }

    const handleOTPKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            document.getElementById(`reg-otp-${index - 1}`)?.focus()
        }
    }

    const handleVerifyOTP = () => {
        console.log('Verify OTP:', otp.join(''))
        // After successful OTP verification, navigate to login or dashboard
        if (otp.every((digit) => digit !== '')) {
            dispatch(
                verifyOTP({
                    email: email,
                    otp: otp.join(''),
                })
            )
        } else {
            toast.error('Please enter the complete OTP')
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700">
            <AnimatedBackground />

            <div className="relative w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 animate-fadeIn">
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-bold text-white mb-2">
                        {showOTP ? 'Verify Email' : 'Create Account'}
                    </h2>
                    <p className="text-white/70">
                        {showOTP
                            ? 'Enter the 6-digit code sent to your email'
                            : 'Join Task Master today'}
                    </p>
                </div>

                {!showOTP ? (
                    <div className="space-y-4">
                        <InputField
                            icon={<User size={20} />}
                            type="text"
                            placeholder="Full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

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

                        <InputField
                            icon={<Lock size={20} />}
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />

                        <button
                            onClick={handleRegister}
                            disabled={isLoading}
                            className="w-full px-6 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-2xl font-semibold hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
                        >
                            Create Account
                        </button>

                        <div className="text-center text-white/70 text-sm">
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                className="text-white font-semibold hover:underline"
                            >
                                Sign in
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
                ) : (
                    <div className="space-y-6">
                        <div className="flex gap-2 justify-center">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    id={`reg-otp-${index}`}
                                    type="text"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) =>
                                        handleOTPChange(index, e.target.value)
                                    }
                                    onKeyDown={(e) =>
                                        handleOTPKeyDown(index, e)
                                    }
                                    className="w-12 h-14 text-center text-2xl font-semibold bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/25 transition-all duration-300"
                                />
                            ))}
                        </div>

                        <button
                            onClick={handleVerifyOTP}
                            className="w-full px-6 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-2xl font-semibold hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
                        >
                            Verify & Complete Registration
                        </button>

                        <div className="text-center text-white/70 text-sm">
                            Didn't receive the code?{' '}
                            <button
                                onClick={handleRegister}
                                className="text-white font-semibold hover:underline"
                            >
                                Resend
                            </button>
                        </div>

                        <div className="text-center">
                            <button
                                onClick={() => setShowOTP(false)}
                                className="text-white/70 hover:text-white text-sm transition-colors"
                            >
                                ← Back to registration
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
export default Register
