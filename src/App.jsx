import { useEffect, useState } from 'react'
import { Plus, Check, X, Trash2 } from 'lucide-react'
import { api } from './api.js'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import PublicLayout from './pages/PublicLayout/index.jsx'
import ProtectedRoute from './pages/ProtectedRoute/index.jsx'
import Landing from './pages/landing.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ForgetPassword from './pages/ForgetPassword.jsx'
import PasswordReset from './pages/PasswordReset.jsx'

function App() {
    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={true}
                toastOptions={{
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                        padding: '10px',
                    },
                }}
            />
            <Routes>
                <Route element={<PublicLayout />}>
                    <Route path="/" element={<Landing />} />
                    {/*<Route path="/features" element={<FeaturesPage />} />*/}
                    {/*<Route path="/about" element={<AboutPage />} />*/}
                    {/*<Route path="/contact" element={<ContactPage />} />*/}
                    {/*<Route path="/pricing" element={<PricingPage />} />*/}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/forgot-password"
                        element={<ForgetPassword />}
                    />
                    <Route
                        path="/password-reset/:emailtoken"
                        element={<PasswordReset />}
                    />
                </Route>
                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    {/*    <Route element={<PublicLayout />}>*/}
                    {/*        <Route path="/profile" element={<Profile />} />*/}
                    {/*        <Route*/}
                    {/*            path="/workspaces"*/}
                    {/*            element={<WorkspaceListPage />}*/}
                    {/*        />*/}
                    {/*    </Route>*/}
                </Route>
            </Routes>
        </>
    )
}

export default App
