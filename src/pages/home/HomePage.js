import React, { useRef } from 'react'
import { PanelMenu } from 'primereact/panelmenu';
import { useTranslation } from 'react-i18next';
import "./HomeStyle.css";
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Toast } from 'primereact/toast';

function HomePage() {
    const [translate] = useTranslation("global")
    const navigate = useNavigate()
    const { pathname } = useLocation();
    const toastMsgRef = useRef(null);

    const showMessage = () => {
        toastMsgRef.current.show({ severity: 'error', summary: translate("MSG.WARNING"), detail: "Message detail", life: 3500 });
    };

    const isExpandedMenu = (route) => {
        return route.find((x) => x === pathname);
    }
    const isActiveClass = (route) => {
        if (route === pathname) return "bg-gray-300";
    }

    const menuItems = [
        {
            icon: 'pi pi-fw pi-qrcode',
            label: translate("GLOBAL.DASHBOARD"),
            visible: true,
            command: () => { navigate('/home/dashboard') }
        },
        {
            icon: 'pi pi-fw pi-github',
            label: "Dev",
            disabled: false,
            command: () => {
                navigate('/home/android')
                console.log('/home/android')
            },
            className: isActiveClass("/home/developer"),
        },
        {
            icon: 'pi pi-fw pi-android',
            label: "Android",
            command: () => { navigate('/home/android') }
        },
        {
            label: 'Menu',
            items: [
                {
                    label: translate("NAV.USER"),
                    icon: 'pi pi-fw pi-user',
                    command: () => { navigate('/home/user') },
                    className: isActiveClass("/home/user"),
                },
                {
                    label: 'Submenu 1',
                    icon: 'pi pi-fw pi-align-left',
                    command: () => { navigate('/home/submenu1') },
                    className: isActiveClass("/home/submenu1"),
                },
                {
                    label: 'Submenu 2',
                    icon: 'pi pi-fw pi-align-right',
                    command: () => { navigate('/home/submenu2') },
                    className: isActiveClass("/home/submenu2")
                },
                {
                    label: 'Submenu 3',
                    icon: 'pi pi-fw pi-align-center',
                    command: () => { navigate('/home/submenu3') },
                    className: isActiveClass("/home/submenu3")
                },
                {
                    label: 'Submenu 4',
                    icon: 'pi pi-fw pi-align-justify',
                    command: () => { navigate('/home/submenu4') },
                    className: isActiveClass("/home/submenu4")
                }
            ],
            expanded: isExpandedMenu([
                "/home/user",
                "/home/submenu1",
                "/home/submenu2",
                "/home/submenu3",
                "/home/submenu4",
            ])
        },
        {
            label: 'Users',
            expanded: isExpandedMenu([
                "/home/developer",
            ]),
            items: [
                {
                    label: 'New',
                    icon: 'pi pi-fw pi-user-plus',
                    command: () => { navigate('/home/developer') },
                    className: isActiveClass("/home/developer"),
                },
                {
                    label: 'Delete',
                    icon: 'pi pi-fw pi-user-minus'
                },
                {
                    label: 'Search',
                    icon: 'pi pi-fw pi-users',
                    items: [
                        {
                            label: 'Filter',
                            icon: 'pi pi-fw pi-filter',
                            items: [
                                {
                                    label: 'Print',
                                    icon: 'pi pi-fw pi-print'
                                }
                            ]
                        },
                        {
                            icon: 'pi pi-fw pi-bars',
                            label: 'List'
                        }
                    ]
                },
                {
                    label: 'New',
                    icon: 'pi pi-fw pi-user-plus'
                },
                {
                    label: 'Delete',
                    icon: 'pi pi-fw pi-user-minus'
                },
                {
                    label: 'Search',
                    icon: 'pi pi-fw pi-users',
                    items: [
                        {
                            label: 'Filter',
                            icon: 'pi pi-fw pi-filter',
                            items: [
                                {
                                    label: 'Print',
                                    icon: 'pi pi-fw pi-print'
                                }
                            ]
                        },
                        {
                            icon: 'pi pi-fw pi-bars',
                            label: 'List'
                        }
                    ]
                },
                {
                    label: 'New',
                    icon: 'pi pi-fw pi-user-plus'
                },
                {
                    label: 'Delete',
                    icon: 'pi pi-fw pi-user-minus'
                },
                {
                    label: 'Search',
                    icon: 'pi pi-fw pi-users',
                    items: [
                        {
                            label: 'Filter',
                            icon: 'pi pi-fw pi-filter',
                            items: [
                                {
                                    label: 'Print',
                                    icon: 'pi pi-fw pi-print'
                                }
                            ]
                        },
                        {
                            icon: 'pi pi-fw pi-bars',
                            label: 'List'
                        }
                    ]
                },
                {
                    label: 'New',
                    icon: 'pi pi-fw pi-user-plus'
                },
                {
                    label: 'Delete',
                    icon: 'pi pi-fw pi-user-minus'
                },
                {
                    label: 'Search',
                    icon: 'pi pi-fw pi-users',
                    items: [
                        {
                            label: 'Filter',
                            icon: 'pi pi-fw pi-filter',
                            items: [
                                {
                                    label: 'Print',
                                    icon: 'pi pi-fw pi-print'
                                }
                            ]
                        },
                        {
                            icon: 'pi pi-fw pi-bars',
                            label: 'List'
                        }
                    ]
                },
                {
                    label: 'New',
                    icon: 'pi pi-fw pi-user-plus'
                },
                {
                    label: 'Delete',
                    icon: 'pi pi-fw pi-user-minus'
                },
                {
                    label: 'Search',
                    icon: 'pi pi-fw pi-users',
                    items: [
                        {
                            label: 'Filter',
                            icon: 'pi pi-fw pi-filter',
                            items: [
                                {
                                    label: 'Print',
                                    icon: 'pi pi-fw pi-print'
                                }
                            ]
                        },
                        {
                            icon: 'pi pi-fw pi-bars',
                            label: 'List'
                        }
                    ]
                }
            ]
        },
    ];


    return (
        <>
            <div className="w-full h-full z-1">
                <Toast ref={toastMsgRef} position="top-center" />
                <div className="w-full h-full flex flex-column">
                    <div className="flex flex-row w-full h-full overflow-auto">
                        <div className='flex bg-white shadow-2 h-full' style={{ width: "250px" }}>
                            <div className='flex flex-column h-full w-full'>
                                <div className='flex-1 w-full h-full overflow-auto'>
                                    <div className='h-full w-full'>
                                        <PanelMenu model={menuItems} className="w-full"
                                            pt={{
                                                headerAction: ({ context }) => ({ className: context.active ? 'bg-gray-300' : undefined }),
                                                action: ({ context }) => ({ className: context.active ? 'bg-gray-200' : undefined }),
                                            }} />
                                    </div>
                                </div>
                                <div className='flex w-full border-top-1 border-gray-200' style={{ height: "50px" }}>
                                    <div className='p-3 font-bold'>Version 1.0.0</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-1 w-full h-full overflow-auto">
                            <div className='w-full h-full'>
                                {<Outlet />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage