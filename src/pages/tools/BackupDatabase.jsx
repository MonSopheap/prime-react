import React from 'react'
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function BackupDatabase() {
    const [translate] = useTranslation("global")
    const navigate = useNavigate()

    const handleBackupData = () => {

    }
    return (
        <>
            <div className="w-full h-full text-center">
                <div className="h-full flex flex-column justify-content-center align-items-center">
                    <div className='border-circle bg-gray-200 overflow-hidden flex flex-column justify-content-center align-items-center mb-2' style={{ width: "100px", height: "100px" }}>
                        <i className="pi pi-server text-gray-400" style={{ fontSize: '3rem' }}></i>
                    </div>
                    <h2 className="text-gray-500 mb-1 mt-0 text-4xl font-bold">Database Backups</h2>
                    <p className="text-lg py-0 my-0 text-600">{translate("MSG.BACKUP_YOUR_DATABASE")}</p>
                    <Button onClick={handleBackupData} label={translate("GLOBAL.BACKUP_DATA")} className="mt-3 text-md py-2" icon="pi pi-download" iconPos="left" />
                </div>
            </div>
        </>
    )
}

export default BackupDatabase