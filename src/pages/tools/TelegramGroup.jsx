import { BreadCrumb } from 'primereact/breadcrumb'
import { Button } from 'primereact/button'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from 'primereact/skeleton';
import { InputText } from 'primereact/inputtext';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Dialog } from 'primereact/dialog';
import { Checkbox } from 'primereact/checkbox';
import { Toast } from 'primereact/toast';
import TelegramGroupService from '../../services/TelegramGroupService';
import { Tag } from 'primereact/tag';

function TelegramGroup() {
    const [translate] = useTranslation("global");
    const navigate = useNavigate();
    // Data variable
    const telegramGroupService = new TelegramGroupService();
    const [groupList, setGroupList] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [searchValue, setSearch] = useState('');
    const [visible, setVisible] = useState(false);
    const [header, setHeader] = useState('');
    const [checked, setChecked] = useState(true);
    const [isSaving, setSaving] = useState(false);

    const [telegramGroup, setTelegramGroup] = useState({
        groupChatName: "",
        groupChatId: "",
        apiKey: "",
        isActive: checked,
    });
    const [msg, setMsg] = useState("")
    const toast = useRef(null);

    // BreadCrumb
    const home = { icon: 'pi pi-home', command: () => navigate("/home"), }
    const items = [
        { label: translate("NAV.TELEGRAM_GROUP") },
    ];

    const fetchData = async () => {
        setLoading(true)
        await telegramGroupService.getList().then((res) => {
            setGroupList(res?.data);
        }).catch((err) => {
            setError(err);
        }).finally(() => {
            setTimeout(() => {
                setLoading(false)
            }, 1000)
        })
    }

    const clearForm = () => {
        setTelegramGroup({
            groupChatName: "",
            groupChatId: "",
            apiKey: "",
            isActive: checked,
        });
    }

    useEffect(() => {
        fetchData();
    }, [])

    const onDelete = async (obj) => {
        await telegramGroupService.delete(obj?.id).then((res) => {
            if (res.status) {
                fetchData();
                toast.current.show({ severity: 'success', summary: translate("MSG.SUCCESS"), detail: translate("MSG.DELETED_SUCCESSFULLY"), life: 3000 });
            }
        }).catch((error) => {
            console.log(error)
            toast.current.show({ severity: 'error', summary: translate("MSG.INFORMATION"), detail: error.message, life: 2500 });
        });
    }

    const handleDelete = (item) => {
        confirmDialog({
            message: translate("MSG.DO_YOU_WANT_TO_DELETE") + ` (${item?.groupChatName})`,
            header: translate("MSG.DELETE_CONFIRMATION"),
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            style: { minWidth: '25rem', maxWidth: '25rem' },
            draggable: false,
            rejectLabel: translate("NAV.NO"),
            acceptLabel: translate("NAV.YES"),
            accept: () => onDelete(item),
        });
    }

    const handleChange = (e) => {
        const value = e.target.value;
        setTelegramGroup({ ...telegramGroup, [e.target.name]: value })
    }

    const handleAdd = () => {
        setHeader(translate("NAV.ADD_NEW"))
        setChecked(true);
        setVisible(true);
    }
    const handleEdit = (item) => {
        setHeader(translate("NAV.EDIT"))
        setVisible(true)
    }
    const handleSendMessage = (item) => {
        setHeader(translate("NAV.SEND") + " " + translate("NAV.TELEGRAM"))
        setVisible(true)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        // alert(`Message alert`);
        telegramGroup.isActive = checked;
        console.log(telegramGroup);
        setSaving(true);
        await telegramGroupService.save(telegramGroup).then((res) => {
            setVisible(false);
            setSaving(false);
            clearForm();
            fetchData();
        }).catch((error) => {
            setSaving(false);
            console.log(error);
        });
    }

    return (
        <>
            <Toast ref={toast} position="top-center" />
            <ConfirmDialog />
            <div className="w-full h-full">
                <div className="w-full h-full flex flex-column">
                    <div className="w-full flex flex-row justify-content-between align-items-center border-bottom-1 border-200 overflow-hidden" style={{ height: "50px" }}>
                        <div className="w-full flex-1 h-full flex justify-content-start align-items-center">
                            <div className='ml-2 block md:hidden lg:hidden xl:hidden'>
                                <Button icon="pi pi-align-left" size="small" outlined rounded />
                            </div>
                            <div className='w-full flex flex-1 flex-nowrap'>
                                <BreadCrumb model={items} home={home} className="text-md border-none border-noround h-full" style={{ backgroundColor: "transparent" }} />
                            </div>
                            <div className='pl-2 w-full flex-row'>
                                <span className="p-input-icon-left w-full">
                                    <i className="pi pi-search" />
                                    <InputText placeholder={translate("GLOBAL.SEARCH")} value={searchValue} onChange={(e) => setSearch(e.target.value)} className="w-full" />
                                </span>
                            </div>
                        </div>
                        <div className="h-full flex-1 flex flex-row justify-content-end align-items-center">
                            <div className="pr-3 w-full flex flex-row justify-content-end align-items-center">
                                <Button onClick={() => handleAdd()} label={translate("NAV.ADD")} icon="pi pi-plus-circle" className="px-3 py-2 mr-1" outlined loading={false} />
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 w-full h-full overflow-auto">
                        <div className="w-full h-full p-3">
                            {
                                <div className="grid">
                                    {
                                        isLoading ? [...Array(12)].map((item, index) => (
                                            <div key={index} className="col-12 sm:col-12 md:col-6 lg:col-4 xl:col-3">
                                                <div className="text-center border-round-sm bg-blue-50 w">
                                                    <div className='flex flex-row h-full w-full p-1 align-items-center justify-content-start overflow-hidden'>
                                                        <div className='flex-1 flex flex-column w-full p-2 justify-content-start align-items-start text-left'>
                                                            <Skeleton className="mb-1" borderRadius="10px"></Skeleton>
                                                            <Skeleton width='90%' className='mb-1' borderRadius="10px"></Skeleton>
                                                            <Skeleton width='90%' borderRadius="10px"></Skeleton>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                            : groupList.filter((d) => {
                                                return searchValue.toLowerCase() === '' ? d : d.groupChatName.toLowerCase().includes(searchValue.toLowerCase())
                                            }).map((item) => (<div key={item.id} className="col-12 sm:col-12 md:col-6 lg:col-4 xl:col-3">
                                                <div className={`text-center border-round-sm border-1 border-gray-100 cursor-pointer hover:shadow-2 overflow-hidden ${item?.isActive ? " bg-blue-50" : "bg-red-50"}`}>
                                                    <div className='p-2'>
                                                        <div className='flex flex-row h-full w-full h-auto align-items-center justify-content-start'>
                                                            <div className='flex-1 flex flex-column w-full flex align-items-start justify-content-center'>
                                                                <div className='text-gray w-full text-sm font-bold text-overflow-ellipsis text-left overflow-hiddent mb-1'>{item.groupChatName}</div>
                                                                <span className='text-gray-500 text-sm'>*****</span>
                                                            </div>
                                                        </div>
                                                        <div className='flex flex-row h-full w-full h-auto align-items-center justify-content-between'>
                                                            <div className='flex flex-row'>
                                                                {
                                                                    item?.isActive ? <Tag severity="info" value={translate("NAV.ACTIVE")} rounded></Tag> : <Tag severity="danger" value={translate("NAV.INACTIVE")} rounded></Tag>
                                                                }
                                                            </div>
                                                            <div className='flex flex-row'>
                                                                <i onClick={() => handleSendMessage(item)} className="pi pi-send text-sm text-blue-400 hover:bg-blue-100 p-2 border-circle"></i>
                                                                <i onClick={() => handleEdit(item)} className="pi pi-file-edit text-sm text-blue-400 hover:bg-blue-100 p-2 border-circle"></i>
                                                                <i onClick={() => handleDelete(item)} className="pi pi-trash text-sm text-red-400 hover:bg-blue-100 p-2 border-circle"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>))
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>


            <Dialog header={header} draggable={false} resizable={false} visible={visible} style={{ width: '35rem', minWidth: '35rem', maxWidth: '35rem', }} onHide={() => setVisible(false)} footer={null}>
                <form onSubmit={(e) => handleSubmit(e)} autoComplete="off">
                    <div className='grid'>
                        <div className='col-12 sm:col-12 md:col-4 lg:col-4 xl:col-4 flex justify-content-start align-items-center'>
                            <label htmlFor="groupChatName">{translate("TELEGRAM.GROUP_NAME")}<sup className="p-invalid">*</sup></label>
                        </div>
                        <div className='col-12 sm:col-12 md:col-8 lg:col-8 xl:col-8'>
                            <InputText id="groupChatName" className='w-full' name='groupChatName' value={telegramGroup.userName} onChange={(e) => handleChange(e)} autoFocus />
                        </div>
                    </div>
                    <div className='grid'>
                        <div className='col-12 sm:col-12 md:col-4 lg:col-4 xl:col-4 flex justify-content-start align-items-center'>
                            <label htmlFor="groupChatId">{translate("TELEGRAM.CHAT_ID")}<sup className="p-invalid">*</sup></label>
                        </div>
                        <div className='col-12 sm:col-12 md:col-8 lg:col-8 xl:col-8'>
                            <InputText id="groupChatId" name="groupChatId" value={telegramGroup.groupChatId} onChange={(e) => handleChange(e)} className='w-full' />
                        </div>
                    </div>
                    <div className='grid'>
                        <div className='col-12 sm:col-12 md:col-4 lg:col-4 xl:col-4 flex justify-content-start align-items-center'>
                            <label htmlFor="apiKey">{translate("TELEGRAM.API_KEY")}<sup className="p-invalid">*</sup></label>
                        </div>
                        <div className='col-12 sm:col-12 md:col-8 lg:col-8 xl:col-8'>
                            <InputText id="apiKey" name="apiKey" value={telegramGroup.apiKey} onChange={(e) => handleChange(e)} className='w-full' />
                        </div>
                    </div>
                    <div className='grid'>
                        <div className='col-12 md:block sm:hidden md:col-4 lg:col-4 xl:col-4 flex justify-content-start align-items-center'>

                        </div>
                        <div className='col-12 sm:col-12 md:col-8 lg:col-8 xl:col-8'>
                            <Checkbox onChange={e => setChecked(e.checked)} checked={checked}></Checkbox>
                        </div>
                    </div>

                    <div className="p-dialog-footer p-0 pb-2 h-auto shadow-none">
                        <Button type='button' label={translate("NAV.CLOSE")} icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
                        <Button type="submit" label={translate("NAV.SAVE")} icon="pi pi-save" className='mr-0' loading={isSaving} />
                    </div>

                </form>
            </Dialog>
        </>
    )
}

export default TelegramGroup