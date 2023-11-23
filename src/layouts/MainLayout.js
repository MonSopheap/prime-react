import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function MainLayout({ children }) {
    const navigate = useNavigate()

    return (
        <>
            <main className="h-screen w-screen">
                <div className="h-full flex flex-column align-items-center justify-content-center">
                    <Navbar />
                    <div className="h-full w-full flex-1 overflow-auto">
                        {children}
                    </div>
                </div>
            </main>
        </>
    )
}

export default MainLayout