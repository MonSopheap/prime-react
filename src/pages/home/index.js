import React, { useRef, useState } from 'react'
// import { Button } from 'primereact/button';
// import { Panel } from 'primereact/panel';
// import { Card } from 'primereact/card';
// import { Sidebar } from 'primereact/sidebar';
// import { SplitButton } from 'primereact/splitbutton';
// import { Toast } from 'primereact/toast';

function HomePage() {
    const [visible, setVisible] = useState(false);
    const toast = useRef(null);
    const items = [
        {
            label: 'Update',
            icon: 'pi pi-refresh',
            command: () => {
                toast.current.show({ severity: 'success', summary: 'Updated', detail: 'Data Updated' });
            }
        },
        {
            label: 'Delete',
            icon: 'pi pi-times',
            command: () => {
                toast.current.show({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted' });
            }
        },
        {
            label: 'React Website',
            icon: 'pi pi-external-link',
            command: () => {
                window.location.href = 'https://reactjs.org/';
            }
        },
        {
            label: 'Upload',
            icon: 'pi pi-upload',
            command: () => {
                //router.push('/fileupload');
            }
        }
    ];

    const save = () => {
        toast.current.show({ severity: 'success', summary: 'Success', detail: 'Data Saved' });
    };
    return (
        <>
            <div className="w-full h-full">

            </div>
        </>
    )
}

export default HomePage