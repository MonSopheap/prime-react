import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { confirmDialog } from 'primereact/confirmdialog';
import { useNavigate } from 'react-router-dom';
import { AppProps } from '../../commom/AppProps';
import UserService from '../../services/UserService';
import AnimationWrapper from '../../commom/PageAnimation';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

function LoginPage() {
    const [translate] = useTranslation("global");
    const [loading, setLoading] = useState(false);
    const [userName, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const toastMsgRef = useRef(null);
    const navigate = useNavigate();
    const userService = new UserService();
    const GOOGLE_CLIENT_ID = '329476046362-vda1m53o4u9efrn6uuk6pos9hvnfrmog.apps.googleusercontent.com';


    const showMessage = ({ message }) => {
        toastMsgRef.current.show({ severity: 'error', summary: translate("MSG.WARNING"), detail: message, life: 3500 });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await userService.login({ userName: userName, password: password }).then((res) => {
            console.log(`RESULT:`, res)

            setLoading(false);
            navigate("/home")
            console.log(res.data)
            localStorage.setItem(AppProps.ACCESS_TOKEN, res.accessToken);
            localStorage.setItem(AppProps.CURRENT_USER, JSON.stringify(res.data));
        }).catch((err) => {
            console.log(`ERROR: ${err}`)
            setLoading(false);
        });
    }

    return (

        <div className='w-full h-full overflow-hidden'>
            <Toast ref={toastMsgRef} position="top-center" />
            <div className='w-full h-full flex justify-content-center align-content-center'>
                <AnimationWrapper className="h-full w-full flex">
                    <div className='flex flex-column m-auto shadow-1 border-round-md' style={{ width: "330px", minWidth: "300px", minHeight: "300px", }}>
                        <div className='px-5 py-5'>

                            <form onSubmit={handleSubmit}>
                                <h1 className='flex p-0 m-0 text-2xl'>{translate("GLOBAL.WELCOME_BACK")}</h1>
                                <p className='p-0 mt-2'>{translate("GLOBAL.ENTER_YOUR_CREDENTIALS")}</p>
                                <div className='pt-2'>
                                    <div className="flex flex-column gap-2 mb-3">
                                        <label htmlFor="username">{translate("USER.USERNAME")}</label>
                                        <span className="p-input-icon-left w-full">
                                            <i className="pi pi-user" />
                                            <InputText id="username" value={userName} className='w-full' onChange={(e) => setUsername(e.target.value)} placeholder={translate("USER.ENTER_USERNAME")} aria-describedby="username-help" autoFocus />
                                        </span>
                                    </div>
                                    <div className="flex flex-column gap-2">
                                        <label htmlFor="password">{translate("USER.PASSWORD")}</label>
                                        <span className="p-input-icon-left w-full">
                                            <i className="pi pi-unlock" />
                                            <InputText id="password" value={password} onChange={(e) => setPassword(e.target.value)} className='w-full' type="password" placeholder={translate("USER.ENTER_PASSWORD")} aria-describedby="password-help" />
                                        </span>
                                    </div>
                                </div>
                                <div className='flex flex-row justify-content-between align-items-center mt-2 mb-4'>
                                    <a href='#' onClick={() => navigate("/")} className='p-0 no-underline focus:text-primary-500'>{translate("GLOBAL.FORGOT_PASSWORD")}</a>
                                    <a href='https://t.me/SopheapZz' target="_blank" className='p-0 text-600 focus:text-primary-500'>{translate("GLOBAL.CREATE_ACCOUNT")} </a>
                                </div>
                                <Button type="submit" className='w-full mb-2' label={translate("GLOBAL.SIGN_IN")} icon="pi pi-sign-in" loading={loading} />
                                <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                                    <GoogleLogin
                                        onSuccess={credentialResponse => {
                                            console.log(`*CredentialResponse`, credentialResponse);
                                        }}
                                        onError={() => {
                                            console.log('Login Failed');
                                        }}
                                    />
                                </GoogleOAuthProvider>
                            </form>
                        </div>
                    </div>
                </AnimationWrapper>
            </div>
        </div >
    )
}

export default LoginPage