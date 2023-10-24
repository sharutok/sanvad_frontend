import { Divider } from '@mantine/core';
import React from 'react'
import { FaFileInvoiceDollar, FaUserCog } from 'react-icons/fa';
import { FaUsersLine, FaClipboardCheck, FaRegIdBadge, } from 'react-icons/fa6'
import { IoIosPaper } from "react-icons/io";
import { MdOutlinePolicy } from 'react-icons/md';
import { Link } from 'react-router-dom';
export default function ShortCutBtn() {

    const ModulesIcons = [
        {
            icons: FaUsersLine, iconTitle: "Conference Mgmt.", path: "/conference/booking/new"
        },
        {
            icons: FaClipboardCheck, iconTitle: "Ticketing Mgmt.", path: "/ticket/sys/new",
        },
        {
            icons: FaRegIdBadge, iconTitle: "Visitor Mgmt.", path: "/vistors/management/new"
        },
        {
            icons: FaFileInvoiceDollar, iconTitle: "Capex Mgmt.", path: "/ticket/sys/new",
        },
    ]
    const IconsIcons = [
        {
            icons: FaUserCog, iconTitle: "HR Policies", path: "/ticket/sys/new",
        },
        {
            icons: MdOutlinePolicy, iconTitle: "IT Policies", path: "/ticket/sys/new",
        },
    ]

    return (
        <div className=' bg-[white] rounded-lg h-fit px-2 py-4 '>
            <div className='p-1'>
                <span className='text-[1.5rem] font-extrabold text-[#555259]'>Modules & Policies</span>
                <div >
                    <Divider />
                </div>
            </div>
            <div className='flex justify-center '>
                <div className='curs flex gap-6 py-2'>
                    <div className='grid grid-cols-4 gap-4'>
                        {ModulesIcons.map((_icon, i) => {
                            return (
                                <div key={i} className='flex justify-center '>
                                    <div onClick={() => window.open(_icon.path)} key={i} className='text-center cursor-pointer hover-element p-1 rounded-xl '>
                                        <div className='flex justify-center '>
                                            < _icon.icons size={45} color='#ED1C24' />
                                        </div>
                                        <div className='mt-1'>
                                            <span className='font-medium'>{_icon.iconTitle}</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    <Divider sx={{ borderColor: "#AEB1B8" }} orientation='vertical' />
                    <div className='grid grid-cols-2 gap-12 '>
                        {IconsIcons.map((_icon, i) => {
                            return (
                                <div key={i} className='flex justify-center hover-element p-1 rounded-xl'>
                                    <div onClick={() => window.open(_icon.path)} key={i} className='text-center'>
                                        <div className='flex justify-center '>
                                            < _icon.icons size={45} color='#ED1C24' />
                                        </div>
                                        <div className='mt-1'>
                                            <span className='font-medium'>{_icon.iconTitle}</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
