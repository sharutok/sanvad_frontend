import Divider from '@mui/material/Divider';
import React from 'react'
import { FaFileInvoiceDollar, FaUserCog } from 'react-icons/fa';
import { FaUsersLine, FaClipboardCheck, FaRegIdBadge, } from 'react-icons/fa6'
import { IoIosPaper } from "react-icons/io";
import { MdOutlinePolicy } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { isPermissionToView } from '../../Static/StaticValues';
export default function ShortCutBtn() {

    const ModulesIcons = [
        {
            icons: FaUsersLine, iconTitle: "Book Conference", path: "/conference/booking/new"
        },
        {
            icons: FaClipboardCheck, iconTitle: "Raise a Ticket", path: "/ticket/sys/new",
        },
        {
            icons: FaRegIdBadge, iconTitle: "Add Visitor", path: "/vistors/management/new"
        },
        {
            icons: FaFileInvoiceDollar, iconTitle: "Raise Capex", path: "/capex/list",
        },
    ]
    const IconsIcons = [
        {
            icons: FaUserCog, iconTitle: "HR Policies", path: "/policies/?type=HR",
        },
        {
            icons: MdOutlinePolicy, iconTitle: "IT Policies", path: "/policies/?type=IT",
        },
    ]

    return (
        <div className=' bg-[white] rounded-lg h-fit px-2 py-2 '>
            <div className='p-1'>
                <span className='text-[1.2rem] font-extrabold text-[#555259]'>Modules & Policies</span>
                <div >
                    <Divider />
                </div>
            </div>
            <div className='flex justify-center'>
                <div className='flex gap-6 '>
                    <div className='grid grid-cols-4 gap-4'>
                        {ModulesIcons.map((_icon, i) => {
                            return (
                                <div key={i} className='flex justify-center '>
                                    <div style={{ cursor: `${_icon.iconTitle === "Raise Capex" ? (isPermissionToView("capex:create") ? "pointer" : "not-allowed") : "pointer"}` }} onClick={() => _icon.iconTitle === "Raise Capex" ? isPermissionToView("capex:create") ? window.open(_icon.path) : "" : window.open(_icon.path)} key={i} className=' text-center cursor-pointer hover-element px-3 py-1 rounded-xl '>
                                        <div className='flex justify-center '>
                                            < _icon.icons size={40} color='#ED1C24' />
                                        </div>
                                        <div className='mt-1'>
                                            <span className='text-[1rem] font-bold text-[#555259]'>{_icon.iconTitle}</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className='p-3'>
                        <Divider sx={{ borderColor: "#AEB1B8" }} orientation='vertical' />
                    </div>
                    <div className='grid grid-cols-2 gap-7 '>
                        {IconsIcons.map((_icon, i) => {
                            return (
                                <div key={i} className='flex justify-center hover-element px-3 py-1 rounded-xl'>
                                    <div onClick={() => window.open(_icon.path)} key={i} className='text-center'>
                                        <div className='flex justify-center '>
                                            < _icon.icons size={40} color='#ED1C24' />
                                        </div>
                                        <div className='mt-1'>
                                            <span className='text-[1rem] font-bold text-[#555259]'>{_icon.iconTitle}</span>
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
