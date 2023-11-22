import React, { useEffect, useRef, useState } from 'react'
import { BreadCrumb } from 'primereact/breadcrumb';
import { useTranslation } from 'react-i18next';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from "primereact/inputtext";
import { AutoComplete } from "primereact/autocomplete";
import { InputTextarea } from "primereact/inputtextarea";
import { TabView, TabPanel } from 'primereact/tabview';

function ItemCenter() {
    const [translate] = useTranslation("global")
    const home = { icon: 'pi pi-home', url: '/web/home' }
    const items = [
        { label: translate("NAV.ITEM") },
    ];
    const [value, setValue] = useState('');
    const [memo, setMemo] = useState('');
    const [itemGroups, setItemGroups] = useState([]);
    const search = (event) => {
        let _items = [...Array(10).keys()];
        setItemGroups(event.query ? [...Array(10).keys()].map(item => event.query + '-' + item) : _items);
    }
    const data = [
        { label: "abc1", value: "1" },
        { label: "abc2", value: "2" },
        { label: "abc3", value: "3" }
    ];

    const [loading, setLoading] = useState(false);

    const load = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 1500);
    };

    const [visible, setVisible] = useState(false);
    const footerContent = (
        <div>
            <Button label={translate("NAV.SAVE")} icon="pi pi-save" className="mr-1" onClick={() => setVisible(false)} />
            <Button label={translate("NAV.CANCEL")} icon="pi pi-times" onClick={() => setVisible(false)} className="border-primary-100" />
        </div>
    );

    useEffect(() => {
        setItemGroups(data)
    }, [])

    return (

        <>
            <div className="w-full h-full flex flex-column">
                <div className="w-full flex flex-row justify-content-between align-items-center border-bottom-1 border-200 overflow-hidden" style={{ height: "50px" }}>
                    <div className="w-full flex-1 h-full flex justify-content-start align-items-center">
                        <BreadCrumb model={items} home={home} className="text-md border-none border-noround w-full h-full" style={{ fontFamily: "KantumruyPro", backgroundColor: "transparent" }} />
                    </div>
                    <div className="h-full flex-1 flex flex-row justify-content-end align-items-center pr-2">
                        <div className="w-full flex justify-content-end align-items-center">
                            <Button onClick={() => setVisible(true)} icon="pi pi-plus" style={{ width: '38px', height: "38px" }} className="mr-1 border border-primary-100 focus:border-primary" rounded size="small" outlined loading={loading} />
                            {/* <Button label={translate("NAV.ADD")} icon="pi pi-save" className="px-3 py-2 mr-1" outlined loading={loading} onClick={load} />
                            <Button label={translate("NAV.EDIT")} icon="pi pi-pencil" severity="info" className="px-3 py-2 mr-1" outlined loading={loading} onClick={load} />
                            <Button label={translate("NAV.DELETE")} icon="pi pi-trash" severity="danger" className="px-3 py-2" outlined loading={loading} onClick={load} /> */}
                        </div>
                    </div>
                </div>
                <div className="flex-1 w-full h-full">
                    <div className="w-full h-full">

                    </div>
                </div>
            </div>

            <Dialog header={translate("NAV.ADD_ITEM")} className="text-sm" visible={visible} style={{ width: '75%', maxHeight: "80%", height: "80%" }} onHide={() => setVisible(false)} footer={footerContent}>
                <div className="w-full h-full p-1">
                    <div className="w-full h-full justify-content-center align-items-center">
                        <div className="w-full">
                            <div className="grid">
                                <div className="col-12 sm:col-12 md:col-5 lg:col-5 xl:col-5 pb-0">
                                    <div className="grid align-items-center">
                                        <div className="col-12 sm:col-12 md:col-5 lg:col-5 xl:col-5">
                                            <label className="text-base">{translate("ITEM.CODE")}</label>
                                        </div>
                                        <div className="col-12 sm:col-12 md:col-7 lg:col-7 xl:col-7">
                                            <InputText value={''} className="w-full" onChange={(e) => { }} autoFocus />
                                        </div>
                                    </div>
                                    <div className="grid align-items-center">
                                        <div className="col-12 sm:col-12 md:col-5 lg:col-5 xl:col-5">
                                            <label className="text-base">{translate("ITEM.NAME")}</label>
                                        </div>
                                        <div className="col-12 sm:col-12 md:col-7 lg:col-7 xl:col-7">
                                            <InputText value={null} className="w-full" onChange={(e) => { }} />
                                        </div>
                                    </div>
                                    <div className="grid align-items-center">
                                        <div className="col-12 sm:col-12 md:col-5 lg:col-5 xl:col-5">
                                            <label className="text-base">{translate("ITEM.LOCAL_NAME")}</label>
                                        </div>
                                        <div className="col-12 sm:col-12 md:col-7 lg:col-7 xl:col-7">
                                            <InputText value={''} className="w-full" onChange={(e) => { }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 sm:col-12 md:col-4 lg:col-4 xl:col-4 pb-0">
                                    <div className="grid align-items-center">
                                        <div className="col-12 sm:col-12 md:col-5 lg:col-5 xl:col-5">
                                            <label className="text-base">{translate("NAV.ITEM_GROUP")}</label>
                                        </div>
                                        <div className="col-12 sm:col-12 md:col-7 lg:col-7 xl:col-7">
                                            <AutoComplete className="w-full" value={value} suggestions={itemGroups} completeMethod={search} onChange={(e) => setValue(e.value)} dropdown />
                                        </div>
                                    </div>
                                    <div className="grid align-items-center">
                                        <div className="col-12 sm:col-12 md:col-5 lg:col-5 xl:col-5">
                                            <label className="text-base">{translate("NAV.MEMO")}</label>
                                        </div>
                                        <div className="col-12 sm:col-12 md:col-7 lg:col-7 xl:col-7">
                                            <InputTextarea className="w-full h-full" rows={4} cols={30} value={memo} onChange={(e) => setMemo(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 sm:col-12 md:col-3 lg:col-3 xl:col-3">
                                    <div className="grid">
                                        <div className="col-12 flex align-items-center justify-content-center">
                                            <img className="h-7rem border-round-md cursor-pointer" src="https://getuikit.com/v2/docs/images/placeholder_600x400.svg" />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="flex-1 w-full h-full">
                            <TabView>
                                <TabPanel header={translate("NAV.GENERAL_INFO")}>
                                    <p className="m-0">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                    </p>
                                    <p className="m-0">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                    </p>
                                    <p className="m-0">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                    </p>
                                    <p className="m-0">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                    </p>
                                </TabPanel>
                                <TabPanel header={translate("NAV.STOCK_INFO")}>
                                    <p className="m-0">
                                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
                                        eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo
                                        enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui
                                        ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
                                    </p>
                                </TabPanel>
                            </TabView>
                        </div>
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default ItemCenter