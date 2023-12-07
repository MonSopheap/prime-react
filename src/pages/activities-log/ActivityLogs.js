import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

function ActivityLogs() {
    const [translate] = useTranslation("global")
    const home = { icon: 'pi pi-home', url: '/web/home' }
    const items = [
        { label: translate("NAV.REPORT") },
        { label: translate("REPORT.ACTIVITY_LOG") },
    ];

    const [dataList, setDataList] = useState([]);
    const columns = [
        { field: 'code', header: 'Code' },
        { field: 'name', header: 'Name' },
        { field: 'category', header: 'Category' },
        { field: 'quantity', header: 'Quantity' }
    ];

    useEffect(() => {
        setDataList([
            { code: "0001", name: "Data 001", category: "Apple", quantity: 23 },
            { code: "0001", name: "Data 001", category: "Apple", quantity: 23 },
            { code: "0001", name: "Data 001", category: "Apple", quantity: 23 },
            { code: "0001", name: "Data 001", category: "Apple", quantity: 23 },
            { code: "0001", name: "Data 001", category: "Apple", quantity: 23 },
            { code: "0001", name: "Data 001", category: "Apple", quantity: 23 },
            { code: "0001", name: "Data 001", category: "Apple", quantity: 23 },
            { code: "0001", name: "Data 001", category: "Apple", quantity: 23 },
            { code: "0001", name: "Data 001", category: "Apple", quantity: 23 },
            { code: "0001", name: "Data 001", category: "Apple", quantity: 23 },
            { code: "0001", name: "Data 001", category: "Apple", quantity: 23 },
            { code: "0001", name: "Data 001", category: "Apple", quantity: 23 },
            { code: "0001", name: "Data 001", category: "Apple", quantity: 23 },
            { code: "0001", name: "Data 001", category: "Apple", quantity: 23 },
            { code: "0001", name: "Data 001", category: "Apple", quantity: 23 },
            { code: "0001", name: "Data 001", category: "Apple", quantity: 23 },
            { code: "0001", name: "Data 001", category: "Apple", quantity: 23 },
            { code: "0001", name: "Data 001", category: "Apple", quantity: 23 },
            { code: "0001", name: "Data 001", category: "Apple", quantity: 23 },
            { code: "0001", name: "Data 001", category: "Apple", quantity: 23 },
            { code: "0001", name: "Data 001", category: "Apple", quantity: 23 },
            { code: "0001", name: "Data 001", category: "Apple", quantity: 23 },
            { code: "0001", name: "Data 001", category: "Apple", quantity: 23 },
            { code: "0001", name: "Data 001", category: "Apple", quantity: 23 },
            { code: "0001", name: "Data 001", category: "Apple", quantity: 23 },
            { code: "0001", name: "Data 001", category: "Apple", quantity: 23 },
            { code: "0001", name: "Data 001", category: "Apple", quantity: 23 },
            { code: "0001", name: "Data 001", category: "Apple", quantity: 23 },
            { code: "0001", name: "Data 001", category: "Apple", quantity: 23 },
            { code: "0001", name: "Data 001", category: "Apple", quantity: 23 },
            { code: "0001", name: "Data 001", category: "Apple", quantity: 23 },
            { code: "0001", name: "Data 001", category: "Apple", quantity: 23 },
            { code: "0001", name: "Data 001", category: "Apple", quantity: 23 },
            { code: "0001", name: "Data 001", category: "Apple", quantity: 23 },
            { code: "0001", name: "Data 001", category: "Apple", quantity: 23 },
            { code: "0001", name: "Data 001", category: "Apple", quantity: 23 },
            { code: "0001", name: "Data 001", category: "Apple", quantity: 23 },
            { code: "0001", name: "Data 001", category: "Apple", quantity: 23 },
        ])
    }, [])

    return (
        <div className="w-full h-full">
            <div className="w-full h-full flex flex-column justify-content-center align-items-center">
                <div className="w-full flex flex-row justify-content-center align-items-center border-bottom-1 border-200 overflow-hidden" style={{ height: "50px" }}>
                    <div className="w-full flex-1 h-full flex justify-content-start align-items-center">
                        <BreadCrumb model={items} home={home} className="text-md border-none border-noround w-full h-full" style={{ backgroundColor: "transparent" }} />
                    </div>
                    <div className="h-full flex flex-row justify-content-end align-items-center">
                        <div className="pr-3">

                        </div>
                    </div>
                </div>
                <div className="w-full h-full flex-1  overflow-auto">
                    <DataTable value={dataList} scrollable scrollHeight="100%" stripedRows paginator rows={50} rowsPerPageOptions={[5, 10, 25, 50]} size={'normal'} className="text-sm" tableStyle={{ minWidth: '50rem', height: "100%" }}>
                        {
                            columns.map((col, i) => (
                                <Column key={i} sortable style={{ width: '25%' }} field={col.field} header={col.header} />
                            ))
                        }
                    </DataTable>
                </div>
            </div>
        </div>
    )
}

export default ActivityLogs