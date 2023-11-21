import React, { useState } from 'react'
import { BreadCrumb } from 'primereact/breadcrumb';
import { useTranslation } from 'react-i18next';
import { Button } from 'primereact/button';

function ItemCenter() {
    const [translate] = useTranslation("global")
    const home = { icon: 'pi pi-home', url: '/web/home' }
    const items = [
        { label: translate("NAV.ITEM") },
    ];

    const [loading, setLoading] = useState(false);

    const load = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };


    return (
        <>
            <div className="w-full h-full flex flex-col">
                <div className="w-full flex flex-row justify-content-between align-items-center border-bottom-1 border-200 overflow-hidden" style={{ height: "50px" }}>
                    <div className="w-full flex-1 h-full flex justify-content-start align-items-center">
                        <BreadCrumb model={items} home={home} className="text-md border-none border-noround w-full h-full" style={{ fontFamily: "KantumruyPro", backgroundColor: "transparent" }} />
                    </div>
                    <div className="h-full flex-1 flex flex-row justify-content-end align-items-center pr-2">
                        <div className="w-full flex justify-content-end align-items-center">
                            <Button label={translate("NAV.ADD")} icon="pi pi-save" className="px-3 py-2 mr-1" outlined loading={loading} onClick={load} />
                            <Button label={translate("NAV.EDIT")} icon="pi pi-pencil" severity="info" className="px-3 py-2 mr-1" outlined loading={loading} onClick={load} />
                            <Button label={translate("NAV.DELETE")} icon="pi pi-trash" severity="danger" className="px-3 py-2" outlined loading={loading} onClick={load} />
                        </div>
                    </div>
                </div>
                <div className="flex-1 w-full h-full bg-blue-700">
                    <div className="w-full h-full">
                        Khesfsf
                    </div>
                </div>
            </div>
        </>
    )
}

export default ItemCenter