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
                    <h1 className="text-gray-500 mb-1 text-5xl font-bold">Database Backups</h1>
                    <p className="text-md p-0 my-1 text-600">{translate("MSG.PAGE_NOT_FOUND")}</p>
                    <Button onClick={handleBackupData} label={translate("GLOBAL.BACKUP_DATA")} className="mt-3 text-md py-2" icon="pi pi-inbox" iconPos="left" />
                </div>
            </div>
        </>
    )
}

export default BackupDatabase