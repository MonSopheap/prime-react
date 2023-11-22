import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';
import { Menubar } from 'primereact/menubar';
import { OverlayPanel } from 'primereact/overlaypanel';
import {
    flagKh,
    flagEn,
    logo
} from "../assets/images";
import { Link, useNavigate } from 'react-router-dom';
import { Avatar } from 'primereact/avatar';

function Navbar() {
    const [translate, i18n] = useTranslation("global");
    const op = useRef(null);
    const navigate = useNavigate()
    const [language, setLanguage] = useState({})
    useEffect(() => {
        const lang = JSON.parse(localStorage.getItem("__lang__"));
        if (lang) setLanguage(lang);
        else setLanguage({ id: "kh", name: "ភាសាខ្មែរ", flag: flagKh });

        console.log(lang)
    }, []);

    const [loading, setLoading] = useState(false);

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
            command: () => navigate("/home"),
        },
        {
            label: translate("NAV.ITEM"),
            icon: 'pi pi-fw pi-box',
            command: () => navigate("/item-center"),
        },
        {
            label: translate("NAV.REPORT"),
            icon: 'pi pi-fw pi-book',
            command: () => navigate("/report"),
        },
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
        i18n.changeLanguage(lang.id)
    }
    const start = <img alt="logo" onClick={() => navigate("/home")} src={logo} height="35" className="mr-2 cursor-pointer"></img>;

    return (
        <>
            <div className="w-full flex flex-row align-items-center justify-content-center h-3rem bg-white shadow-1">
                <header className="w-full h-full">
                    <Menubar model={items} start={start} className="h-3rem px-3 bg-white border-none" style={{ fontFamily: "KantumruyPro" }} />
                </header>
                <div className="flex-1 flex flex-row align-items-center justify-content-center px-3 pl-3">
                    <div className="flex flex-row align-items-center justify-content-center cursor-pointer">
                        <img src={language.flag} loading={"lazy"} height={'13px'} />
                        <div onClick={(e) => op.current.toggle(e)} className="w-full h-full flex flex-row ml-1 align-items-center justify-content-center">
                            <span style={{ fontFamily: 'KantumruyPro' }} className="select-none mr-1">{language.name}</span>
                            <i className="pi pi-angle-down text-gray-500"></i>
                        </div>
                    </div>
                    <Link target={"_blank"} to="https://react.dev/learn">
                        <Button icon="pi pi-question-circle" style={{ width: '38px', height: "38px" }} tooltip={translate("GLOBAL.HELP")} tooltipOptions={{ position: 'bottom', mouseTrack: true, mouseTrackTop: 15 }} className="ml-2 border bg-blue-50 border-primary-50 focus:border-primary-500" rounded outlined />
                    </Link>
                    <Button onClick={() => { navigate("/settings") }} icon="pi pi-cog" style={{ width: '38px', height: "38px" }} tooltip={translate("GLOBAL.SETTING")} tooltipOptions={{ position: 'bottom', mouseTrack: true, mouseTrackTop: 15 }} className="ml-1 border bg-blue-50 border-primary-50 focus:border-primary-500" rounded outlined loading={loading} />
                    <Button onClick={() => navigate("/notification")} className="p-1 border bg-blue-50 border-primary-50 focus:border-primary-500 ml-1 flex justify-content-center align-items-center" rounded outlined style={{ width: "40px", height: "40px" }}>
                        <i className="pi pi-bell p-overlay-badge text-primary" style={{ fontSize: '18px' }}>
                            <Badge severity="danger" style={{ fontSize: "9px", minWidth: "15px", height: "15px", justifyContent: "center", alignItems: "center", alignContent: "center", display: "flex" }} value={1}></Badge>
                        </i>
                    </Button>
                    <Avatar onClick={() => { navigate("/profile") }} image="https://southasia.macmillan.yale.edu/sites/default/files/puttpunyagupta.jpeg" className="ml-1 cursor-pointer" style={{ backgroundColor: '#2196F3', color: '#ffffff' }} shape="circle" />
                </div>
            </div>

            <OverlayPanel ref={op} className="shadow-2">
                <ul className="list-none text-left p-0 m-0" style={{ width: "150px", fontFamily: 'KantumruyPro' }}>
                    <li onClick={(e) => { op.current.hide(); handleChangeLanguage({ id: "kh", name: "ភាសាខ្មែរ", flag: flagKh }) }} className="text-left p-2 px-2 cursor-pointer hover:bg-blue-100 border-round-sm">
                        <div className="flex flex-row align-items-center">
                            <img src={flagKh} loading={"lazy"} height={'14px'} className="mr-2" />
                            <a href='#' className="no-underline flex text-sm">ភាសាខ្មែរ</a>
                        </div>
                    </li>
                    <li onClick={(e) => { op.current.hide(); handleChangeLanguage({ id: "en", name: "English", flag: flagEn }) }} className="text-left p-2 cursor-pointer hover:bg-blue-100 border-round-sm">
                        <div className="flex flex-row align-items-center">
                            <img src={flagEn} loading={"lazy"} height={'14px'} className="mr-2" />
                            <a href='#' className="no-underline flex text-sm">English</a>
                        </div>
                    </li>
                </ul>
            </OverlayPanel>
        </>
    )
}

export default Navbar