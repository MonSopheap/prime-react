import React, { useContext, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';
import { Menubar } from 'primereact/menubar';
import { OverlayPanel } from 'primereact/overlaypanel';
import {
    flagKh,
    flagEn,
    logo1,
    avatar001,
} from "../assets/images";
import { Sidebar } from 'primereact/sidebar';
import { useNavigate } from 'react-router-dom';
import { Avatar } from 'primereact/avatar';
import { AppProps } from '../commom/AppProps';
import { UserContext } from '../contexts/UserContext';

function Navbar() {
    const [translate, i18n] = useTranslation("global");
    const op = useRef(null);
    const optProfile = useRef(null);
    const navigate = useNavigate()
    const [language, setLanguage] = useState({})
    const [visibleNofi, setVisibleNoti] = useState(false);
    const userContext = useContext(UserContext);
    useEffect(() => {
        const lang = JSON.parse(localStorage.getItem(AppProps.KEY_LANGUAGE));
        if (lang) storeLanguage(lang);
        else storeLanguage({ code: "kh", label: "ភាសាខ្មែរ", flag: flagKh });
    }, []);

    const [loading, setLoading] = useState(false);

    const languageList = [
        { id: 1, label: "ភាសាខ្មែរ", description: "ភាសាខ្មែរ (Cambodia)", code: "kh", flag: flagKh },
        { id: 2, label: "English", description: "English (United State)", code: "en", flag: flagEn },
    ];

    const items = [
        {
            label: translate("GLOBAL.DASHBOARD"),
            icon: 'pi pi-fw pi-th-large',
            command: () => navigate("/"),
        },

    ];

    const storeLanguage = (lang) => {
        localStorage.setItem(AppProps.KEY_LANGUAGE, JSON.stringify(lang));
        setLanguage(lang)
        i18n.changeLanguage(lang.code)
    }

    const handleChangeLanguage = (lang) => {
        storeLanguage(lang);
    }
    const start = <img alt="logo" onClick={() => navigate("/home")} src={logo1} height="35" className="mr-2 cursor-pointer"></img>;

    const handleLogout = () => {
        localStorage.removeItem(AppProps.ACCESS_TOKEN);
        localStorage.removeItem(AppProps.CURRENT_USER);
        navigate("auth/login");
    }

    const notificationList = [
        { id: 0, name: "What is Programming?", desc: "Our mission: to help people learn to code for free. We accomplish this by creating thousands of videos, articles, and interactive coding lessons - all freely available to the public.", createdDate: '27/05/2023' },
        { id: 0, name: "How to use .filter() and .includes() methods on JSON with multiple conditions (JS, React)?", desc: "My current code that does the filtering looks like:", createdDate: '27/05/2023' },
        { id: 0, name: "You can see that I also added", desc: "message if no user matches with what we write in the input, you can do it by just editing the part where the users are being rendered,", createdDate: '27/05/2023' },
        { id: 0, name: "Notification 003", desc: "Description Notification", createdDate: '27/05/2023' },
        { id: 0, name: "Notification 003", desc: "Description Notification", createdDate: '27/05/2023' },
        { id: 0, name: "Notification 003", desc: "Description Notification", createdDate: '27/05/2023' },
        { id: 0, name: "Notification 003", desc: "Description Notification", createdDate: '27/05/2023' },
        { id: 0, name: "Notification 003", desc: "Description Notification", createdDate: '27/05/2023' },
        { id: 0, name: "Notification 003", desc: "Description Notification", createdDate: '27/05/2023' },
        { id: 0, name: "Notification 003", desc: "Description Notification", createdDate: '27/05/2023' },
        { id: 0, name: "Notification 003", desc: "Description Notification", createdDate: '27/05/2023' },
        { id: 0, name: "Notification 003", desc: "Description Notification", createdDate: '27/05/2023' },
        { id: 0, name: "Notification 003", desc: "Description Notification", createdDate: '27/05/2023' },
        { id: 0, name: "Notification 003", desc: "Description Notification", createdDate: '27/05/2023' },
        { id: 0, name: "Notification 003", desc: "Description Notification", createdDate: '27/05/2023' },
        { id: 0, name: "Notification 003", desc: "Description Notification", createdDate: '27/05/2023' },
        { id: 0, name: "Notification 003", desc: "Description Notification", createdDate: '27/05/2023' },
        { id: 0, name: "Notification 003", desc: "Description Notification", createdDate: '27/05/2023' },
        { id: 0, name: "Notification 003", desc: "Description Notification", createdDate: '27/05/2023' },
    ];
    return (
        <>
            <div className="w-full flex flex-row align-items-center justify-content-center h-3rem bg-white shadow-1 z-2">
                <header className="flex w-full h-full">
                    <Menubar model={items} start={start} className="h-3rem px-3 bg-white border-none" />
                </header>
                <div className="flex-1 flex flex-row align-items-center justify-content-center px-3 pl-3">
                    <div className="flex flex-1 flex-row align-items-center justify-content-center cursor-pointer ml-2 mr-2">
                        <img src={language.flag} loading={"lazy"} height={'12px'} width={'20px'} className="mr-1" />
                        <div onClick={(e) => op.current.toggle(e)} className="w-full h-full flex flex-row align-items-center justify-content-center">
                            <div className="select-none mr-1 inline-block mr-1">{language.label}</div>
                            <i className="pi pi-angle-down text-gray-500"></i>
                        </div>
                    </div>
                    <Button icon="pi pi-question-circle" style={{ width: '38px', height: "38px" }} tooltip={translate("GLOBAL.HELP")} tooltipOptions={{ position: 'bottom', mouseTrack: true, mouseTrackTop: 15 }} className="ml-2 border bg-blue-50 border-primary-50 focus:border-primary-200" rounded outlined />
                    <Button onClick={() => { navigate("/setting") }} icon="pi pi-cog" style={{ width: '38px', height: "38px" }} tooltip={translate("GLOBAL.SETTING")} tooltipOptions={{ position: 'bottom', mouseTrack: true, mouseTrackTop: 15 }} className="ml-1 border bg-blue-50 border-primary-50 focus:border-primary-200" rounded outlined loading={loading} />
                    <Button onClick={() => setVisibleNoti(true)} className="p-1 border overflow-visible bg-blue-50 border-primary-50 focus:border-primary-200 ml-1 flex justify-content-center align-items-center" rounded outlined style={{ width: "40px", height: "40px" }}>
                        <i className="pi pi-bell p-overlay-badge text-primary" style={{ fontSize: '18px' }}>
                            <Badge severity="danger" style={{ fontSize: "9px", minWidth: "15px", height: "15px", justifyContent: "center", alignItems: "center", alignContent: "center", display: "flex" }} value={1}></Badge>
                        </i>
                    </Button>
                    <Avatar onClick={(e) => { optProfile.current.toggle(e); }} image={avatar001} className="ml-2 cursor-pointer border-primary-100 shadow-1" style={{ width: "38px", height: "38px", color: '#ffffff', }} shape="circle" />
                </div>
            </div>

            <OverlayPanel ref={op}>
                <ul className="list-none text-left p-0 m-0" style={{ width: "200px" }}>
                    {
                        languageList.map((item) => (
                            <li key={item?.id} onClick={(e) => { op.current.hide(); handleChangeLanguage({ code: item.code, label: item.label, flag: item.flag }) }} className="text-left p-2 px-2 cursor-pointer hover:bg-blue-100 border-round-sm">
                                <div className="flex flex-row align-items-center">
                                    <img src={item.flag} loading={"lazy"} height={'12px'} width={'20px'} className="mr-2" />
                                    <div className="no-underline select-none flex text-sm">{item.description}</div>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </OverlayPanel>

            <OverlayPanel ref={optProfile}>
                <ul className="list-none p-0 m-0" style={{ minWidth: "190px", width: "200px" }}>
                    <li onClick={(e) => { optProfile.current.hide() }} className="p-2 border-round-sm hover:bg-gray-100 hover:font-bold cursor-pointer">
                        <a href='#' className='block text-left text-800 no-underline font-bold flex align-items-center'>
                            <i className="pi pi-verified pr-2 text-green-500" style={{ color: '#708090' }}></i>
                            {userContext?.currentUser?.userName}
                        </a>
                    </li>
                    <li onClick={(e) => { optProfile.current.hide(); navigate("/profile") }} className="p-2 border-round-sm hover:bg-gray-100 cursor-pointer">
                        <a href='#' className='block text-left text-800 no-underline'>
                            <i className="pi pi-user pr-2" style={{ color: '#708090' }}></i>
                            {translate("GLOBAL.PROFILE")}
                        </a>
                    </li>
                    <li onClick={(e) => { optProfile.current.hide() }} className="p-2 border-round-sm hover:bg-gray-100 cursor-pointer">
                        <a href='https://react.dev/learn' target={"_blank"} className='block text-left text-800 no-underline'>
                            <i className="pi pi-question-circle pr-2" style={{ color: '#708090' }}></i>
                            {translate("GLOBAL.HELP")}
                        </a>
                    </li>
                    <li onClick={(e) => { optProfile.current.hide(); handleLogout() }} className="p-2 border-round-sm hover:bg-gray-100 cursor-pointer">
                        <a href='#' className='block text-left text-800 no-underline'>
                            <i className="pi pi-sign-out pr-2" style={{ color: '#708090' }}></i>
                            {translate("GLOBAL.SIGN_OUT")}
                        </a>
                    </li>
                </ul>
            </OverlayPanel>


            <Sidebar visible={visibleNofi} className="notification" position="right" onHide={() => setVisibleNoti(false)}>
                <div className='absolute font-bold text-md' style={{ top: "15px", left: "15px" }}>{translate("GLOBAL.NOTIFICATION")}</div>
                <div className='grid grid-nogutter'>
                    {
                        notificationList.map((item, index) => {
                            return (
                                <div key={index} class="col-12 p-0 border-bottom-1 border-gray-100 cursor-pointer hover:shadow-1 hover:bg-blue-50">
                                    <div className='flex flex-column p-2'>
                                        <div className='flex flex-row justify-content-start align-items-center'>
                                            <div style={{ width: "45px" }}>
                                                <Avatar label="P" shape="circle" />
                                            </div>
                                            <div className='flex flex-1 flex-column w-full'>
                                                <div className='text-sm font-bold'>{item?.name}</div>
                                                <div className='text-sm mb-1'>{item?.desc}</div>
                                                <div className='text-xs flex flex-row align-items-center'>
                                                    <i className="pi pi-stopwatch text-green-400" style={{ fontSize: '0.8rem' }}></i><span className='ml-1'>{item?.createdDate}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>)
                        })
                    }

                </div>
            </Sidebar>
        </>
    )
}

export default Navbar