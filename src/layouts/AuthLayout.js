import { ConfirmDialog } from 'primereact/confirmdialog'
import React from 'react'
import { Outlet } from 'react-router-dom'

function AuthLayout() {
    return (
        <main className="h-screen w-screen">
            <ConfirmDialog />
            {<Outlet />}
        </main>
    )
}

export default AuthLayout