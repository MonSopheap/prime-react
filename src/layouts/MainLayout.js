import React, { useRef } from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { useNavigate } from 'react-router-dom';
import { OverlayPanel } from 'primereact/overlaypanel';


import {
    flagKh,
    flagEn,
    logo
} from "../assets/images"

function MainLayout({ children }) {
    const navigate = useNavigate()
    const op = useRef(null);

    const items = [
        {
            label: 'Dashboard',
            icon: 'pi pi-fw pi-th-large',
            command: () => navigate("/home")
        },
        // {
        //     label: 'Setting',
        //     icon: 'pi pi-fw pi-cog',
        //     command: () => navigate("/setting")
        // },
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

    const start = <img alt="logo" src={logo} height="35" className="mr-2"></img>;
    const end = <InputText placeholder="Search" type="text" className="w-full" />;

    const languageOptions = [
        {
            id: "en",
            name: "ភាសាខ្មែរ",
            flagimg: flagKh,
        },
        {
            id: "it",
            name: "English",
            flagimg: flagKh,
        },
    ];

    return (
        <>
            <main className="h-screen w-screen">
                <div className="h-full flex flex-column align-items-center justify-content-center">
                    <div className="w-full flex flex-row align-items-center justify-content-center h-3rem bg-blue-100">
                        <header className="w-full h-full">
                            <Menubar model={items} start={start} className="h-3rem px-3" />
                        </header>
                        <div className="flex-1 align-items-center justify-content-center px-3">
                            <div className="flex flex-row align-items-center justify-content-center cursor-pointer">
                                <img src={flagKh} width={'25px'} />
                                <div onClick={(e) => op.current.toggle(e)} className="flex flex-row flex-row ml-2 align-items-center justify-content-center">
                                    <span style={{ 'font-family': 'Kantumruy Pro' }} className="mr-1 select-none">ភាសាខ្មែរ</span>
                                    <i className="pi pi-angle-down"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="h-full flex-1 overflow-y-auto">
                        {children}
                    </div>

                </div>


                <OverlayPanel ref={op}>
                    <ul className="list-none text-left p-0 m-0" style={{ width: "150px", 'font-family': 'Kantumruy Pro' }}>
                        <li onClick={(e) => op.current.hide()} className="text-left p-2 px-2 cursor-pointer hover:bg-blue-100 border-round-sm">
                            <div className="flex flex-row">
                                <img src={flagKh} height={'16px'} className="mr-2" />
                                <a href='#' className="no-underline flex">ភាសាខ្មែរ</a>
                            </div>
                        </li>
                        <li onClick={(e) => op.current.hide()} className="text-left p-2 cursor-pointer hover:bg-blue-100 border-round-sm">
                            <div className="flex flex-row">
                                <img src={flagEn} height={'16px'} className="mr-2" />
                                <a href='#' className="no-underline flex">English</a>
                            </div>
                        </li>

                    </ul>
                </OverlayPanel>
            </main>
        </>
    )
}

export default MainLayout