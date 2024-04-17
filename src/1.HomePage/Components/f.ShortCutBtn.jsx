import Divider from '@mui/material/Divider';
import React from 'react'
import { FaFileInvoiceDollar, FaUserCog } from 'react-icons/fa';
import { FaUsersLine, FaClipboardCheck, FaRegIdBadge, } from 'react-icons/fa6'
import { IoIosPaper } from "react-icons/io";
import { MdOutlinePolicy } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { isPermissionToView } from '../../Static/StaticValues';
export default function ShortCutBtn({ view }) {

    const ModulesIcons = [
        {
            icons: FaUsersLine, iconTitle: "Book Conference", path: "/conference/booking/new", name: "module:conferencebooking",
        },
        {
            icons: FaClipboardCheck, iconTitle: "Raise a Ticket", path: "/ticket/sys/new", name: "module:ticketsystem",
        },
        {
            icons: FaRegIdBadge, iconTitle: "Add Visitor", path: "/vistors/management/new", name: "module:visitormanagement",
        },
        {
            icons: FaFileInvoiceDollar, iconTitle: "Raise Capex", path: "/capex/list", name: "module:capex",
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
                <span className='text-[1.2rem] font-extrabold text-[#555259]'>{!view ? <>
                    Modules & Policies
                </> : <>
                    Modules
                </>}</span>
                <div >
                    <Divider />
                </div>
            </div>
            <div className='flex justify-center'>
                <div className='flex gap-6 '>
                    <div className='grid grid-cols-4 gap-4'>
                        {ModulesIcons.map((_icon, i) => {
                            return (
                                <div key={i} style={{ cursor: `${(isPermissionToView(_icon.name) ? "pointer" : "not-allowed")}` }}
                                    onClick={() => isPermissionToView(_icon.name) ? window.open(_icon.path, "_self") : ""} className='grid justify-center text-center cursor-pointer hover-element px-3 py-1 rounded-xl '>
                                    <div className='flex justify-center'>
                                        <_icon.icons size={40} color='#ED1C24' />
                                    </div>
                                    <span className='inline-block max-w-xs truncate text-[1rem] font-bold text-[#555259]'>{_icon.iconTitle}</span>
                                </div>
                            )
                        })}
                    </div>
                    {!view && <>
                        <div className='p-3'>
                            <Divider sx={{ borderColor: "#AEB1B8" }} orientation='vertical' />
                        </div>


                        <div className='grid grid-cols-2 gap-7 '>
                            {IconsIcons.map((_icon, i) => {
                                return (
                                    <div onClick={() => window.open(_icon.path, "_self")} key={i} className='grid hover-element px-3 py-1 rounded-xl'>
                                        <div className='flex justify-center'>
                                            <_icon.icons size={40} color='#ED1C24' />
                                        </div>
                                        <span className='inline-block max-w-xs truncate text-[1rem] font-bold text-[#555259]'>{_icon.iconTitle}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </>}
                </div>
            </div>
        </div>
    )
}
