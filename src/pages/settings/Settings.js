import React from 'react'
import { useTranslation } from 'react-i18next';
import { BreadCrumb } from 'primereact/breadcrumb';

function Settings() {
    const [translate] = useTranslation("global")
    const home = { icon: 'pi pi-home', url: '/home' }
    const items = [
        { label: translate("GLOBAL.SETTING") },
    ];
    const menuList = [
        { icon: "pi pi-wrench", name: translate("GLOBAL.SETTING"), link: "" },
        { icon: "pi pi-code", name: translate("GLOBAL.DEVELOPER"), link: "" },
        { icon: "pi pi-question-circle", name: translate("GLOBAL.HELP"), link: "" },
    ]
    return (
        <>
            <div className="w-full h-full">
                <div className="w-full h-full flex flex-column">
                    <div className="w-full flex flex-row justify-content-between align-items-center border-bottom-1 border-200 overflow-hidden" style={{ height: "50px" }}>
                        <div className="w-full flex-1 h-full flex justify-content-start align-items-center">
                            <BreadCrumb model={items} home={home} className="text-md border-none border-noround w-full h-full" style={{ fontFamily: "KantumruyPro", backgroundColor: "transparent" }} />
                        </div>
                        <div className="h-full flex-1 flex flex-row justify-content-end align-items-center">
                            <div className="pr-3">

                            </div>
                        </div>
                    </div>
                    <div className="flex-1 w-full h-full overflow-auto">
                        <div className="w-full h-full">

                            <div className='w-full h-full flex flex-row align-content-center'>
                                {/* background: "#e8f0fe" */}
                                <div className='h-full border-right-1 border-primary-100 overflow-auto' style={{ width: "250px", }}>
                                    <div className='w-full h-full'>
                                        <div className='py-1 px-2'>
                                            <ul className='list-none p-0 m-0'>
                                                {
                                                    menuList.map((item, index) => (
                                                        <li key={index} className=' border-round-sm my-1 hover:bg-primary-100 cursor-pointer' style={{ padding: "10px 10px", }}>
                                                            <a href='#' className='block text-left text-800 no-underline'>
                                                                <i className={`${item.icon} pr-2`} style={{ color: '#708090' }}></i>
                                                                {item.name}
                                                            </a>
                                                        </li>
                                                    ))
                                                }

                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-full h-full flex-1 bg-primary-50'></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Settings