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
      setLoading(false);
    }).catch((err) => {
      console.log(`ERROR: ${err}`)
      setLoading(false);
      setError(err);
    });
  }

  useEffect(() => {
    fetchUsers();
  }, [])

  const data = [
    { id: 1, name: "abc", image: "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg" },
    { id: 2, name: "abc", },
    { id: 3, name: "abc", },
    { id: 4, name: "abc", },
    { id: 5, name: "abc", },
    { id: 6, name: "abc", },
    { id: 7, name: "abc", },
    { id: 8, name: "abc", },
    { id: 9, name: "abc", },
  ]

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
              <div className="pr-3">

              </div>
            </div>
          </div>
          <div className="flex-1 w-full h-full overflow-auto">
            <div className="w-full h-full p-3">

              <div className="grid">
                {
                  isLoading ? (
                    <div className="text-center border-round-sm bg-blue-50">
                      <div className='flex flex-row h-full w-full p-1 align-items-center justify-content-start'>
                        <div className='flex p-1 justify-content-start align-content-center'>
                          <Avatar label="P" className='text-gray-400 bg-white' size="large" shape="circle" />
                        </div>
                        <div className='flex-1 flex flex-column w-full p-1 justify-content-start align-items-center text-left'>
                        </div>
                      </div>
                    </div>
                  )
                    : userList.map((item) => (<div key={item.id} className="col-12 sm:col-6 md:col-4 lg:col-3 xl:col-3">
                      <div className="text-center border-round-sm bg-blue-100">
                        <div className='flex flex-row h-full w-full h-auto p-1 align-items-center justify-content-start'>
                          <div className='flex p-1 justify-content-start align-content-center'>
                            {
                              item?.image ? <Avatar image={item.image} size="large" shape="circle" /> : <Avatar label="P" className='text-gray-400 bg-white' size="large" shape="circle" />
                            }
                          </div>
                          <div className='flex-1 flex flex-column w-full p-1 justify-content-start align-items-start text-left'>
                            <span className='text-gray text-md font-bold'>{item.userName}</span>
                            <span className='text-gray text-sm'>{item.userName}</span>
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