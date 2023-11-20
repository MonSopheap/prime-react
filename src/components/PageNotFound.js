import React from 'react'
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

function PageNotFound() {
    const navigate = useNavigate()
    return (
        <>
            <div className="w-full h-full text-center">
                <div className="h-full flex flex-column justify-content-center align-items-center">
                    <h1 className="p-0 m-0">Page not found</h1>
                    <p className="text-xl p-0 my-2" style={{ fontFamily: "Kantumruy Pro" }}>We're sorry, the page you requested could not be found!</p>
                    <Button onClick={() => navigate("/home")} label="Go To Dashboard" className="mt-3 text-sm" icon="pi pi-replay" iconPos="left" />
                </div>
            </div>
        </>
    )
}

export default PageNotFound