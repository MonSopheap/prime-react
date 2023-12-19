import { BreadCrumb } from 'primereact/breadcrumb'
import { Button } from 'primereact/button'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Avatar } from 'primereact/avatar';
import UserService from '../../services/UserService';
import { Skeleton } from 'primereact/skeleton';
import { InputText } from 'primereact/inputtext';
import RandomColor from '../../hooks/RandomColor';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

function UserCenter() {
  const [translate] = useTranslation("global");
  const navigate = useNavigate()
  const [userList, setUserList] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const userService = new UserService();
  const [searchValue, setSearch] = useState('');



  const home = { icon: 'pi pi-home', command: () => navigate("/home"), }
  const items = [
    { label: translate("NAV.USER") },
  ];

  const fetchUsers = () => {
    setLoading(true)
    userService.getUsers().then((res) => {
      setUserList(res?.data);
      setTimeout(() => {
        setLoading(false);
      }, 1000)
    }).catch((err) => {
      console.log(`ERROR: ${err}`)
      setError(err);
      setTimeout(() => {
        setLoading(false);
      }, 1000)

    });
  }

  useEffect(() => {
    fetchUsers();

  }, [])

  const deleteUser = async (id) => {
    await userService.delete(id).then((res) => {
      fetchUsers();
    }).catch((err) => {
      setTimeout(() => {
        setLoading(false);
      }, 1000)
    });
  }

  const handleDelete = (id) => {
    console.log(id)
    confirmDialog({
      message: translate("MSG.DO_YOU_WANT_TO_DELETE"),
      header: translate("MSG.DELETE_CONFIRMATION"),
      icon: 'pi pi-info-circle',
      acceptClassName: 'p-button-danger',
      style: { minWidth: '20rem', maxWidth: '25rem' },
      draggable: false,
      rejectLabel: translate("NAV.NO"),
      acceptLabel: translate("NAV.YES"),
      accept: () => deleteUser(id),
    });
  }


  return (
    <>
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

                <Button label={translate("NAV.ADD")} icon="pi pi-plus-circle" className="px-3 py-2 mr-1" outlined loading={false} onClick={() => { }} />
              </div>
            </div>
          </div>
          <div className="flex-1 w-full h-full overflow-auto">
            <div className="w-full h-full p-3">
              {
                <div className="grid">
                  {
                    isLoading ? [...Array(12)].map((item, index) => (
                      <div key={index} className="col-12 sm:col-6 md:col-4 lg:col-3 xl:col-3">
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
                      }).map((item) => (<div key={item.id} className="col-12 sm:col-6 md:col-4 lg:col-3 xl:col-3">
                        <div className={`text-center border-round-sm cursor-pointer hover:shadow-2 overflow-hidden ${item?.isActive ? " bg-blue-100" : "bg-red-100"}`}>
                          <div className='flex flex-row h-full w-full h-auto p-1 align-items-center justify-content-start'>
                            <div className='flex p-1 justify-content-start align-content-center'>
                              {
                                item?.image ? <Avatar image={item.image} size="large" shape="circle" /> : <Avatar label={item?.userName.slice(0, 2).toUpperCase()} className={`text-white`} size="large" shape="circle" style={{ backgroundColor: `${RandomColor()}` }} />
                              }
                            </div>
                            <div className='flex-1 flex flex-column w-full p-1 flex align-items-start justify-content-center'>
                              <div className='text-gray w-full text-sm font-bold text-overflow-ellipsis text-left overflow-hiddent'>{item.userName}</div>
                              <span className='text-gray text-sm'><i className={`pi ${item?.isActive ? "pi-check-circle text-green-500" : "pi-minus-circle text-red-500"} mr-1`} style={{ fontSize: '12px' }}></i>{item?.isActive ? translate("GLOBAL.ACTIVE") : translate("GLOBAL.INACTIVE")}</span>
                              <div className='text-gray text-sm'><i className="pi pi-envelope mr-1" style={{ fontSize: '12px' }}></i>{item?.email}</div>
                            </div>
                            <div className='flex flex-column h-full p-1 align-items-center justify-content-center' style={{ width: "30px" }}>
                              <i onClick={() => { }} className="pi pi-user-edit text-sm text-blue-400 hover:bg-blue-200 p-2 border-circle"></i>
                              <i onClick={() => handleDelete(item?.id)} className="pi pi-trash text-sm text-red-400 hover:bg-blue-200 p-2 border-circle"></i>
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
    </>
  )
}

export default UserCenter