import React from 'react'
import { FaUsers, FaIdBadge } from 'react-icons/fa';
import { IoIosPaper } from "react-icons/io";

export default function ShortCutBtn() {

    const icons = [
        {
            icons: FaUsers, iconTitle: "User Management",
        }, {
            icons: FaIdBadge, iconTitle: "Visitor Management",

        }, {
            icons: IoIosPaper, iconTitle: "Ticketing Management",
        }
    ]

    return (
        <div>
            <h1>Shortcuts</h1>
            <div className='flex'>
                {icons.map((_icon) => {
                    return (
                        <div key={_icon.iconTitle} className='m-2'>
                            <_icon.icons className='text-[#ffffff] p-4 m-3 rounded-[5px] bg-[grey]' size={80} />
                            <div className='text-center' >
                                <p >{_icon.iconTitle}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
