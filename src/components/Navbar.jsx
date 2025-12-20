import React, { useState } from 'react'
import { CheckCircle, Menu, X } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../store/slices/authSlice.js'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const { token, status_code, isLoading, isLoggedIn } = useSelector(
        (state) => state.auth
    )

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const handleLogout = () => {
        dispatch(logout())
        navigate('/')
    }
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-xl border-b border-white/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center cursor-pointer">
                        <CheckCircle className="text-white mr-2" size={28} />
                        <span className="text-white text-xl font-bold">
                            {import.meta.env.VITE_APP_NAME || 'Task Master'}
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-4">
                        {!isLoggedIn ? (
                            <>
                                <Link
                                    to="/"
                                    className={`px-4 py-2 text-white rounded-lg transition-all duration-200 hover:bg-white/10`}
                                >
                                    Home
                                </Link>
                                <Link
                                    to="/login"
                                    className="px-6 py-2 text-white border border-white/30 rounded-xl hover:bg-white/10 transition-all duration-200"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
                                >
                                    Get Started
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/dashboard"
                                    className={`px-4 py-2 text-white rounded-lg transition-all duration-200 hover:bg-white/10`}
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    to="/history"
                                    className={`px-4 py-2 text-white rounded-lg transition-all duration-200 hover:bg-white/10`}
                                >
                                    History
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="px-6 py-2 text-white border border-white/30 rounded-xl hover:bg-white/10 transition-all duration-200"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-all duration-200"
                    >
                        {isMobileMenuOpen ? (
                            <X size={24} />
                        ) : (
                            <Menu size={24} />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white/10 backdrop-blur-xl border-t border-white/20">
                    <div className="px-4 py-4 space-y-2">
                        {!isLoggedIn ? (
                            <>
                                <button
                                    onClick={() => {
                                        navigate('/')
                                        setIsMobileMenuOpen(false)
                                    }}
                                    className={`w-full text-left px-4 py-3 text-white rounded-lg transition-all duration-200 hover:bg-white/10`}
                                >
                                    Home
                                </button>
                                <button
                                    onClick={() => {
                                        navigate('/login')
                                        setIsMobileMenuOpen(false)
                                    }}
                                    className="w-full text-left px-4 py-3 text-white border border-white/30 rounded-lg hover:bg-white/10 transition-all duration-200"
                                >
                                    Sign In
                                </button>
                                <button
                                    onClick={() => {
                                        navigate('/register')
                                        setIsMobileMenuOpen(false)
                                    }}
                                    className="w-full px-4 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-semibold transition-all duration-200"
                                >
                                    Get Started
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => {
                                        navigate('/dashboard')
                                        setIsMobileMenuOpen(false)
                                    }}
                                    className={`w-full text-left px-4 py-3 text-white rounded-lg transition-all duration-200 hover:bg-white/10"`}
                                >
                                    Dashboard
                                </button>
                                <button
                                    onClick={() => {
                                        navigate('/history')
                                        setIsMobileMenuOpen(false)
                                    }}
                                    className={`w-full text-left px-4 py-3 text-white rounded-lg transition-all duration-200 hover:bg-white/10"`}
                                >
                                    History
                                </button>
                                <button
                                    onClick={() => {
                                        handleLogout()
                                        setIsMobileMenuOpen(false)
                                    }}
                                    className="w-full text-left px-4 py-3 text-white border border-white/30 rounded-lg hover:bg-white/10 transition-all duration-200"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    )
}
export default Navbar
