import React, { useRef } from 'react'
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
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const [translate, i18n] = useTranslation("global");
    const op = useRef(null);
    const navigate = useNavigate()
    const items = [
        {
            label: translate("GLOBAL.DASHBOARD"),
            icon: 'pi pi-fw pi-th-large',
            command: () => navigate("/home"),
        },
        {
            label: 'Setting',
            icon: 'pi pi-fw pi-cog',
            // url: 'https://reactjs.org/'
        },
        // {
        //     label: 'Help',
        //     icon: 'pi pi-fw pi-question-circle',
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
        i18n.changeLanguage(lang)
    }
    const start = <img alt="logo" src={logo} height="35" className="mr-2"></img>;

    return (
        <>
            <div className="w-full flex flex-row align-items-center justify-content-center h-3rem bg-white shadow-1">
                <header className="w-full h-full">
                    <Menubar model={items} start={start} className="h-3rem px-3 bg-white border-none" style={{ fontFamily: "KantumruyPro" }} />
                </header>
                <div className="flex-1 flex flex-row align-items-center justify-content-center px-3 pl-3">
                    <div className="flex flex-row align-items-center justify-content-center cursor-pointer">
                        <img src={flagKh} height={'13px'} />
                        <div onClick={(e) => op.current.toggle(e)} className="w-full h-full flex flex-row ml-1 align-items-center justify-content-center">
                            <span style={{ fontFamily: 'KantumruyPro' }} className="select-none mr-1">ភាសាខ្មែរ</span>
                            <i className="pi pi-angle-down text-gray-500"></i>
                        </div>
                    </div>
                    <div onClick={() => navigate("/settings")} className="cursor-pointer p-1 bg-blue-50 hover:bg-blue-100 select-none border-circle ml-2 flex justify-content-center align-items-center" style={{ width: "40px", height: "40px" }}>
                        <i className="pi pi-cog p-overlay-badge text-900" style={{ fontSize: '18px' }}></i>
                    </div>
                    <div onClick={() => navigate("/notification")} className="cursor-pointer p-1 bg-blue-50 hover:bg-blue-100 select-none border-circle ml-1 flex justify-content-center align-items-center" style={{ width: "40px", height: "40px" }}>
                        <i className="pi pi-bell p-overlay-badge" style={{ fontSize: '18px' }}>
                            <Badge severity="danger" style={{ fontSize: "9px", minWidth: "15px", height: "15px", justifyContent: "center", alignItems: "center", alignContent: "center", display: "flex" }} value={1}></Badge>
                        </i>
                    </div>
                </div>
            </div>

            <OverlayPanel ref={op} className="shadow-2">
                <ul className="list-none text-left p-0 m-0" style={{ width: "150px", 'font-family': 'KantumruyPro' }}>
                    <li onClick={(e) => { op.current.hide(); handleChangeLanguage("kh") }} className="text-left p-2 px-2 cursor-pointer hover:bg-blue-100 border-round-sm">
                        <div className="flex flex-row align-items-center">
                            <img src={flagKh} height={'14px'} className="mr-2" />
                            <a href='#' className="no-underline flex text-sm">ភាសាខ្មែរ</a>
                        </div>
                    </li>
                    <li onClick={(e) => { op.current.hide(); handleChangeLanguage("en") }} className="text-left p-2 cursor-pointer hover:bg-blue-100 border-round-sm">
                        <div className="flex flex-row align-items-center">
                            <img src={flagEn} height={'14px'} className="mr-2" />
                            <a href='#' className="no-underline flex text-sm">English</a>
                        </div>
                    </li>
                </ul>
            </OverlayPanel>
        </>
    )
}

export default Navbar