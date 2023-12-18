import React from 'react'
import { Avatar } from 'primereact/avatar';

import {
    avatar001,
} from "../assets/images";

function NoDataComponent({ message }) {
    return (
        <>
            <div className='w-full h-full flex flex-column justify-content-center align-items-center'>
                <div className='flex m-auto'>
                    <Avatar image={avatar001} className="ml-2 cursor-pointer border-primary-100 shadow-1" style={{ width: "38px", height: "38px", color: '#ffffff', }} shape="circle" />
                    <span className='text-gray-500'>{message}</span>
                </div>

            </div>
        </>
    )
}

export default NoDataComponent