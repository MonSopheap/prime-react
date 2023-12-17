import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';
import { Menubar } from 'primereact/menubar';
import { OverlayPanel } from 'primereact/overlaypanel';
import {
    flagKh,
    flagEn,
    logo,
    logo1,
    avatar001,
} from "../assets/images";
import { useNavigate } from 'react-router-dom';
import { Avatar } from 'primereact/avatar';

function Navbar() {
    const [translate, i18n] = useTranslation("global");
    const op = useRef(null);
    const optProfile = useRef(null);
    const navigate = useNavigate()
    const [language, setLanguage] = useState({})
    useEffect(() => {
        const lang = JSON.parse(localStorage.getItem("__lang__"));
        if (lang) setLanguage(lang);
        else setLanguage({ code: "kh", label: "ភាសាខ្មែរ", flag: flagKh });
    }, []);

    const [loading, setLoading] = useState(false);

    const languageList = [
        { id: 1, label: "ភាសាខ្មែរ", description: "ភាសាខ្មែរ (Cambodia)", code: "kh", flag: flagKh },
        { id: 2, label: "English", description: "English (United State)", code: "en", flag: flagEn },
    ]

    const load = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 1500);
    };

    const items = [
        {
            label: translate("GLOBAL.DASHBOARD"),
            icon: 'pi pi-fw pi-th-large',
            command: () => navigate("/"),
        },
        // {
        //     label: translate("NAV.ITEM"),
        //     icon: 'pi pi-fw pi-box',
        //     command: () => navigate("/item-center"),
        // },
        // {
        //     label: translate("NAV.REPORT"),
        //     icon: 'pi pi-fw pi-book',
        //     items: [
        //         {
        //             label: translate("REPORT.STOCK_REPORT"),
        //             icon: 'pi pi-fw pi-chart-bar',
        //             items: [
        //                 {
        //                     label: translate("REPORT.STOCK_VALUATION"),
        //                     command: () => navigate("/report"),
        //                 },
        //                 {
        //                     label: translate("REPORT.STOCK_WORK_SHEET"),
        //                     command: () => navigate("/report"),
        //                 },
        //                 {
        //                     label: translate("REPORT.REORDER_LIST"),
        //                     command: () => navigate("/report"),
        //                 }
        //             ]
        //         },
        //         {
        //             label: translate("REPORT.ACTIVITY_LOG"),
        //             icon: 'pi pi-fw pi-stopwatch',
        //             command: () => navigate("/report/activity-log"),

        //         },
        //     ]
        // },
        // {
        //     label: 'Help',
        //     icon: 'pi pi-fw pi-question-circle',
        //     url: 'https://reactjs.org/'
        // },
        // {
        //     label: 'Events',
        //     icon: 'pi pi-fw pi-calendar',
        //     items: [
        //         {
        //             label: 'Edit',
        //             icon: 'pi pi-fw pi-pencil',
        //             items: [
        //                 {
        //                     label: 'Save',
        //                     icon: 'pi pi-fw pi-calendar-plus'
        //                 },
        //                 {
        //                     label: 'Delete',
        //                     icon: 'pi pi-fw pi-calendar-minus'
        //                 }
        //             ]
        //         },
        //         {
        //             label: 'Archive',
        //             icon: 'pi pi-fw pi-calendar-times',
        //             items: [
        //                 {
        //                     label: 'Remove',
        //                     icon: 'pi pi-fw pi-calendar-minus'
        //                 }
        //             ]
        //         }
        //     ],
        // },
    ];

    const handleChangeLanguage = (lang) => {
        localStorage.setItem("__lang__", JSON.stringify(lang));
        setLanguage(lang)
        i18n.changeLanguage(lang.code)
    }
    const start = <img alt="logo" onClick={() => navigate("/home")} src={logo1} height="35" className="mr-2 cursor-pointer"></img>;

    const handleLogout = () => {
        localStorage.clear();
        navigate("auth/login");
    }
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
                    {/* <Link target={"_blank"} to="https://react.dev/learn">
                        <Button icon="pi pi-question-circle" style={{ width: '38px', height: "38px" }} tooltip={translate("GLOBAL.HELP")} tooltipOptions={{ position: 'bottom', mouseTrack: true, mouseTrackTop: 15 }} className="ml-2 border bg-blue-50 border-primary-50 focus:border-primary-500" rounded outlined />
                    </Link> */}
                    <Button onClick={() => { navigate("/setting") }} icon="pi pi-cog" style={{ width: '38px', height: "38px" }} tooltip={translate("GLOBAL.SETTING")} tooltipOptions={{ position: 'bottom', mouseTrack: true, mouseTrackTop: 15 }} className="ml-1 border bg-blue-50 border-primary-50 focus:border-primary-200" rounded outlined loading={loading} />
                    <Button onClick={() => navigate("/notification")} className="p-1 border overflow-visible bg-blue-50 border-primary-50 focus:border-primary-200 ml-1 flex justify-content-center align-items-center" rounded outlined style={{ width: "40px", height: "40px" }}>
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
                        <a href='#' className='block text-left text-800 no-underline'>
                            <i className="pi pi-at pr-2 text-primary" style={{ color: '#708090' }}></i>
                            info@gmail.com
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
        </>
    )
}

export default Navbar