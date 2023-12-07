import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ConfirmDialog } from 'primereact/confirmdialog';

function MainLayout() {
    const location = useLocation();

    return (
        <>
            <main className="h-screen w-screen">
                <ConfirmDialog />

                {
                    location.pathname === '/login' ? <>{<Outlet />}</> : (
                        <div className="h-full flex flex-column align-items-center justify-content-center">
                            <Navbar />
                            <div className="h-full w-full flex-1 overflow-auto">
                                {<Outlet />}
                            </div>
                        </div>
                    )
                }
            </main>
        </>
    )
}

export default MainLayout