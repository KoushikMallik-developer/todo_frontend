import { Outlet } from 'react-router-dom'
import * as React from 'react'
import Navbar from '../../components/Navbar.jsx'
// import Header from '../../components/Header/index.jsx'
// import Footer from '../../components/Footer/index.jsx'

// ProtectedRoute component
const PublicLayout = () => {
    return (
        <div className="bg-neutral-900 text-white">
            <Navbar />
            <Outlet />
            {/*<Footer />*/}
        </div>
    )
}

export default PublicLayout
