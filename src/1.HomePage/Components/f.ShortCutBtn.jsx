import React from 'react'
import { FaUsersLine, FaClipboardCheck, FaRegIdBadge } from 'react-icons/fa6'
import { IoIosPaper } from "react-icons/io";
import '../../../Style/ShortCutBtn.css'
import { Link } from 'react-router-dom';
export default function ShortCutBtn() {

    const icons = [
        {
            icons: FaUsersLine, iconTitle: "Conference Management", path: "/conference/booking/new"
        }, {
            icons: FaRegIdBadge, iconTitle: "Visitor Management", path: "/vistors/management/new"
        }, {
            icons: FaClipboardCheck, iconTitle: "Ticketing Management", path: "/ticket/sys/new",
        }
    ]

    return (
        <div>
            {/* <span className='text-xl p-1'>Shortcuts</span> */}
            <div className='grid grid-cols-[repeat(3,1fr)] gap-10 '>
                {icons.map((_icon, i) => {
                    return (
                        <div key={i} className='text-center p-2 button1 rounded-lg bg-[#fff]'>
                            <Link to={_icon.path} className='flex justify-center '>
                                < _icon.icons size={35} color='#808285' />
                            </Link>
                            <div className='mt-2'>
                                <span>{_icon.iconTitle}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
