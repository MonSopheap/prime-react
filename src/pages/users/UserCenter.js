import { BreadCrumb } from 'primereact/breadcrumb'
import { Button } from 'primereact/button'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Avatar } from 'primereact/avatar';
import UserService from '../../services/UserService';
import { Skeleton } from 'primereact/skeleton';
import { InputText } from 'primereact/inputtext';
import RandomColor from '../../hooks/RandomColor';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Dialog } from 'primereact/dialog';
import { Checkbox } from 'primereact/checkbox';
import { Toast } from 'primereact/toast';
import { AppProps } from '../../commom/AppProps';

function UserCenter() {
  const [translate] = useTranslation("global");
  const navigate = useNavigate()
  const userService = new UserService();
  const [userList, setUserList] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searchValue, setSearch] = useState('');
  const [visible, setVisible] = useState(false);
  const [header, setHeader] = useState('');
  const [isActive, setActive] = useState(false);
  const [user, setUser] = useState({
    userName: "",
    password: "",
    confirmPassword: "",
    email: "",
    isActive: isActive,
  });
  const [msg, setMsg] = useState("")
  const toast = useRef(null);

  const home = { icon: 'pi pi-home', command: () => navigate("/home"), }
  const items = [
    { label: translate("NAV.USER") },
  ];

  const fetchUsers = async () => {
    setLoading(true)
    await userService.getUsers().then((res) => {
      setUserList(res?.data);
    }).catch((err) => {
      setError(err);
    }).finally(() => {
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    })
  }

  useEffect(() => {
    fetchUsers();

  }, [])

  const deleteUser = async (user) => {
    await userService.delete(user?.id).then((res) => {
      if (res.status) {
        fetchUsers();
        toast.current.show({ severity: 'success', summary: translate("MSG.SUCCESS"), detail: translate("MSG.DELETED_SUCCESSFULLY"), life: 3000 });
      }
    }).catch((error) => {
      console.log(error)
      toast.current.show({ severity: 'error', summary: translate("MSG.INFORMATION"), detail: error.message, life: 3000 });
    });
  }

  const handleDelete = (user) => {
    const __currentUser = localStorage.getItem(AppProps.CURRENT_USER);
    if (__currentUser) {
      const obj = JSON.parse(__currentUser);

      if (obj.id === user.id) {
        toast.current.show({ severity: 'warn', summary: translate("MSG.INFORMATION"), detail: translate("MSG.CAN_NOT_DELETE_CURRENT_USER"), life: 3000 });
      }
      else {
        confirmDialog({
          message: translate("MSG.DO_YOU_WANT_TO_DELETE") + ` (${user?.userName})`,
          header: translate("MSG.DELETE_CONFIRMATION"),
          icon: 'pi pi-info-circle',
          acceptClassName: 'p-button-danger',
          style: { minWidth: '25rem', maxWidth: '25rem' },
          draggable: false,
          rejectLabel: translate("NAV.NO"),
          acceptLabel: translate("NAV.YES"),
          accept: () => deleteUser(user),
        });
      }
    }
  }

  const handleChange = (e) => {
    const value = e.target.value;
    setUser({ ...user, [e.target.name]: value })
    console.log(user)

  }

  const handleAddUser = () => {
    setHeader(translate("NAV.ADD_NEW"))
    setVisible(true)
  }
  const handleEditUser = (item) => {
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

                <Button onClick={() => handleAddUser()} label={translate("NAV.ADD")} icon="pi pi-plus-circle" className="px-3 py-2 mr-1" outlined loading={false} />
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
                            <div className='flex p-1 justify-content-start align-content-center'>
                              <Skeleton shape="circle" size="3rem"></Skeleton>
                            </div>
                            <div className='flex-1 flex flex-column w-full p-1 justify-content-start align-items-start text-left'>
                              <Skeleton className="mb-1"></Skeleton>
                              <Skeleton width='85%'></Skeleton>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                      : userList.filter((d) => {
                        return searchValue.toLowerCase() === '' ? d : d.userName.toLowerCase().includes(searchValue.toLowerCase()) || d.email.toLowerCase().includes(searchValue.toLowerCase())
                      }).map((item) => (<div key={item.id} className="col-12 sm:col-12 md:col-6 lg:col-4 xl:col-3">
                        <div className={`text-center border-round-sm border-1 border-gray-100 cursor-pointer hover:shadow-2 overflow-hidden ${item?.isActive ? " bg-blue-50" : "bg-red-50"}`}>
                          <div className='flex flex-row h-full w-full h-auto p-1 align-items-center justify-content-start'>
                            <div className='flex p-1 justify-content-start align-content-center'>
                              {
                                item?.image ? <Avatar image={item.image} size="large" shape="circle" /> : <Avatar label={item?.userName.slice(0, 2).toUpperCase()} className={`text-white`} size="large" shape="circle" style={{ backgroundColor: `${RandomColor()}` }} />
                              }
                            </div>
                            <div className='flex-1 flex flex-column w-full p-1 flex align-items-start justify-content-center'>
                              <div className='text-gray w-full text-sm font-bold text-overflow-ellipsis text-left overflow-hiddent'>{item.userName}</div>
                              <span className='text-gray text-sm'><i className={`pi ${item?.isActive ? "pi-check-circle text-green-500" : "pi-minus-circle text-red-500"} mr-1`} style={{ fontSize: '12px' }}></i>{item?.isActive ? translate("GLOBAL.ACTIVE") : translate("GLOBAL.INACTIVE")}</span>
                              <div className='text-gray text-sm flex flex-nowrap align-items-center'><i className="pi pi-envelope mr-1" style={{ fontSize: '12px' }}></i>{item?.email}</div>
                            </div>
                            <div className='flex flex-column h-full p-1 align-items-center justify-content-center' style={{ width: "30px" }}>
                              <i onClick={() => handleEditUser(item)} className="pi pi-user-edit text-sm text-blue-400 hover:bg-blue-100 p-2 border-circle"></i>
                              <i onClick={() => handleDelete(item)} className="pi pi-trash text-sm text-red-400 hover:bg-blue-100 p-2 border-circle"></i>
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

      <Dialog header={header} draggable={false} visible={visible} breakpoints={{ "960px": "75vw" }} style={{ width: '35rem', minWidth: '35rem' }} onHide={() => setVisible(false)} footer={footerContent}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className='grid'>
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
          </div>

        </form>
      </Dialog>
    </>
  )
}

export default UserCenter