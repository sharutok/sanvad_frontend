import React from 'react'
import { FaUsers, FaIdBadge } from 'react-icons/fa';
import { IoIosPaper } from "react-icons/io";
import '../../../Style/ShortCutBtn.css'
import { Link } from 'react-router-dom';
export default function ShortCutBtn() {

    const icons = [
        {
            icons: FaUsers, iconTitle: "Conference Management", path: "/conference/booking/new"
        }, {
            icons: FaIdBadge, iconTitle: "Visitor Management", path: "/vistors/management/new"

        }, {
            icons: IoIosPaper, iconTitle: "Ticketing Management", path: "/ticket/sys/new",
        }
    ]

    return (
        <div>
            <span>Shortcuts</span>
            <div className='grid grid-cols-[repeat(3,1fr)] gap-10'>
                {icons.map((_icon) => {
                    return (
                        <div className='text-center p-4 button1'>
                            <Link to={_icon.path} className='flex justify-center '>
                                < _icon.icons size={40} color='#808285' />
                            </Link>
                            <div className='pt-3'>
                                <span>{_icon.iconTitle}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
