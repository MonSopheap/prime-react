import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog';

function LoginPage() {
    const [translate] = useTranslation("global");
    const [loading, setLoading] = useState(false);
    const [passwordValue, setPassword] = useState('');
    const toastMsgRef = useRef(null);

    const showMessage = () => {
        toastMsgRef.current.show({ severity: 'error', summary: translate("MSG.WARNING"), detail: translate("ERROR.INVALID_USER"), life: 3000 });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(e)
        setLoading(true);
        showMessage();

        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }

    const signUp = (event) => {
        confirmDialog({
            trigger: event.currentTarget,
            message: 'Are you sure you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => { },
            reject: () => { },
        });
    };

    return (
        <div className='w-full h-full'>
            <Toast ref={toastMsgRef} position="top-center" />

            <div className='w-full h-full flex justify-content-center align-content-center'>
                <div className='flex flex-column m-auto shadow-1 border-round-md' style={{ width: "330px", minWidth: "300px", minHeight: "300px", }}>
                    <div className='px-5 py-5'>
                        <form onSubmit={handleSubmit}>
                            <h1 className='flex p-0 m-0 text-2xl'>{translate("GLOBAL.WELCOME_BACK")}</h1>
                            <p className='p-0 mt-2'>{translate("GLOBAL.ENTER_YOUR_CREDENTIALS")}</p>
                            <div className='pt-2'>
                                <div className="flex flex-column gap-2 mb-3">
                                    <label htmlFor="username">{translate("NAV.USERNAME")}</label>
                                    <span className="p-input-icon-left w-full">
                                        <i className="pi pi-user" />
                                        <InputText id="username" className='w-full' aria-describedby="username-help" autoFocus />
                                    </span>
                                    {/* <small id="username-help">
                                    {translate("MSG.ENTER_YOUR_USERNAME")}
                                </small> */}
                                </div>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="password">{translate("NAV.PASSWORD")}</label>
                                    <span className="p-input-icon-left w-full">
                                        <i className="pi pi-unlock" />
                                        <InputText id="password" value={passwordValue} onChange={(e) => setPassword(e.target.value)} className='w-full' type="password" aria-describedby="password-help" />
                                    </span>
                                    {/* <small id="password-help">
                                    {translate("MSG.ENTER_YOUR_USERNAME")}
                                </small> */}
                                </div>
                            </div>
                            <div className='flex flex-row justify-content-between align-items-center mt-2 mb-4'>
                                <a href='#' className='p-0 no-underline focus:text-primary-500'>{translate("GLOBAL.FORGOT_PASSWORD")}</a>
                                <a href='#' onClick={signUp} className='p-0 text-600 focus:text-primary-500'>{translate("GLOBAL.CREATE_ACCOUNT")} </a>
                            </div>
                            <Button type="submit" className='w-full' label={translate("GLOBAL.SIGN_IN")} icon="pi pi-sign-in" loading={loading} />
                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default LoginPage