import { BreadCrumb } from 'primereact/breadcrumb'
import { Button } from 'primereact/button'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Avatar } from 'primereact/avatar';
import UserService from '../../services/UserService';
import { Skeleton } from 'primereact/skeleton';

function UserCenter() {
  const [translate] = useTranslation("global");
  const navigate = useNavigate()
  const [userList, setUserList] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const userService = new UserService();


  const home = { icon: 'pi pi-home', command: () => navigate("/home"), }
  const items = [
    { label: translate("NAV.USER") },
  ];

  const fetchUsers = () => {
    setLoading(true)
    userService.getUsers().then((res) => {
      console.log(`RESULT:`, res);
      setUserList(res?.data);
      setTimeout(() => {
        setLoading(false);
      }, 1000)
    }).catch((err) => {
      console.log(`ERROR: ${err}`)
      setLoading(false);
      setError(err);
    });
  }

  useEffect(() => {
    fetchUsers();
  }, [])


  return (
    <>
      <div className="w-full h-full">
        <div className="w-full h-full flex flex-column">
          <div className="w-full flex flex-row justify-content-between align-items-center border-bottom-1 border-200 overflow-hidden" style={{ height: "50px" }}>
            <div className="w-full flex-1 h-full flex justify-content-start align-items-center">
              <div className='ml-2 block md:hidden lg:hidden xl:hidden'>
                <Button icon="pi pi-align-left" size="small" outlined rounded />
              </div>
              <BreadCrumb model={items} home={home} className="text-md border-none border-noround w-full h-full" style={{ backgroundColor: "transparent" }} />
            </div>
            <div className="h-full flex-1 flex flex-row justify-content-end align-items-center">
              <div className="pr-3 w-full">

              </div>
            </div>
          </div>
          <div className="flex-1 w-full h-full overflow-auto">
            <div className="w-full h-full p-3">

              <div className="grid">
                {
                  isLoading ? [...Array(12)].map((elementInArray, index) => (
                    <div key={index} className="col-12 sm:col-6 md:col-4 lg:col-3 xl:col-3">
                      <div className="text-center border-round-sm bg-blue-50 w">
                        <div className='flex flex-row h-full w-full p-1 align-items-center justify-content-start'>
                          <div className='flex p-1 justify-content-start align-content-center'>
                            <Skeleton shape="circle" size="3rem"></Skeleton>
                          </div>
                          <div className='flex-1 flex flex-column w-full p-1 justify-content-start align-items-start text-left'>
                            <Skeleton className="mb-1"></Skeleton>
                            <Skeleton width="7rem"></Skeleton>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                    : userList.map((item) => (<div key={item.id} className="col-12 sm:col-6 md:col-4 lg:col-3 xl:col-3">
                      <div className={`text-center border-round-sm cursor-pointer hover:shadow-2  overflow-hidden ${item?.isActive ? " bg-blue-100" : "bg-red-100"}`}>
                        <div className='flex flex-row h-full w-full h-auto p-1 align-items-center justify-content-start'>
                          <div className='flex p-1 justify-content-start align-content-center'>
                            {
                              item?.image ? <Avatar image={item.image} size="large" shape="circle" /> : <Avatar label="P" className='text-gray-400 bg-white' size="large" shape="circle" />
                            }
                          </div>
                          <div className='flex-1 flex flex-column w-full p-1 flex align-items-start justify-content-center'>
                            <div className='text-gray w-full text-sm font-bold text-overflow-ellipsis text-left'>{item.userName}</div>
                            <span className='text-gray text-sm'><i className={`pi ${item?.isActive ? "pi-check-circle text-green-500" : "pi-minus-circle text-red-500"} mr-1`} style={{ fontSize: '12px' }}></i>{item?.isActive ? translate("GLOBAL.ACTIVE") : translate("GLOBAL.INACTIVE")}</span>
                            <span className='text-gray text-sm'><i className="pi pi-envelope mr-1" style={{ fontSize: '12px' }}></i>{item?.email}</span>
                          </div>
                        </div>
                      </div>
                    </div>))
                }
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserCenter