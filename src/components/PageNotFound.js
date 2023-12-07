import React from 'react'
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function PageNotFound() {
    const [translate] = useTranslation("global")
    const navigate = useNavigate()
    return (
        <>
            <div className="w-full h-full text-center">
                <div className="h-full flex flex-column justify-content-center align-items-center">
                    <h1 className="text-gray-500 mb-2 text-7xl font-bold">Oops</h1>
                    <h2 className="p-0 mb-1 text-gray-500">{translate("GLOBAL.PAGE_404")}</h2>
                    <p className="text-md p-0 my-1 text-600"><span className="font-bold text-600">[404]</span> {translate("MSG.PAGE_NOT_FOUND")}</p>
                    <Button onClick={() => navigate("/home")} label={translate("NAV.GO_TO_DASHBOARD")} className="mt-3 text-md py-2" icon="pi pi-replay" iconPos="left" />
                </div>
            </div>
        </>
    )
}

export default PageNotFound