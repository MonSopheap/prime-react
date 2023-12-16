import { BreadCrumb } from 'primereact/breadcrumb'
import { Button } from 'primereact/button'
import React from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

function UserCenter() {
  const [translate] = useTranslation("global")
  const navigate = useNavigate()
  const home = { icon: 'pi pi-home', command: () => navigate("/home"), }
  const items = [
    { label: translate("NAV.USER") },
  ];

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
            <div className="w-full h-full p-2">
              <span>Hello</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserCenter