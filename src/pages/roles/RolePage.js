import { BreadCrumb } from 'primereact/breadcrumb'
import { Button } from 'primereact/button'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import RoleService from '../../services/RoleService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

function RolePage() {
    const [translate] = useTranslation("global");
    const navigate = useNavigate()
    const roleService = new RoleService();
    const [roleList, setRoleList] = useState([])
    const [selectedRole, setSelectedRole] = useState(null);

    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [searchValue, setSearch] = useState('');
    const [visible, setVisible] = useState(false);
    const [header, setHeader] = useState('');
    const [isActive, setActive] = useState(false);
    const [role, setRole] = useState({
        roleName: "",
        description: "",
        isActive: isActive,
    });
    const [msg, setMsg] = useState("")
    const toast = useRef(null);

    const home = { icon: 'pi pi-home', command: () => navigate("/home"), }
    const items = [
        { label: translate("NAV.ROLE") },
    ];

    const fetchRoles = async () => {
        setLoading(true)
        await roleService.getRoles().then((res) => {
            console.log(res)
            setRoleList(res?.data);
        }).catch((err) => {
            setError(err);
        }).finally(() => {
            setTimeout(() => {
                setLoading(false)
            }, 1000)
        })
    }

    useEffect(() => {
        fetchRoles();
    }, []);

    const deleteRole = async () => {
        await roleService.delete(selectedRole?.id).then((res) => {
            if (res.status) {
                fetchRoles();
                setSelectedRole(null)
                toast.current.show({ severity: 'success', summary: translate("MSG.SUCCESS"), detail: translate("MSG.DELETED_SUCCESSFULLY"), life: 3000 });
            }
        }).catch((error) => {
            console.log(error)
            toast.current.show({ severity: 'error', summary: translate("MSG.INFORMATION"), detail: error.message, life: 3000 });
        });
    }

    const handleDelete = () => {
        confirmDialog({
            message: translate("MSG.DO_YOU_WANT_TO_DELETE") + ` (${selectedRole?.roleName})`,
            header: translate("MSG.DELETE_CONFIRMATION"),
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            style: { minWidth: '25rem', maxWidth: '25rem' },
            draggable: false,
            rejectLabel: translate("NAV.NO"),
            acceptLabel: translate("NAV.YES"),
            accept: () => deleteRole(),
        });
    }

    const handleChange = (e) => {
        const value = e.target.value;
        setRole({ ...role, [e.target.name]: value })
    }

    const handleAdd = () => {
        setHeader(translate("NAV.ADD_NEW"))
        setVisible(true)
    }
    const handleEdit = (item) => {
        setHeader(translate("NAV.EDIT"))
        setVisible(true)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`Message alert`)
        // console.log(event);
        // console.log(user)
        // await userService.save(user)
        //   .then((res) => {
        //     console.log("User Added Successfully");
        //     setMsg("Used Added Sucessfully");
        //     setUser({
        //       userName: "",
        //       password: "",
        //       confirmPassword: "",
        //       email: "",
        //       isActive: isActive,
        //     });
        //     setVisible(false)
        //   }).catch((error) => {
        //     console.log(error);
        //   });
    }

    // console.log(selectedRole)

    const footerContent = (
        <div>
            <Button label={translate("NAV.CLOSE")} icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
            <Button type="submit" label={translate("NAV.SAVE")} icon="pi pi-save" className='mr-0' />
        </div>
    );
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
                                <Button onClick={() => handleDelete()} label={translate("NAV.DELETE")} icon="pi pi-trash" className="px-3 py-2 mr-1" loading={false} outlined disabled={!selectedRole || selectedRole?.id === 0} />
                                <Button onClick={() => handleEdit()} label={translate("NAV.EDIT")} icon="pi pi-pencil" className="px-3 py-2 mr-1" loading={false} outlined disabled={!selectedRole || selectedRole?.id === 0} />
                                <Button onClick={() => handleAdd()} label={translate("NAV.ADD")} icon="pi pi-plus-circle" className="px-3 py-2 mr-1" loading={false} outlined />
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 w-full h-full overflow-auto">
                        <div className="w-full h-full p-1">
                            <DataTable value={roleList} resizableColumns stripedRows selectionMode="single" selection={selectedRole} onSelectionChange={(e) => setSelectedRole(e.value)} dataKey="id" scrollable scrollHeight="100%" tableStyle={{ minWidth: '50rem' }}>
                                <Column field="roleName" header={translate("NAV.NAME")} sortable></Column>
                                <Column field="description" header={translate("NAV.DESCRIPTION")} sortable></Column>
                                <Column field="isActive" header={translate("NAV.ACTION")} sortable></Column>
                            </DataTable>
                        </div>
                    </div>
                </div>
            </div>

            <Dialog header={header} draggable={false} visible={visible} style={{ width: '35rem', minWidth: '35rem' }} onHide={() => setVisible(false)} footer={footerContent}>
                <form onSubmit={(e) => handleSubmit(e)}>
                    {/* <div className='grid'>
                        <div className='col-12 sm:col-12 md:col-4 lg:col-4 xl:col-4 flex justify-content-start align-items-center'>
                            <label htmlFor="userName">{translate("USER.USERNAME")}<sup className="p-invalid">*</sup></label>
                        </div>
                        <div className='col-12 sm:col-12 md:col-8 lg:col-8 xl:col-8'>
                            <InputText id="userName" className='w-full' name='userName' value={user.userName} onChange={(e) => handleChange(e)} autoFocus />
                        </div>
                    </div>
                    <div className='grid'>
                        <div className='col-12 sm:col-12 md:col-4 lg:col-4 xl:col-4 flex justify-content-start align-items-center'>
                            <label htmlFor="pwd">{translate("USER.PASSWORD")}<sup className="p-invalid">*</sup></label>
                        </div>
                        <div className='col-12 sm:col-12 md:col-8 lg:col-8 xl:col-8'>
                            <InputText id="pwd" name="password" value={user.password} onChange={(e) => handleChange(e)} className='w-full' />
                        </div>
                    </div>
                    <div className='grid'>
                        <div className='col-12 sm:col-12 md:col-4 lg:col-4 xl:col-4 flex justify-content-start align-items-center'>
                            <label htmlFor="confirmPwd">{translate("USER.CONFIRM_PASSWORD")}<sup className="p-invalid">*</sup></label>
                        </div>
                        <div className='col-12 sm:col-12 md:col-8 lg:col-8 xl:col-8'>
                            <InputText id="confirmPwd" name="confirmPassword" value={user.confirmPassword} onChange={(e) => handleChange(e)} className='w-full' />
                        </div>
                    </div>
                    <div className='grid'>
                        <div className='col-12 sm:col-12 md:col-4 lg:col-4 xl:col-4 flex justify-content-start align-items-center'>
                            <label htmlFor="email">{translate("USER.EMAIL")}</label>
                        </div>
                        <div className='col-12 sm:col-12 md:col-8 lg:col-8 xl:col-8'>
                            <InputText id="email" name="email" value={user.email} onChange={(e) => handleChange(e)} className='w-full' />
                        </div>
                    </div>
                    <div className='grid'>
                        <div className='col-12 md:block sm:hidden md:col-4 lg:col-4 xl:col-4 flex justify-content-start align-items-center'>

                        </div>
                        <div className='col-12 sm:col-12 md:col-8 lg:col-8 xl:col-8'>
                            <Checkbox onChange={e => setActive(e.checked)} checked={isActive}></Checkbox>
                        </div>
                    </div> */}
                </form>
            </Dialog>
        </>
    )
}

export default RolePage